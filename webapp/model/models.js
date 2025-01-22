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
                        "title":"Recents",
                        "icon":"sap-icon://history",
                        "key":"Dashboard",
                        "expanded": true,
                        "enabled":true,
                    },
                    {
                        "title":"Portfolio",
                        "icon":"sap-icon://folder-blank",
                        "key":"manage_projects",
                        "expanded": true,
                        "enabled":true
                    },
                    {
                        "title":"Roadmap Templates",
                        "key":"RoadmapTemplate",
                        "icon":"sap-icon://table-view",
                        "enabled":true
                    },
                    {
                        "title":"Roadmap",
                        "key":"ManageRoadmap",
                        "icon":"sap-icon://table-view",
                        "enabled":true
                    },
                    {
                        "title":"Kanban",
                        "key":"ManageActivity",
                        "icon":"sap-icon://filter-facets",
                        "enabled":true
                    },
                    {
                        "title":"Gantt",
                        "key":"manage_Schedule",
                        "icon":"sap-icon://gantt-bars",
                        "enabled":true
                    },
                    {
                        "title":"Team",
                        "key":"manage_Schedule",
                        "icon":"sap-icon://group",
                        "enabled":true
                    },
                    {
                        "title":"Reports",
                        "key":"manage_Schedule",
                        "icon":"sap-icon://vertical-bar-chart",
                        "enabled":true
                    }
                   
                    
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