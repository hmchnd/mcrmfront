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
    "sap/f/LayoutType",
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
    LayoutType
  ) {
    "use strict";
 
    return BaseController.extend(
      "framsys.com.framsysfrontend.controller.ManageRoadmap",
      {
        onInit: function () {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.attachRouteMatched(this.onRouteMatched, this);
        },
 
        onRouteMatched: function (oEvent) {
          this.AppState = this.getOwnerComponent().getState("App");
          this.getView().setModel(this.AppState.getModel(), "AppState");
          this.AppState.getModel().setSizeLimit(999999);
          this.AppState.setViewController(this);
          this.AppState.data.showGlobalAddButton = true;
          this.AppState.data.currentPage = "ManageRoadmap";
          this.AppState.getMyFrameworkList();
          this.AppState.data.currentPageLabel = "Manage Roadmap";
          this.AppState.getModel().refresh(true);
        },
 
        createPanels: function () {
          var oView = this.getView();
          var aTasks = oView.getModel("AppState").getProperty("/aFramework/0/templateTasks/results");
          var aAllAreas = oView.getModel("AppState").getProperty("/aFramework/0/templateAreas/results");
          var aAllPhases = oView.getModel("AppState").getProperty("/aFramework/0/templatePhases/results");
          var oVBox = oView.byId("panelContainer");
          oVBox.removeAllItems();
       
          // Create panels for all areas
          aAllAreas.forEach(oArea => {
            // Calculate max tasks per phase in this specific area
            var maxTaskCount = Math.max(
              ...aAllPhases.map(oPhase =>
                aTasks.filter(task => task.area.ID === oArea.ID && task.phase.ID === oPhase.ID).length
              ),
              1 // Ensure at least 1 GridList exists
            );
       
            var oPanel = new Panel({
              expandable: true,
              expanded: false,
              headerText: oArea.name,
              enableScrolling: false,
            });
       
            var oToolbar = new Toolbar({
              content: [
                new ToolbarSpacer(),
                new Title({ text: oArea.name, level: "H1" }),
                new ToolbarSpacer(),
              ],
            });
            oPanel.setHeaderToolbar(oToolbar);
       
            var aGridLists = []; // Store GridLists for this area
       
            // Create GridLists dynamically based on max tasks per phase in this area
            for (let i = 0; i < maxTaskCount; i++) {
              aGridLists.push(new GridList());
            }
       
            // Iterate over all phases
            aAllPhases.forEach(oPhase => {
              var aPhaseTasks = aTasks.filter(task => task.area.ID === oArea.ID && task.phase.ID === oPhase.ID);
       
              // Track which GridLists have tasks added
              var addedTasks = new Array(maxTaskCount).fill(false);
       
              if (aPhaseTasks.length > 0) {
                aPhaseTasks.forEach((task, index) => {
                  var oTaskBox = new VBox({
                    items: [
                      new Label({ text: task.name, wrapping: true, design: "Bold" }),
                      new Text({ text: task.description }),
                    ],
                  }).addStyleClass("sapUiTinyMargin");
       
                  // Add Progress Indicator
                  if (task.pct_complete !== null) {
                    oTaskBox.addItem(
                      new ProgressIndicator({
                        percentValue: task.pct_complete,
                        displayValue: `${task.pct_complete}%`,
                        state: "Success",
                        height: "1.5rem",
                      })
                    );
                  }
       
                  // Add Dates if available
                  if (task.planned_start && task.planned_finish) {
                    oTaskBox.addItem(new Label({ text: "Planned Start - Planned Finish" }));
                    oTaskBox.addItem(new Text({ text: `${task.planned_start.toISOString().slice(0, 10)} - ${task.planned_finish.toISOString().slice(0, 10)}` }));
                  }
       
                  // Assign each task to the corresponding GridList (per phase order)
                  aGridLists[index].addItem(
                    new GridListItem({
                      content: [oTaskBox],
                      press: this.onCardPress.bind(this),
                      type: "Active",
                    })
                  );
       
                  // Mark this GridList as having a task
                  addedTasks[index] = true;
                });
              }
       
              // Ensure "No task exist" is added to every empty GridList for this phase
              addedTasks.forEach((taskAdded, index) => {
                if (!taskAdded) {
                  var oNoTaskBox = new VBox({
                    items: [new Text({ text: "No task exist" })],
                  }).addStyleClass("sapUiTinyMargin");
       
                  aGridLists[index].addItem(
                    new GridListItem({
                      content: [oNoTaskBox],
                    })
                  );
                }
              });
            });
       
            // Add all GridLists to the panel (only for this area)
            aGridLists.forEach(oGridList => oPanel.addContent(oGridList));
       
            oVBox.addItem(oPanel);
          }, this);
        },
       
 
        onCardPress: function (oEvent) {
          this.AppState.data.makeTaskMilestoneVisiblity.milestonevisiblity =false ;
          this.AppState.data.makeTaskMilestoneVisiblity.taskvisiblity =true ;
          let sTitle = oEvent
            .getSource()
            .getContent()[0]
            .getItems()[0]
            .getItems()[0]
            .getText();
          let pct_complete = oEvent
            .getSource()
            .getContent()[0]
            .getItems()[0]
            .getItems()[2]
            .getPercentValue();
          let pstart = oEvent
            .getSource()
            .getContent()[0]
            .getItems()[0]
            .getItems()[4]
            .getText()
            .split(" - ")[0];
          let pend = oEvent
            .getSource()
            .getContent()[0]
            .getItems()[0]
            .getItems()[4]
            .getText()
            .split(" - ")[1];
          let oSelectedPayload = {
            name: sTitle,
            planned_start: new Date(pstart),
            planned_finish: new Date(pend),
            pct_complete: pct_complete,
            area_ID: "25dd8173-4b2c-4997-952d-ab5429650586",
            phase_ID: "d6cc8920-dd81-48a7-ae36-09c30e60c1df",
          };
 
          this.AppState.data.oSelectedTask = oSelectedPayload;
          let sLayout = LayoutType.TwoColumnsBeginExpanded;
          this.getModel("manageRoadmapLayoutView").setProperty(
            "/layout",
            sLayout
          );
          this.getModel("manageRoadmapLayoutView").refresh(true);
        },
        onCloseDetailPage: function () {
          var sLayout = LayoutType.OneColumn;
          this.getView()
            .getModel("manageRoadmapLayoutView")
            .setProperty("/layout", sLayout);
        },
        onManageActivity: function () {
          this.getOwnerComponent().getRouter().navTo("ManageActivity");
        },
        onSaveTask: function () {
          var oTask = this.AppState.data.oSelectedTask;
          this.AppState.createNewTask(oTask);
        },
       
      }
    );
  }
);