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
              $expand: "Classes,phases,areas"
            }
          };
          return this.odata("/Framework").get(mParameters);
        },
        saveFramework: function (oFramework) {

          return this.odata("/Framework").post(oFramework);
        },
        updateFramework: function (oFramework) {
          var sObjectPath = this.model.createKey("/Framework", {
            ID: oFramework.ID,
          });
          return this.odata(sObjectPath).put(oFramework);
        },
        deleteFramework: function (oFramework) {
          var sObjectPath = this.model.createKey("/Framework", {
              ID: oFramework.ID // Assuming 'ID' is the key of your entity
          });
          return this.odata(sObjectPath).delete();
      },
        getActivity() {
          return this.odata("/Activity").get();
        },
        saveActivity: function (oActivity) {
          return this.odata("/Activity").post(oActivity);
        },
        updateActivity: function (oActivity) {
          var sObjectPath = this.model.createKey("/Activity", {
            ID: oActivity.ID,
          });
          return this.odata(sObjectPath).put(oActivity);
        },
        deleteActivity: function (oActivity) {
          var sObjectPath = this.model.createKey("/Activity", {
              ID: oActivity.ID // Assuming 'ID' is the key of your entity
          });
          return this.odata(sObjectPath).delete();
      },
        getClass() {
          return this.odata("/Class").get();
        },
        saveClass: function (oClass) {
          return this.odata("/Class").post(oClass);
        },
        updateClass: function (oClass) {
          var sObjectPath = this.model.createKey("/Class", {
            ID: oClass.ID,
          });
          return this.odata(sObjectPath).put(oClass);
        },
         getProjectType() {
          return this.odata("/ProjectType").get();
        },
        saveProjectType: function (oProjectType) {
          return this.odata("/ProjectType").post(oProjectType);
        },
        updateProjectType: function (oProjectType) {
          var sObjectPath = this.model.createKey("/ProjectType", {
            ID: oProjectType.ID,
          });
          return this.odata(sObjectPath).put(oProjectType);
        },
         getIndustryType() {
          return this.odata("/IndustryType").get();
        },
        saveIndustryType: function (oIndustryType) {
          return this.odata("/IndustryType").post(oIndustryType);
        },
        updateIndustryType: function (oIndustryType) {
          var sObjectPath = this.model.createKey("/IndustryType", {
            ID: oIndustryType.ID,
          });
          return this.odata(sObjectPath).put(oIndustryType);
        },
      }
    );
    return AppService;
  }
);
