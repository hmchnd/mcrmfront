sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
	"sap/ui/core/dnd/DragInfo",
	"sap/f/dnd/GridDropInfo",
	"sap/ui/core/library",
    "sap/ui/core/Fragment",
    "sap/f/LayoutType",

], (Controller, JSONModel, DragInfo, GridDropInfo, coreLibrary, Fragment,LayoutType) => {
    "use strict";
// Shortcuts for drag-and-drop constants
var DropPosition = coreLibrary.dnd.DropPosition;
var DropLayout = coreLibrary.dnd.DropLayout;

    return Controller.extend("framsys.com.framsysfrontend.controller.ManageActivity", {
        onInit() {
            var oData = {
               
                
                    "grid1": [
                        {
                            "title": "Create an Innovation Strategy and a High-Level Road Map",
                            "subtitle": "Create an Innovation Strategy and a High-Level Road Map",
                            "iconSrc": "sap-icon://bus-public-transport",
                            "task": "Strategic Planning",
                            "owner": "John Doe",
                            "deadline": "2024-01-10",
                            "value":"0"
                        }                      
                    ],
                    "grid2": [
                        {
                            "title": "Run an Innovation Discovery and Design Workshop",
                            "subtitle": "Run an Innovation Discovery and Design Workshop",
                            "iconSrc": "sap-icon://presentation",
                            "task": "Strategic Planning",
                            "owner": "Emily Davis",
                            "deadline": "2024-01-25",
                            "value":"30"
                        },
                        {
                            "title": "Create a 360-Degree View on Security",
                            "subtitle": "Create a 360-Degree View on Security",
                            "iconSrc": "sap-icon://group",
                            "task": "Strategic Planning",
                            "owner": "Alex Martinez",
                            "deadline": "2024-02-10",
                            "value":"40"
                        }
                    ],
                    "grid3": [
                        {
                            "title": "Define the Analytics Architecture",
                            "subtitle": "Define the Analytics Architecture",
                            "iconSrc": "sap-icon://presentation",
                            "task": "Strategic Planning",
                            "owner": "Emily Davis",
                            "deadline": "2024-01-25",
                            "value":"100"
                        },
                        {
                            "title": "Define Clean Core Success Plan",
                            "subtitle": "Define Clean Core Success Plan",
                            "iconSrc": "sap-icon://group",
                            "task": "Strategic Planning",
                            "owner": "Alex Martinez",
                            "deadline": "2024-02-10",
                            "value":"100"
                        }
                    ]
                
            };
 
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);

			this.attachDragAndDrop();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			        oRouter.attachRouteMatched(this.onRouteMatched, this);

        },
        attachDragAndDrop: function () {
            var aGridIds = ["grid1", "grid2", "grid3"];
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
            var oBindingContext = oDraggedControl.getBindingContext(),
                oData = oBindingContext.getModel().getProperty(oBindingContext.getPath());

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
                oDragModel = oDragContainer.getModel(),
                oDropModel = oDropContainer.getModel(),
                sDragPath = oDragged.getBindingContext().getPath(),
                oDraggedData = oDragModel.getProperty(sDragPath);

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

            // Update the models to reflect the changes
            oDragModel.refresh();
            oDropModel.refresh();
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
                iconSrc:"sap-icon://presentation"
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
        onCancelEditDialog:function(){
            this.oEditDialog.close();
        },
        onAfterRendering:function(){
            var sLayout = LayoutType.OneColumn;
            this.getModel("activityLayoutView").setProperty("/layout", sLayout);
          },
          onPress:function(oEvent){
            let oSelectedProjectObject = oEvent.getSource()?.getBindingContext("AppState")?.getObject() || {};
            this.AppState.data.oSelectedProject = oSelectedProjectObject;
              var sLayout = LayoutType.MidColumnFullScreen;
            this.getModel("activityLayoutView").setProperty("/layout", sLayout);
          },
          onCloseDetailPage:function(){
              var sLayout = LayoutType.OneColumn;
            this.getModel("activityLayoutView").setProperty("/layout", sLayout);
          },
          onRouteMatched:function(oEvent){
            this.AppState = this.getOwnerComponent().getState("App");
            this.getView().setModel(this.AppState.getModel(), "AppState");
                  this.AppState.getModel().setSizeLimit(999999);
            this.AppState.data.showGlobalAddButton=true;
            this.AppState.data.currentPage = "manageActivity";
            let oGridListControl = this.byId("gridList");
            this.AppState.getMyProjectsList(oGridListControl);
          },
        
    });
});