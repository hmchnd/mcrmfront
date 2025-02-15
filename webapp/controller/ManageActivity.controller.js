sap.ui.define(
  [
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/dnd/DragInfo",
    "sap/f/dnd/GridDropInfo",
    "sap/ui/core/library",
    "sap/ui/core/Fragment",
    "sap/f/LayoutType",
    "sap/m/MessageBox",
  ],
  (
    Controller,
    JSONModel,
    DragInfo,
    GridDropInfo,
    coreLibrary,
    Fragment,
    LayoutType,
    MessageBox
  ) => {
    "use strict";
    // Shortcuts for drag-and-drop constants
    var DropPosition = coreLibrary.dnd.DropPosition;
    var DropLayout = coreLibrary.dnd.DropLayout;

    return Controller.extend(
      "framsys.com.framsysfrontend.controller.ManageActivity",
      {
        onInit() {
          //   var oData = {
          //     grid1: [
          //       {
          //         title:
          //           "Create an Innovation Strategy and a High-Level Road Map",
          //         subtitle:
          //           "Create an Innovation Strategy and a High-Level Road Map",
          //         iconSrc: "sap-icon://bus-public-transport",
          //         task: "Strategic Planning",
          //         owner: "John Doe",
          //         deadline: "2024-01-10",
          //         value: "0",
          //       },
          //     ],
          //     grid2: [
          //       {
          //         title: "Run an Innovation Discovery and Design Workshop",
          //         subtitle: "Run an Innovation Discovery and Design Workshop",
          //         iconSrc: "sap-icon://presentation",
          //         task: "Strategic Planning",
          //         owner: "Emily Davis",
          //         deadline: "2024-01-25",
          //         value: "30",
          //       },
          //       {
          //         title: "Create a 360-Degree View on Security",
          //         subtitle: "Create a 360-Degree View on Security",
          //         iconSrc: "sap-icon://group",
          //         task: "Strategic Planning",
          //         owner: "Alex Martinez",
          //         deadline: "2024-02-10",
          //         value: "40",
          //       },
          //     ],
          //     grid3: [
          //       {
          //         title: "Define the Analytics Architecture",
          //         subtitle: "Define the Analytics Architecture",
          //         iconSrc: "sap-icon://presentation",
          //         task: "Strategic Planning",
          //         owner: "Emily Davis",
          //         deadline: "2024-01-25",
          //         value: "100",
          //       },
          //       {
          //         title: "Define Clean Core Success Plan",
          //         subtitle: "Define Clean Core Success Plan",
          //         iconSrc: "sap-icon://group",
          //         task: "Strategic Planning",
          //         owner: "Alex Martinez",
          //         deadline: "2024-02-10",
          //         value: "100",
          //       },
          //     ],
          //   };

          //   var oModel = new JSONModel(oData);
          //   this.getView().setModel(oModel);

          //   this.attachDragAndDrop();
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.getRoute("ManageActivity").attachPatternMatched(this.onRouteMatched, this);

        },
        attachDragAndDrop: function () {
          debugger
          
          var aGridIds = ["NEW", "INPROGRESS", "COMPLETED"];
          var oView = this.getView();

          aGridIds.forEach(function (sGridId) {
            var oGrid = oView.byId(sGridId);

            // Enable dragging
            oGrid.addDragDropConfig(new DragInfo({
              sourceAggregation: "items"
            }));

            // Enable dropping
            oGrid.addDragDropConfig(new GridDropInfo({
              targetAggregation: "items",
              dropPosition: DropPosition.Between,
              dropLayout: DropLayout.Horizontal,
              dropIndicatorSize: this.onDropIndicatorSize.bind(this),
              drop: this.onDrop.bind(this)
            }));
          }.bind(this));
        },
        onDropIndicatorSize: function (oDraggedControl) {
          var oBindingContext = oDraggedControl.getBindingContext("AppState"),
            oData = oBindingContext.getModel("AppState").getProperty(oBindingContext.getPath());

          return {
            rows: oData.rows,
            columns: oData.columns
          };
        },

        onDrop: function (oInfo) {
         
          var oDragged = oInfo.getParameter("draggedControl"),
            oDropped = oInfo.getParameter("droppedControl"),
            sInsertPosition = oInfo.getParameter("dropPosition"),
            oDragContainer = oDragged.getParent(),
            oDropContainer = oInfo.getSource().getParent(),
            oDragModel = oDragContainer.getModel("AppState"),
            oDropModel = oDropContainer.getModel("AppState"),
            sDragPath = oDragged.getBindingContext("AppState").getPath(),
            oDraggedData = oDragModel.getProperty(sDragPath),
            sTargetGridId = oDropContainer.getId(),  // Get the target grid ID

            // Determine the new GridID based on the target grid
            sNewGridID = sTargetGridId.split("-").pop();  // Extract grid number from ID (e.g., 'grid2' -> '2')

          // Remove dragged item from its original container
          var aDragData = oDragModel.getProperty(oDragContainer.getBinding("items").getPath());
          aDragData.splice(oDragContainer.indexOfItem(oDragged), 1);

          // Handle the case where the drop target is empty
          var aDropData = oDropModel.getProperty(oDropContainer.getBinding("items").getPath());
          if (oDropped) {
            var iDropIndex = oDropContainer.indexOfItem(oDropped);
            if (sInsertPosition === "After") {
              iDropIndex++;
            }
            aDropData.splice(iDropIndex, 0, oDraggedData);
          } else {
            // If no tile exists in the drop container, simply add the dragged tile
            aDropData.push(oDraggedData);
          }

          // Update the GridID of the dragged item to reflect the new grid
          oDraggedData.state = sNewGridID;
          if (oDraggedData.state == "COMPLETED") {
            oDraggedData.pct_complete = "100"
          }
          if (oDraggedData.state == "NEW") {
            oDraggedData.pct_complete = "0"
          }
          let oActivityDetails = oDraggedData;// Update the GridID in the model

          // Call OData update to update the GridID in the backend
          this.AppState.createNewActivityEntry(oActivityDetails);
          // this.getView().getModel("AppState").refresh(true);

        },
        onAddActivity: function () {
          if (!this.oAddDialog) {
            Fragment.load({
              id: this.getView().getId(),
              name: "framsys.com.framsysfrontend.fragment.AddActivity",
              controller: this,
            }).then((oDialog) => {
              this.oAddDialog = oDialog;
              this.getView().addDependent(this.oAddDialog);
              oDialog.open();
            });
          } else {
            this.oAddDialog.open();
          }
        },
        onCancel: function () {
          this.oAddDialog.close();
        },
        onCreateNewTask: function () {
          // Get the model
          const oModel = this.getView().getModel();
          const oData = oModel.getData();
          // const length = oData.grid1.length;

          const oDialog = this.byId("_IDGenDialog3");
          const newActivity = {
            title: this.byId("_IDGenInput5").getValue(),
            subtitle: this.byId("_IDGenInput6").getValue(),
            task: this.byId("_IDGenDatePicker").getValue(),
            owner: this.byId("_IDGenDatePicker1").getValue(),
            deadline: this.byId("_IDGenDatePicker2").getValue(),
            iconSrc: "sap-icon://presentation",
          };

          // Add the new activity to the "grid1" array
          oData.grid1.push(newActivity);

          // Update the model
          oModel.refresh();

          // Close the dialog
          oDialog.close();

          // Optional: Show a success message
          sap.m.MessageToast.show("New activity added successfully!");
        },
        // onCardPress:function(){
        //     if (!this.oEditDialog) {
        //         Fragment.load({
        //             id: this.getView().getId(),
        //             name: "framsys.com.framsysfrontend.fragment.EditActivity",
        //             controller: this,
        //         }).then((oDialog) => {
        //             this.oEditDialog = oDialog;
        //             this.getView().addDependent(this.oEditDialog);
        //             oDialog.open();
        //         });
        //     } else {
        //         this.oEditDialog.open();
        //     }
        // },
        onCancelEditDialog: function () {
          this.oEditDialog.close();
        },
        onAfterRendering: function () {
          var sLayout = LayoutType.OneColumn;
          this.getModel("activityLayoutView").setProperty("/layout", sLayout);
        },
        onCardPress: function (oEvent) {
          let sLoginPerson = this.AppState.data.oRoleBasesVisiblity.sLoginPerson;
            this.AppState.fieldAccessToAdministrator(sLoginPerson);
          this.AppState.data.sidePanelOpen = false;
          let oSelectedActivityObject =
            oEvent.getSource()?.getBindingContext("AppState")?.getObject() ||
            {};
          this.AppState.data.oSelectedActivity = oSelectedActivityObject;
          // this.AppState.data.oSelectedActivity.planned_start = this.AppState.data.sTaskStartDate;
          // this.AppState.data.oSelectedActivity.planned_finish = this.AppState.data.sTaskFinishDate;
          var sLayout = LayoutType.TwoColumnsBeginExpanded;
          this.getModel("activityLayoutView").setProperty("/layout", sLayout);
        },
        onCloseDetailPage: function () {
          var sLayout = LayoutType.OneColumn;
          this.getModel("activityLayoutView").setProperty("/layout", sLayout);
        },
        onRouteMatched: function (oEvent) {
          this.AppState = this.getOwnerComponent().getState("App");
          this.getView().setModel(this.AppState.getModel(), "AppState");
          let sTaskID = oEvent.getParameter("arguments").sTaskID;
          let sTaskName = decodeURIComponent(oEvent.getParameter("arguments").sTaskName);
          let sPhaseName  = this.AppState.data.oSelectedTask.phase.name
          let sAreaName  = this.AppState.data.oSelectedTask.area.name
          let sProjectName = oEvent.getParameter("arguments").sProjectName;
          this.getView().byId("projectTitle").setTitle(`${sProjectName} / ${sAreaName} / ${sPhaseName} / ${sTaskName}`);
          this.AppState.getModel().setSizeLimit(999999);
          // this.AppState.data.showGlobalAddButton = true;
          if (this.AppState.data.oRoleBasesVisiblity.sLoginPerson=="Project Area Leader") {
            this.AppState.data.showGlobalAddButton = false;       
          }
          if (this.AppState.data.oRoleBasesVisiblity.sLoginPerson=="Task Responsible") {
            this.AppState.data.showGlobalAddButton = true;   
            this.AppState.data.oRoleBasesVisiblity.saveBtnVisiblity = true;

          }
          this.AppState.data.showBackToRoadmapButton = true;
          this.AppState.setViewController(this);
          this.AppState.data.currentPage = "manageActivity";
          // let oGridListControl = this.byId("gridList");
          this.AppState.data.oSelectedTask = sTaskID;
          this.AppState.getMyActivityList(this.AppState.data.oSelectedTask);
          this.AppState.data.currentPageLabel = "Manage Activity";
          this.AppState.getModel().refresh(true);
        },
        onSaveProjectDetails: function () {
          if (!this._validateActivityForm()) {
            return;
          }
          let oActivityDetails = this.AppState.data.oSelectedActivity;
          this.AppState.data.Itemtype = "Activity"; 
          this.AppState.data.currentItemID = oActivityDetails.ID;

          // oProjectDetails.planned_start = new Date(oProjectDetails.planned_start);
          // oProjectDetails.planned_finish = new Date(oProjectDetails.planned_finish);
          this.AppState.createNewActivityEntry(oActivityDetails);
        },
        _validateActivityForm: function () {
          var bValid = true;
          var oView = this.getView();
          var aInputs = [
            oView.byId("aname"),
            oView.byId("astart"),
            oView.byId("aend"),
            oView.byId("aowner"),
            oView.byId("apctweight"),
            

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

        calculateActivityCounts: function () {
        
          let oModel = this.getView().getModel("AppState");
          let aActivities = oModel.getProperty("/aActivity") || [];

          var iNotStarted = aActivities.filter(item => item.state === "NEW").length || 0;
          var iInProgress = aActivities.filter(item => item.state === "INPROGRESS").length || 0;
          var iCompleted = aActivities.filter(item => item.state === "COMPLETED").length || 0;
          this.getView().byId("new").setText(`NOT STARTED (${iNotStarted})`);
          this.getView().byId("completed").setText(`COMPLETED (${iCompleted})`);
          this.getView().byId("inprogress").setText(`IN PROGRESS (${iInProgress})`);



        },
        onDeleteActivity: function () {

          var that = this;
          MessageBox.warning("Are you sure you want to delete this Activity?", {
            actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
            onClose: function (sAction) {
              if (sAction === MessageBox.Action.OK) {
                let oActivityDetails = that.AppState.data.oSelectedActivity;
                if (oActivityDetails)
                  that.AppState.deleteActivityEntry(oActivityDetails);
                var sLayout = LayoutType.OneColumn;
                that
                  .getModel("activityLayoutView")
                  .setProperty("/layout", sLayout);
              }
            },
          });

        },
        fnMakeCompleteVisibleCard: function (sValue) {
          if (sValue == 100) {

            return true;

          } else {
            return false;
          }
        },
        fnMakeProgressVisibleCard: function (sValue) {
          if (sValue > 0 && sValue < 100) {

            return true;

          } else {
            return false;
          }

        },
        fnMakeNewVisibleCard: function (sValue) {
          if (sValue == 0) {

            return true;

          } else {
            return false;
          }
        },
        onChangeDate: function (oEvent) {
          let oInput = oEvent.getSource(); // Get the input field
          let uservalue = oInput.getValue(); // Format: MM/DD/YY
          let startDate = this.AppState.data.sTaskStartDate;
          let endDate = this.AppState.data.sTaskFinishDate;
          
          // New: Get planned start date from selected activity
          let plannedStartDate = this.AppState.data.oSelectedActivity.planned_start;
      
          let startDateFormatted = (startDate.getMonth() + 1) + "/" + startDate.getDate() + "/" + (startDate.getFullYear() % 100);
          let endDateFormatted = (endDate.getMonth() + 1) + "/" + endDate.getDate() + "/" + (endDate.getFullYear() % 100);
          
          // Convert values to Date objects
          let userDate = new Date(uservalue);
          let systemStartDate = new Date(startDateFormatted);
          let systemEndDate = new Date(endDateFormatted);
          let plannedStart = new Date(plannedStartDate); // Convert planned start date to Date object
      
          // Check if userDate is outside system-defined start/end range
          if (userDate < systemStartDate || userDate > systemEndDate) {
              oInput.setValueState("Error");
              oInput.setValueStateText(`Enter date should be in range ${startDateFormatted} - ${endDateFormatted}`);
              oInput.setValue("");
              return;
          }
      
          // New: Check if planned finish is before planned start
          if (oInput.getId().includes("aend") && userDate < plannedStart) {
              oInput.setValueState("Error");
              oInput.setValueStateText("Planned Finish Date cannot be earlier than Planned Start Date.");
              oInput.setValue("");
              return;
          }
      
          // If everything is fine, clear errors
          oInput.setValueState("None");
          oInput.setValueStateText("");
      },
      onShowTask : function(oEvent){  
        // this.AppState.data.sidePanelOpen = false;
        // let oSelectedActivityObject =
        //   oEvent.getSource()?.getBindingContext("AppState")?.getObject() ||
        //   {};
        //this.AppState.data.oSelectedActivity = oSelectedActivityObject;
        // this.AppState.data.oSelectedActivity.planned_start = this.AppState.data.sTaskStartDate;
        // this.AppState.data.oSelectedActivity.planned_finish = this.AppState.data.sTaskFinishDate;
        // var sLayout = LayoutType.ThreeColumnsMidExpanded;
        // this.getModel("activityLayoutView").setProperty("/layout", sLayout);

        if (!this.oShowTaskInActivity) {
          Fragment.load({
            id: this.getView().getId(),
            name: "framsys.com.framsysfrontend.fragment.ShowTaskInActivity",
            controller: this
          }).then(oDialog => {
            this.oShowTaskInActivity = oDialog
            this.getView().addDependent(oDialog)
            oDialog.open()
          })
        } else {
          this.oShowTaskInActivity.open()
        }
      
      },
      onCloseShowTaskInActivity:function(){
        this.oShowTaskInActivity.close()

        // var sLayout = LayoutType.TwoColumnsBeginExpanded;
        // this.getModel("activityLayoutView").setProperty("/layout", sLayout);
      }
    
      
      }
    );
  }
);