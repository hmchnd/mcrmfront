sap.ui.define([
  "./BaseController",
  "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
  "use strict";

  return Controller.extend("micro.crm.frontend.controller.Dashboard", {
    onInit:function(){

      
    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter
            .getRoute("Dashboard")
            .attachPatternMatched(this.onRouteMatched, this);

     
    },
    onRouteMatched: function (oEvent) {
     
      this.AppState = this.getOwnerComponent().getState("App");
      
      this.getView().setModel(this.AppState.getModel(), "AppState");
      this.AppState.getModel().setSizeLimit(999999);
      this.AppState.setViewController(this);
      this.AppState.data.currentPage = "dashboard";
      this.AppState.data.globalCreateButtonVisibility = false;
    },
    /**
     * @override
     * @returns {void|undefined}
     */
    onAfterRendering: function() {
   
    },
    navToProjects: function(){
      this.getOwnerComponent().getRouter().navTo("manage_projects")
    },
    navToInvoices: function(){
      this.getOwnerComponent().getRouter().navTo("manage_invoice")
    },
    navToClientIssues: function(){
      this.getOwnerComponent().getRouter().navTo("manage_ticket")
    },navToTasks: function(){
      this.getOwnerComponent().getRouter().navTo("manage_tasks")
    },navToLeads: function(){
      this.getOwnerComponent().getRouter().navTo("manage_leads")
    },
  });
});