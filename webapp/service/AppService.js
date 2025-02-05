sap.ui.define(
  ["./CoreService", "sap/ui/model/FilterOperator", "sap/ui/model/Filter"],
  function (CoreService, FilterOperator, Filter) {
    "use strict";

    var AppService = CoreService.extend(
      "framsys.com.framsysfrontend.service.AppService",
      {
        constructor: function (model) {
          CoreService.call(this, model);
        },
        getProjects() {
          return this.odata("/Project").get();
        },
        saveProject: function (oProject) {
          return this.odata("/Project").post(oProject);
        },
        updateProject: function (oProject) {
          var sObjectPath = this.model.createKey("/Project", {
            ID: oProject.ID,
          });
          return this.odata(sObjectPath).put(oProject);
        },
        deleteProject: function (oProject) {
          var sObjectPath = this.model.createKey("/Project", {
            ID: oProject.ID, // Assuming 'ID' is the key of your entity
          });
          return this.odata(sObjectPath).delete();
        },
        getFramework() {
          let mParameters = {
            urlParameters: {
              $expand:
                "templatePhases,templateAreas,templateTasks($expand=area,phase)",
            },
          };
          return this.odata("/RoadmapTemplate").get(mParameters);
        },
        saveFramework: function (oFramework) {
          return this.odata("/RoadmapTemplate").post(oFramework);
        },
        updateFramework: function (oFramework) {
          var sObjectPath = this.model.createKey("/RoadmapTemplate", {
            ID: oFramework.ID,
          });
          return this.odata(sObjectPath).put(oFramework);
        },
        deleteFramework: function (oFramework) {
          var sObjectPath = this.model.createKey("/RoadmapTemplate", {
            ID: oFramework.ID, // Assuming 'ID' is the key of your entity
          });
          return this.odata(sObjectPath).delete();
        },
        getActivity(sTaskID) {
          let sFilter = new sap.ui.model.Filter("parent_key_ID", sap.ui.model.FilterOperator.EQ, sTaskID);
          
          let mParameters = {
              filters: [sFilter],
              urlParameters: {
                $expand: "responsible",
          }
        }
          return this.odata("/ProjectActivity").get(mParameters);
      },
      
        saveActivity: function (oActivity) {
          return this.odata("/ProjectActivity").post(oActivity);
        },
        updateActivity: function (oActivity) {
          var sObjectPath = this.model.createKey("/ProjectActivity", {
            ID: oActivity.ID,
          });
          return this.odata(sObjectPath).put(oActivity);
        },
        deleteActivity: function (oActivity) {
          var sObjectPath = this.model.createKey("/ProjectActivity", {
            ID: oActivity.ID, // Assuming 'ID' is the key of your entity
          });
          return this.odata(sObjectPath).delete();
        },
        createTask: function (oTask) {
          return this.odata("/ProjectTask").post(oTask);
        },
        updateTask: function (oTask) {
          var sObjectPath = this.model.createKey("/ProjectTask", {
            ID: oTask.ID,
          });
          return this.odata(sObjectPath).put(oTask);
        },
        deleteTask: function (oTask) {
          var sObjectPath = this.model.createKey("/ProjectTask", {
            ID: oTask.ID, // Assuming 'ID' is the key of your entity
          });
          return this.odata(sObjectPath).delete();
        },
        processDateUpdate:function(Itemtype, currentItemID){
          debugger
          return this.odata("/plannedVsActualDatesCalc").post({
            currentItemID : currentItemID,
            Itemtype: Itemtype
          })
        },
        processTaskProgress:function(sTaskId){
          return this.odata("/updateTaskProgress").post({
            taskID : sTaskId
          })
        },
        processProjectProgress:function(sRoadmapId){

          return this.odata("/updateProjectProgress").post({
            sRoadmapId : sRoadmapId
          })
        },
        CopyRoadmapTemplateForProject:function(sTemplateId){
          let oPayload = {
             "roadmapTemplateID":sTemplateId
          }
          return this.odata("/CopyRoadmapTemplateForProject").post(oPayload);
        },
        createMilestone:function(oMilestone){
          return this.odata("/Milestone").post(oMilestone);
        },
        updateMilestone: function (oMilestone) {
          var sObjectPath = this.model.createKey("/Milestone", {
            ID: oMilestone.ID,
          });
          return this.odata(sObjectPath).put(oMilestone);
        },
        deleteMilestone: function (oMilestone) {
          var sObjectPath = this.model.createKey("/Milestone", {
            ID: oMilestone.ID, // Assuming 'ID' is the key of your entity
          });
          return this.odata(sObjectPath).delete();
        },
        getProjectRoadmapByID:function(sRoadmapId){
          var sObjectPath = this.model.createKey("/ProjectRoadmap", {
            ID: sRoadmapId // Assuming 'ID' is the key of your entity
          });
          let mParameters = {
            urlParameters: {
              $expand:
                "projectPhase/milestone,projectArea,projectTask($expand=responsible)",
            },
          };
          return this.odata(sObjectPath).get(mParameters);
        },
        updateProjectArea: function (oProjectArea) {
          var sObjectPath = this.model.createKey("/ProjectArea", {
            ID: oProjectArea.ID,
          });
          return this.odata(sObjectPath).put(oProjectArea);
        },
        getProjectArea() {
          return this.odata("/ProjectArea").get();
        },
      }
    );
    return AppService;
  }
);
