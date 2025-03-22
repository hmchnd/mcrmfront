sap.ui.define([
  "./BaseController",
  "sap/ui/model/json/JSONModel",
], (Controller, JSONModel) => {
  "use strict";

  return Controller.extend("micro.crm.frontend.controller.Dashboard", {
    onInit:function(){

       // Sample Data
    //    var oData = {
    //       salesData: [
    //           { month: "Jan", revenue: 120000 },
    //           { month: "Feb", revenue: 135000 },
    //           { month: "Mar", revenue: 145000 },
    //           { month: "Apr", revenue: 160000 }
    //       ],
    //       customerData: [
    //           { month: "Jan", newCustomers: 100 },
    //           { month: "Feb", newCustomers: 120 },
    //           { month: "Mar", newCustomers: 150 },
    //           { month: "Apr", newCustomers: 200 }
    //       ]
    //   };

    //   var oModel = new JSONModel(oData);
    //   this.getView().setModel(oModel, "chartData");
    // },
    // onAfterRendering: async function () {
     
    //   var oChart = this.getView().byId("salesChart");
    //   var asyncChartUpdate = function () {
    //     oChart.setVizProperties({ title: { text: 'Projects Budget Allocation' } });
    //   };
    //   setTimeout(asyncChartUpdate, 0);
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
      
    },
    onNavToProject: function(){
      this.getOwnerComponent().getRouter().navTo("manage_projects")
    },
    onNavToTask: function(){
      this.getOwnerComponent().getRouter().navTo("ManageRoadmap")
    },
    onNavToActivity: function(){
      this.getOwnerComponent().getRouter().navTo("ManageActivity")
    },
  });
});