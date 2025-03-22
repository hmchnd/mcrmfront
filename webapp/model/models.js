sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
   
], 
function (JSONModel, Device) {
    "use strict";

    return {
        /**
         * Provides runtime information for the device the UI5 app is running on as a JSONModel.
         * @returns {sap.ui.model.json.JSONModel} The device model.
         */
        createDeviceModel: function () {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        },
       
        createLocalJsonModel:function(){
            var oModel = new JSONModel({
                "selectedKey":"",
                "navigation":[
                    {
                        "title":"Dashboard",
                        "icon":"sap-icon://kpi-corporate-performance",
                        "key":"Dashboard",
                        "expanded": true,
                        "enabled":true,
                    },
                    {
                        "title":"My Product/Service",
                        "icon":"sap-icon://product",
                        "key":"Catalog",
                        "expanded": true,
                        "enabled":true,
                    },
                    {
                        "title":"My Clients",
                        "icon":"sap-icon://customer",
                        "key":"manage_customers",
                        "expanded": true,
                        "enabled":true
                    },
                    {
                        "title":"Leads",
                        "key":"manage_leads",
                        "icon":"sap-icon://leads",
                        "enabled":true
                    },
                    {
                        "title":"My Projects",
                        "key":"manage_projects",
                        "icon":"sap-icon://capital-projects",
                        "enabled":true
                    },
                    {
                        "title":"Tasks",
                        "key":"manage_tasks",
                        "icon":"sap-icon://activities",
                        "enabled":true
                    },
                    {
                        "title":"Invoices",
                        "key":"manage_invoice",
                        "icon":"sap-icon://my-sales-order",
                        "enabled":true
                    },
                    {
                        "title":"My Team",
                        "key":"manage_team",
                        "icon":"sap-icon://people-connected",
                        "enabled":true
                    },
                    {
                        "title":"Tickets",
                        "key":"manage_ticket",
                        "icon":"sap-icon://feedback",
                        "enabled":true
                    }
                   
                    
                ],
                "fixedNavigation": [
                    {
                        "title":"Settings",
                        "icon":"sap-icon://action-settings",
                       
                       
                    },
                ]
            });
            return oModel;
        },
        createProjectViewLayoutModel:function(){
            let oModel = new JSONModel();
            return oModel;
        },
        currentAppStateModel:function(data){
            let oModel = new JSONModel(data);
            return oModel;
        },
        manageActivityViewLayoutModel:function(data){
            let oModel = new JSONModel(data);
            return oModel;
        },
        roadmapTemplateViewLayoutModel:function(data){
            let oModel = new JSONModel(data);
            return oModel;
        },
        manageRoadmapViewLayoutModel:function(data){
            let oModel = new JSONModel(data);
            return oModel;
        }
    };

});