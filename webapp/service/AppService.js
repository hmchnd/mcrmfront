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
        getActivity() {
          let mParameters = {
            urlParameters: {
              $expand:
                "responsible",
            },
          }
          return this.odata("/TemplateActivity").get(mParameters);
        },
        saveActivity: function (oActivity) {
          return this.odata("/TemplateActivity").post(oActivity);
        },
        updateActivity: function (oActivity) {
          var sObjectPath = this.model.createKey("/TemplateActivity", {
            ID: oActivity.ID,
          });
          return this.odata(sObjectPath).put(oActivity);
        },
        deleteActivity: function (oActivity) {
          var sObjectPath = this.model.createKey("/TemplateActivity", {
            ID: oActivity.ID, // Assuming 'ID' is the key of your entity
          });
          return this.odata(sObjectPath).delete();
        },
        createTask: function (oTask) {
          return this.odata("/TemplateTask").post(oTask);
        },
        processTaskProgress:function(){
          return this.odata("/updateTaskProgress").post({})
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
        }
      }
    );
    return AppService;
  }
);
