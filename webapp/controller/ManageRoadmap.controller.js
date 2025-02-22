sap.ui.define(
  [
    "./BaseController",
    "sap/m/Panel",
    "sap/m/Toolbar",
    "sap/m/ToolbarSpacer",
    "sap/m/Title",
    "sap/f/GridList",
    "sap/f/GridListItem",
    "sap/m/VBox",
    "sap/m/Label",
    "sap/m/ProgressIndicator",
    "sap/m/Text",
    "sap/m/Button",
    "sap/ui/core/CustomData",
    "sap/f/LayoutType",
    "sap/m/MessageBox",
  ],
  function (
    BaseController,
    Panel,
    Toolbar,
    ToolbarSpacer,
    Title,
    GridList,
    GridListItem,
    VBox,
    Label,
    ProgressIndicator,
    Text,
    Button,
    CustomData,
    LayoutType,
    MessageBox
  ) {
    "use strict";

    return BaseController.extend(
      "framsys.com.framsysfrontend.controller.ManageRoadmap",
      {
        onInit: function () {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter
            .getRoute("ManageRoadmap")
            .attachPatternMatched(this.onRouteMatched, this);
        },

        onRouteMatched: function (oEvent) {
          debugger
          this.AppState = this.getOwnerComponent().getState("App");
          let sRoadmapID = oEvent.getParameter("arguments").sRoadmapID;
          this.AppState.data.currentRoadmapID = sRoadmapID;
          this.AppState.data.sSelectedProjectRoadmapID = sRoadmapID;
          sRoadmapID = this.AppState.data.sSelectedProjectRoadmapID;

          let sProjectName = oEvent.getParameter("arguments").sProjectName;
          if (sProjectName) {
            this.AppState.data.sSelectedProjectName = sProjectName;
          }
          this.getView()
            .byId("manageRoadmapPage")
            .setTitle(this.AppState.data.sSelectedProjectName);
            if (
              this.AppState.data.oRoleBasesVisiblity.sLoginPerson ==
              "Enterprise Portfolio Administrator"
            ) {
              this.AppState.data.showGlobalAddButton = true;
            }
            if (
              this.AppState.data.oRoleBasesVisiblity.sLoginPerson == "Project Manager") {
              this.AppState.data.showGlobalAddButton = true;
            }
            if(this.AppState.data.oRoleBasesVisiblity.sLoginPerson == "Project Area Leader"){
              this.AppState.data.showGlobalAddButton = true;
            }
            if(this.AppState.data.oRoleBasesVisiblity.sLoginPerson == "Project Gate Keeper"){
              this.AppState.data.showGlobalAddButton = true;
            }
            if(this.AppState.data.oRoleBasesVisiblity.sLoginPerson == "Task Responsible" || this.AppState.data.oRoleBasesVisiblity.sLoginPerson == "Activity Performer"){
              this.AppState.data.showGlobalAddButton = false;
            }

          this.getView().setModel(this.AppState.getModel(), "AppState");
          this.AppState.getModel().setSizeLimit(999999);
          this.AppState.setViewController(this);
          // this.AppState.data.showGlobalAddButton = true;
          this.AppState.data.showBackToRoadmapButton = false;
          this.AppState.data.currentPage = "ManageRoadmap";
          this.AppState.data.currentPageLabel = "Manage Roadmap";
          this.AppState.getModel().refresh(true);
          this.AppState.getProjectRoadmapById(sRoadmapID);

        },

        createPanels: function () {
          var oView = this.getView();
          var aTasks = oView.getModel("AppState").getProperty("/aTask");
          var aAllAreas = oView.getModel("AppState").getProperty("/aArea");
          var aAllPhases = oView.getModel("AppState").getProperty("/aPhase");

          aAllPhases.sort((a, b) => a.displaySequence - b.displaySequence);
          aAllAreas.sort((a, b) => a.displaySequence - b.displaySequence);
          console.log(aTasks);
          console.log(aAllAreas);
          console.log(aAllPhases);
          var oVBox = oView.byId("panelContainer");
          oVBox.removeAllItems();

          var aExpandedPanels = this.AppState.data.aExpandedPanels || [];
          var oSelectedTask = this.AppState.data.oSelectedTask || null;

          // Create panels for all areas
          aAllAreas.forEach((oArea) => {
            // Calculate max tasks per phase in this specific area
            var maxTaskCount = Math.max(
              ...aAllPhases.map(
                (oPhase) =>
                  aTasks.filter(
                    (task) =>
                      task.area_ID === oArea.ID && task.phase_ID === oPhase.ID
                  ).length
              ),
              1 // Ensure at least 1 GridList exists
            );

            var bExpanded = aExpandedPanels.some(
              (panel) => panel.areaID === oArea.ID && panel.expanded
            );

            var oPanel = new Panel({
              expandable: true,
              expanded: true,
              headerText: oArea.name,
              enableScrolling: false,
            });
            oPanel.data("areaID", oArea.ID);

            var oToolbar = new Toolbar({
              content: [
                new ToolbarSpacer(),
              new Title({ text: oArea.name, level: "H1",tooltip: oArea.Description }),
                new ToolbarSpacer(),

                new Button({
                  icon: "sap-icon://edit",
                  type: "Critical",
                  visible: this.AppState.data.oRoleBasesVisiblity.isEditAreaVisible,
                  press: this.onEditArea.bind(this),
                }),
              ],
            });
            oPanel.setHeaderToolbar(oToolbar);

            var aGridLists = []; // Store GridLists for this area

            // Create GridLists dynamically based on max tasks per phase in this area
            for (let i = 0; i < maxTaskCount; i++) {
              aGridLists.push(new GridList());
            }

            // Iterate over all phases
            aAllPhases.forEach((oPhase) => {
              var aPhaseTasks = aTasks.filter(
                (task) =>
                  task.area_ID === oArea.ID && task.phase_ID === oPhase.ID
              );

              // Track which GridLists have tasks added
              var addedTasks = new Array(maxTaskCount).fill(false);

              if (aPhaseTasks.length > 0) {
                aPhaseTasks.forEach((task, index) => {
                  var oTaskBox = new VBox({
                    items: [
                      new Label({
                        text: task.name,
                        wrapping: true,
                        design: "Bold",
                      }),
                      new Text({ text: task.description }),
                      new Text({
                        text: "Owner: " + (task.responsible?.name ?? ""),
                      }),
                      // new Text({
                      //   text: "ID: " + (task.ID ?? ""),
                      //   visible: false,
                      // }),
                      // new Text({
                      //   text: "IsCritical: " + (task.isCriticalToMilestone ?? ""),
                      //   visible: false,
                      // }),
                      new Button({
                        icon: "sap-icon://flag",
                        type: "Critical",
                        visible: !!task.isCriticalToMilestone,
                      }),
                    ],
                  }).addStyleClass("sapUiTinyMargin");

                  // Add Progress Indicator
                  if (task.pct_complete !== null) {
                    let roundedValue = this.formatPercentage(task.pct_complete); // Apply formatter
                
                    oTaskBox.addItem(
                        new ProgressIndicator({
                            percentValue: roundedValue,
                            displayValue: `${roundedValue}%`, // Display formatted value with '%'
                            state: "Success",
                            height: "1.5rem",
                        })
                    );
                }

                  // Add Dates if available
                  if (task.planned_start && task.planned_finish) {
                    oTaskBox.addItem(
                      new Label({ text: "Planned Start - Planned Finish" })
                    );
                    oTaskBox.addItem(
                      new Text({
                        text: `${task.planned_start
                          .toISOString()
                          .slice(0, 10)} - ${task.planned_finish
                            .toISOString()
                            .slice(0, 10)}`,
                      })
                    );
                  }

                  // Assign each task to the corresponding GridList (per phase order)
                  aGridLists[index].addItem(
                    new GridListItem({
                      content: [oTaskBox],
                      press: this.onCardPress.bind(this), // Attach click event
                      type: "Active",
                      customData: new CustomData({
                        key: "taskData",
                        value: task, // Store full task object for easy retrieval
                      }),
                    })
                  );
                  //   var oGridItem = new GridListItem({
                  //     content: [oTaskBox],
                  //     press: this.onCardPress.bind(this),
                  //     type: "Active",
                  //     customData: new CustomData({ key: "taskData", value: task })
                  // });

                  //   aGridLists[index].addItem(oGridItem);
                  addedTasks[index] = true;

                  // If this task was previously selected, simulate a click to open it
                  //   if (oSelectedTask) {
                  //     this.onCardPress({ getSource: () => oGridItem });
                  // }
                });
              }

              // Ensure "No task exist" is added to every empty GridList for this phase
              addedTasks.forEach((taskAdded, index) => {
                if (!taskAdded) {
                  var oNoTaskBox = new VBox({
                    // items: [new Text({ text: "No task exist" })],
                  }).addStyleClass("noTaskText");

                  var oGridListItem = new GridListItem({
                    content: [oNoTaskBox],
                  }).addStyleClass("noTaskText"); // Apply background color to the entire item

                  aGridLists[index].addItem(oGridListItem);
                }
              });
            });

            // Add all GridLists to the panel (only for this area)
            aGridLists.forEach((oGridList) => oPanel.addContent(oGridList));

            oVBox.addItem(oPanel);
          }, this);
        },

        onCardPress: function (oEvent) {
      
          let sLoginPerson = this.AppState.data.oRoleBasesVisiblity.sLoginPerson;
            this.AppState.fieldAccessToAdministrator(sLoginPerson);
          var oView = this.getView();
          var oVBox = oView.byId("panelContainer");
          var aPanels = oVBox.getItems();

          // Store expanded states in AppState
          var aExpandedPanels = aPanels.map((oPanel) => ({
            areaID: oPanel.data("areaID"),
            expanded: oPanel.getExpanded(),
          }));

          this.AppState.data.aExpandedPanels = aExpandedPanels;          

          this.AppState.data.oSelectedMilestone = {};
          this.AppState.data.makeTaskMilestoneVisiblity.milestonevisiblity = false;
          this.AppState.data.makeTaskMilestoneVisiblity.taskvisiblity = true;
          this.AppState.data.makeTaskMilestoneVisiblity.EditAreaVisiblity = false;
          this.AppState.data.sidePanelOpen = false;

          if(this.AppState.data.oRoleBasesVisiblity.sLoginPerson == "Enterprise Portfolio Administrator" || this.AppState.data.oRoleBasesVisiblity.sLoginPerson == "Project Manager" || this.AppState.data.oRoleBasesVisiblity.sLoginPerson == "Project Area Leader"){
          this.getView().byId("idEditBtn").setVisible(true);
          this.getView().byId("idEditSaveTaskBtn").setVisible(true);
          this.getView().byId("idEditSaveMilestoneBtn").setVisible(false);
          // this.getView().byId("idEditDeleteBtn").setVisible(false);
          // this.getView().byId("idEditDeleteTaskBtn").setVisible(true);
          this.getView().byId("idEditSaveAreaBtn").setVisible(false);
          }
          if(this.AppState.data.oRoleBasesVisiblity.sLoginPerson == "Project Gate Keeper" || this.AppState.data.oRoleBasesVisiblity.sLoginPerson == "Activity Performer"){
          this.getView().byId("idEditBtn").setVisible(true);
          this.getView().byId("idEditSaveTaskBtn").setVisible(false);
          this.getView().byId("idEditSaveMilestoneBtn").setVisible(false);
          // this.getView().byId("idEditDeleteBtn").setVisible(false);
          // this.getView().byId("idEditDeleteTaskBtn").setVisible(true);
          this.getView().byId("idEditSaveAreaBtn").setVisible(false);
          }
          if(this.AppState.data.oRoleBasesVisiblity.sLoginPerson == "Task Responsible"){
          this.getView().byId("idEditBtn").setVisible(true);
          this.getView().byId("idEditSaveTaskBtn").setVisible(true);
          this.getView().byId("idEditSaveMilestoneBtn").setVisible(false);
          // this.getView().byId("idEditDeleteBtn").setVisible(false);
          // this.getView().byId("idEditDeleteTaskBtn").setVisible(false);
          this.getView().byId("idEditSaveAreaBtn").setVisible(false);
          }

          // Get full task object from `customData`
          let oTask = oEvent.getSource().getCustomData()[0].getValue();
          // Prepare payload
          let oSelectedPayload = {
            ID: oTask.ID,
            description: oTask.description,
            isCriticalToMilestone: oTask.isCriticalToMilestone,
            fore_act_start: oTask.fore_act_start,
            fore_act_finish: oTask.fore_act_finish,
            responsible_ID: oTask.responsible_ID,
            state: oTask.state,
            status: oTask.status,
            name: oTask.name,
            planned_start: oTask.planned_start
              ? new Date(oTask.planned_start)
              : null,
            planned_finish: oTask.planned_finish
              ? new Date(oTask.planned_finish)
              : null,
            pct_complete: oTask.pct_complete ?? 0,
            area_ID: oTask.area_ID,
            phase_ID: oTask.phase_ID,
            pct_weight: oTask.pct_weight ?? 0,
            earned_value: oTask.earned_value ?? 0,
            contributeToMilestone_ID: oTask.contributeToMilestone_ID,
            actualStart: oTask.actualStart,
            actualFinish: oTask.actualFinish,
            area: oTask.area,
            phase: oTask.phase,
          };

          // Store in AppState
          this.AppState.data.oSelectedTask = oSelectedPayload;

          this.AppState.data.showTaskInActivity = oSelectedPayload;

          // Update layout
          let sLayout = LayoutType.TwoColumnsBeginExpanded;
          this.getModel("manageRoadmapLayoutView").setProperty(
            "/layout",
            sLayout
          );
          this.getModel("manageRoadmapLayoutView").refresh(true);
        },
        onEditArea: function (oEvent) {
          // let aaa= oEvent.getSource().getParent().getParent().getHeaderToolbar().getBindingContext("AppState").getObject().ID;
 
        if(this.AppState.data.oRoleBasesVisiblity.sLoginPerson == "Enterprise Portfolio Administrator" || this.AppState.data.oRoleBasesVisiblity.sLoginPerson == "Project Manager"){
          this.getView().byId("idEditBtn").setVisible(false);
          this.getView().byId("idEditSaveTaskBtn").setVisible(false);
          this.getView().byId("idEditSaveMilestoneBtn").setVisible(false);
          // this.getView().byId("idEditDeleteBtn").setVisible(false);
          // this.getView().byId("idEditDeleteTaskBtn").setVisible(false);
          this.getView().byId("idEditSaveAreaBtn").setVisible(true);
        }

          this.AppState.data.makeTaskMilestoneVisiblity.EditAreaVisiblity = true;
          this.AppState.data.makeTaskMilestoneVisiblity.milestonevisiblity = false;
          this.AppState.data.makeTaskMilestoneVisiblity.taskvisiblity = false;

          // Retrieve the selected panel area details
          let oPanel = oEvent.getSource().getParent().getParent(); // Get the Panel
          let sAreaName = oPanel.getHeaderText(); // Get the Area Name

          let oView = this.getView();
          let aAllAreas = oView.getModel("AppState").getProperty("/aArea");
          let oSelectedArea =
            aAllAreas.find((area) => area.name === sAreaName) || {};

          this.AppState.data.oSelectedArea = {
            name: oSelectedArea.name,
            Description: oSelectedArea.Description,
            responsible_ID: oSelectedArea.responsible_ID || null,
            ID: oSelectedArea.ID || null,
          };

          // Change Layout
          let sLayout = LayoutType.TwoColumnsBeginExpanded;
          this.getModel("manageRoadmapLayoutView").setProperty(
            "/layout",
            sLayout
          );
        },
        onSaveArea: function () {
          let oProjectAreaDetails = this.AppState.data.oSelectedArea;
          this.AppState.updateProjectArea(oProjectAreaDetails);
        },
        onCloseDetailPage: function () {
          var sLayout = LayoutType.OneColumn;
          this.getView()
            .getModel("manageRoadmapLayoutView")
            .setProperty("/layout", sLayout);
        },
        onManageActivity: function () {
          let sTaskID = this.AppState.data.oSelectedTask.ID;
          this.AppState.data.currentTaskID = sTaskID;
          let sTaskName = this.AppState.data.oSelectedTask.name;
          this.AppState.data.sTaskStartDate =
            this.AppState.data.oSelectedTask.planned_start;
          this.AppState.data.sTaskFinishDate =
            this.AppState.data.oSelectedTask.planned_finish;
          let sProjectName = this.getView()
            .byId("manageRoadmapPage")
            .getTitle();
          this.getOwnerComponent()
            .getRouter()
            .navTo("ManageActivity", {
              sTaskID: sTaskID,
              sTaskName: encodeURIComponent(sTaskName),
              sProjectName: sProjectName,
            });
        },
        onSaveTask: function () {
          if (!this._validateTaskForm()) {
            return;
          }
          var oTask = this.AppState.data.oSelectedTask;
       
          this.AppState.data.Itemtype = "Task";
          this.AppState.data.currentItemID = oTask.ID;
          this.AppState.createNewTask(oTask);
        },
        onSaveMilestone: function () {
          if (!this._validateMilestoneForm()) {
            return;
          }
          let oSelectedMilestone = this.AppState.data.oSelectedMilestone;
          this.AppState.createMilestone(oSelectedMilestone);
        },
        onClickMilestone: function (oEvent) {
          if(this.AppState.data.oRoleBasesVisiblity.sLoginPerson == "Enterprise Portfolio Administrator" || this.AppState.data.oRoleBasesVisiblity.sLoginPerson == "Project Gate Keeper"){
          this.getView().byId("idEditBtn").setVisible(false);
          this.getView().byId("idEditSaveTaskBtn").setVisible(false);
          this.getView().byId("idEditSaveMilestoneBtn").setVisible(true);
          // this.getView().byId("idEditDeleteBtn").setVisible(true);
          // this.getView().byId("idEditDeleteTaskBtn").setVisible(false);
          this.getView().byId("idEditSaveAreaBtn").setVisible(false);
          }
          if(this.AppState.data.oRoleBasesVisiblity.sLoginPerson == "Project Manager" || this.AppState.data.oRoleBasesVisiblity.sLoginPerson == "Project Area Leader" || this.AppState.data.oRoleBasesVisiblity.sLoginPerson == "Task Responsible" || this.AppState.data.oRoleBasesVisiblity.sLoginPerson == "Activity Performer"){
          this.getView().byId("idEditBtn").setVisible(false);
          this.getView().byId("idEditSaveTaskBtn").setVisible(false);
          this.getView().byId("idEditSaveMilestoneBtn").setVisible(false);
          // this.getView().byId("idEditDeleteBtn").setVisible(true);
          // this.getView().byId("idEditDeleteTaskBtn").setVisible(false);
          this.getView().byId("idEditSaveAreaBtn").setVisible(false);
          }        



          let sLoginPerson = this.AppState.data.oRoleBasesVisiblity.sLoginPerson;
            this.AppState.fieldAccessToAdministrator(sLoginPerson);           
          
            this.AppState.data.oSelectedTask = {};
            this.AppState.data.sidePanelOpen = false;
            this.AppState.data.makeTaskMilestoneVisiblity.milestonevisiblity = true;
            this.AppState.data.makeTaskMilestoneVisiblity.EditAreaVisiblity = false;
            this.AppState.data.makeTaskMilestoneVisiblity.taskvisiblity = false;
   
   
            this.AppState.data.makeTaskMilestoneVisiblity.milestonevisiblity1 = true
            this.AppState.data.oRoleBasesVisiblity.areaLeaderSaveBtnVisiblity = true
            this.AppState.data.oRoleBasesVisiblity.showMilestoneSave = true
            let oSelectedMilestoneObject =
              oEvent.getSource()?.getBindingContext("AppState")?.getObject() ||
              {};
            this.AppState.data.oSelectedMilestone = oSelectedMilestoneObject;
            var sLayout = LayoutType.TwoColumnsBeginExpanded;
            this.getModel("manageRoadmapLayoutView").setProperty(
              "/layout",
              sLayout
            );
          },
        _validateTaskForm: function () {
          var bValid = true;
          var oView = this.getView();
          var aInputs = [
            oView.byId("name"),
            oView.byId("tstart"),
            oView.byId("tend"),
            oView.byId("idphase"),
            oView.byId("idarea"),
            oView.byId("idowner"),
            oView.byId("weight"),
          ];
          aInputs.forEach(function (oInput) {
            if (!oInput.getValue()) {
              oInput.setValueState("Error");
              oInput.setValueStateText("This field is mandatory");
              bValid = false;
            } else {
              oInput.setValueState("None");
            }
          });

          return bValid;
        },
        _validateMilestoneForm: function () {
          var bValid = true;
          var oView = this.getView();
          var aInputs = [
            oView.byId("idmilestonename"),
            oView.byId("idmilestonephase"),
            oView.byId("idmilestonetargetDate"),
          ];
          aInputs.forEach(function (oInput) {
            if (!oInput.getValue()) {
              oInput.setValueState("Error");
              oInput.setValueStateText("This field is mandatory");
              bValid = false;
            } else {
              oInput.setValueState("None");
            }
          });

          return bValid;
        },
        onDeleteMilestone: function () {
          var that = this;
          MessageBox.warning(
            "Are you sure you want to delete this Milestone?",
            {
              actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
              onClose: function (sAction) {
                if (sAction === MessageBox.Action.OK) {
                  let oMilestoneDetails = that.AppState.data.oSelectedMilestone;
                  if (oMilestoneDetails)
                    that.AppState.deleteMilestoneEntry(oMilestoneDetails);
                  var sLayout = LayoutType.OneColumn;
                  that
                    .getModel("manageRoadmapLayoutView")
                    .setProperty("/layout", sLayout);
                }
              },
            }
          );
        },
        onDeleteTask: function () {
          var that = this;
          MessageBox.warning("Are you sure you want to delete this Task?", {
            actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
            onClose: function (sAction) {
              if (sAction === MessageBox.Action.OK) {
                let oTaskDetails = that.AppState.data.oSelectedTask;
                if (oTaskDetails) that.AppState.deleteTaskEntry(oTaskDetails);
                var sLayout = LayoutType.OneColumn;
                that
                  .getModel("manageRoadmapLayoutView")
                  .setProperty("/layout", sLayout);
              }
            },
          });
        },
        onChangeDate: function (oEvent) {
          let oInput = oEvent.getSource(); // Get the input field
          let uservalue = oInput.getValue(); // Format: MM/DD/YY
          let startDate = this.AppState.data.oSelectedTask.planned_start;
          let userDate = new Date(uservalue);
          let systemStartDate = new Date(startDate);
          let startDateFormatted =
            startDate.getMonth() +
            1 +
            "/" +
            startDate.getDate() +
            "/" +
            (startDate.getFullYear() % 100);

          if (userDate < systemStartDate) {
            oInput.setValueState("Error");
            oInput.setValueStateText(
              `Enter date should not be less than ${startDateFormatted}`
            );
            oInput.setValue("");
          } else {
            oInput.setValueState("None");
            oInput.setValueStateText("");
          }
        },
        formatPercentage: function (value) {
          if (value !== undefined && value !== null) {
              return Math.round(value)
          }
      }
      }
    );
  }
);