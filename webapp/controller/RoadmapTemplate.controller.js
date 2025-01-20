sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("framsys.com.framsysfrontend.controller.RoadmapTemplate", {
      onInit:function(){
         // Sample Data
         var oData = {
            salesData: [
                { month: "Jan", revenue: 120000 },
                { month: "Feb", revenue: 135000 },
                { month: "Mar", revenue: 145000 },
                { month: "Apr", revenue: 160000 }
            ],
            customerData: [
                { month: "Jan", newCustomers: 100 },
                { month: "Feb", newCustomers: 120 },
                { month: "Mar", newCustomers: 150 },
                { month: "Apr", newCustomers: 200 }
            ]
        };

        var oModel = new JSONModel(oData);
        this.getView().setModel(oModel, "chartData");
      },
      onAfterRendering: async function () {
       
        var oChart = this.getView().byId("salesChart");
        var asyncChartUpdate = function () {
          oChart.setVizProperties({ title: { text: 'Projects Budget Allocation' } });
        };
        setTimeout(asyncChartUpdate, 0);

       
      },
    });
});