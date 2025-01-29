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
              ID: oProject.ID // Assuming 'ID' is the key of your entity
          });
          return this.odata(sObjectPath).delete();
      },
        getFramework() {
         let mParameters = {
            urlParameters: {
              $expand: "templatePhases,templateAreas,templateTasks($expand=area,phase)"
            }
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
              ID: oFramework.ID // Assuming 'ID' is the key of your entity
          });
          return this.odata(sObjectPath).delete();
      },
        getActivity() {
          return this.odata("/ProjectActivity").get();
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
              ID: oActivity.ID // Assuming 'ID' is the key of your entity
          });
          return this.odata(sObjectPath).delete();
      },
        
      }
    );
    return AppService;
  }
);
