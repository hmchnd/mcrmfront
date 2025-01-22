sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/f/LayoutType",
], (Controller, JSONModel,LayoutType) => {
    "use strict";

    return Controller.extend("framsys.com.framsysfrontend.controller.ManageProject", {
        onInit() {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			        oRouter.attachRouteMatched(this.onRouteMatched, this);
        },
        onRouteMatched:function(oEvent){
          this.AppState = this.getOwnerComponent().getState("App");
          this.getView().setModel(this.AppState.getModel(), "AppState");
			    this.AppState.getModel().setSizeLimit(999999);
          this.AppState.data.showGlobalAddButton=true;
          this.AppState.data.currentPage = "PROJECT";
          let oGridListControl = this.byId("gridList");
          this.AppState.getMyProjectsList(oGridListControl);
        },
        onAfterRendering:function(){
          var sLayout = LayoutType.OneColumn;
          this.getModel("projectLayoutView").setProperty("/layout", sLayout);
        },
        onPress:function(oEvent){
          let oSelectedProjectObject = oEvent.getSource()?.getBindingContext("AppState")?.getObject() || {};
          this.AppState.data.oSelectedProject = oSelectedProjectObject;
            var sLayout = LayoutType.TwoColumnsBeginExpanded;
          this.getModel("projectLayoutView").setProperty("/layout", sLayout);
        },
        onCloseDetailPage:function(){
            var sLayout = LayoutType.OneColumn;
          this.getModel("projectLayoutView").setProperty("/layout", sLayout);
        },
        onSaveProjectDetails:function(){
          let oProjectDetails = this.AppState.data.oSelectedProject;

          oProjectDetails.planned_start = new Date(oProjectDetails.planned_start);
          oProjectDetails.planned_finish = new Date(oProjectDetails.planned_finish);
          this.AppState.createNewProjectEntry(oProjectDetails);
        }
        
    });
});