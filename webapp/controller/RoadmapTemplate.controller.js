sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/f/LayoutType",

], (Controller, JSONModel,LayoutType) => {
    "use strict";

    return Controller.extend("framsys.com.framsysfrontend.controller.RoadmapTemplate", {
      onInit() {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.attachRouteMatched(this.onRouteMatched, this);

            this._editFragment = null;
            this._createFragment = null;
      },
      onRouteMatched:function(oEvent){
        this.AppState = this.getOwnerComponent().getState("App");
        this.getView().setModel(this.AppState.getModel(), "AppState");
        this.AppState.getModel().setSizeLimit(999999);
        this.AppState.data.showGlobalAddButton=true;
        this.AppState.data.currentPage = "roadmapTemplate";
        let oGridListControl = this.byId("gridList");
        this.AppState.getMyProjectsList(oGridListControl);
      },
      onAfterRendering:function(){
        var sLayout = LayoutType.OneColumn;
        this.getModel("roadmapTemplateLayoutView").setProperty("/layout", sLayout);
      },
      onPress:function(oEvent){
        let oSelectedProjectObject = oEvent.getSource()?.getBindingContext("AppState")?.getObject() || {};
        this.AppState.data.oSelectedProject = oSelectedProjectObject;
          var sLayout = LayoutType.TwoColumnsMidExpanded;
        this.getModel("roadmapTemplateLayoutView").setProperty("/layout", sLayout);
      },
      onCloseDetailPage:function(){
          var sLayout = LayoutType.OneColumn;
        this.getModel("roadmapTemplateLayoutView").setProperty("/layout", sLayout);
      },
      onStepActivated: function (oEvent) {
        const currentStep = oEvent.getParameter("step").getId();
        this.getView().getModel().setProperty("/currentStep", currentStep);
    },
   
      
    });
});