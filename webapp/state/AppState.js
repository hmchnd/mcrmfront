sap.ui.define(
  [
    "../model/BaseObject",
    "../model/Project",
    "sap/m/MessageBox",
    "../model/Activity",
    "../model/Framework",
    "../model/Task",
  ],
  function (BaseObject, Project, MessageBox, Activity, Framework, Task) {
    "use strict";
    var AppState = BaseObject.extend(
      "framsys.com.framsysfrontend.state.AppState",
      {
        /**
         * ----------------------------------------------
         * State constructor/destuctor functions.
         * ----------------------------------------------
         */

        /**
         * Constructor: Initializing State.
         * @param oService
         * @param oResourceBundle
         */
        constructor: function (oService, oResourceBundle) {
          var that = this;
          that.AppService = oService; // OData service.
          that.BusyCounter = 0; // Busy indicator counter.
          that.ResourceBundle = oResourceBundle; // Text Resources
          that.ViewController = null; // View controller instance.

          this.data = {
            aProjects: [],
            aActivity: [],
            aFramework: [],
            aTask: [],
            oSelectedActivity: {},
            oSelectedProject: {},
            oSelectedTask: {},
            oSelectedFramework: {},
            showGlobalAddButton: false,
            currentPage: "",
            currentPageLabel: "",
            makeTaskMilestoneVisiblity: {
              taskvisiblity: false,
              milestonevisiblity: false,
            },
          };

          // Initialize base object.
          BaseObject.call(that, {
            isState: true,
          });
        },
        setViewController: function (oViewController) {
          this.ViewController = oViewController;
        },
        /**
         * Returns access to i18n text resources.
         * @returns ... Resource Bundle object.
         */
        getTextResources: function () {
          return this.ResourceBundle;
        },
        getMyProjectsList: function (oGridListControl) {
          let aPromises = [];
          aPromises.push(this.AppService.getProjects());
          let that = this;
          oGridListControl.setBusy(true);

          Promise.all(aPromises).then(function (result) {
            let aProjectsList = result[0]?.data?.results || [];
            aProjectsList = aProjectsList.map(function (item) {
              return new Project(item);
            });
            that.data.aProjects = aProjectsList;
            oGridListControl.setBusy(false);
          });
        },
        createNewProjectEntry: function (oProject) {
          if (oProject.ID) {
            delete oProject.fore_act_start;
            delete oProject.fore_act_finish;
            delete oProject.pct_complete;
            // oProject.framework_ID = "215eaa61-ade1-48d2-a712-ba8dbee7a02d";
            this.AppService.updateProject(oProject).then(function (result) {
              MessageBox.success(`Project Details Updated!`);
            });
          } else {
            //	oProject.framework_ID = '215eaa61-ade1-48d2-a712-ba8dbee7a02d';
            oProject.planned_start = new Date(oProject.planned_start);
            oProject.planned_finish = new Date(oProject.planned_finish);
            this.AppService.saveProject(oProject).then(function (result) {
              MessageBox.success(`Project Details Saved!`);
              that.data.aProjects = that.data.aProjects.filter(
                (Project) => Project.ID !== oProject.ID
              );
            });
          }
        },
        deleteProjectEntry: function (oProject) {
          debugger;
          if (!oProject || !oProject.ID) {
            MessageBox.error(
              "Invalid Project: Cannot delete without a valid ID."
            );
            return;
          }

          let that = this;
          this.AppService.deleteProject(oProject)
            .then(function () {
              MessageBox.success(`Project deleted successfully!`);
              // Optionally remove the deleted Project from the local data list
              that.data.aProjects = that.data.aProjects.filter(
                (Project) => Project.ID !== oProject.ID
              );
            })
            .catch(function (oError) {
              MessageBox.error(`Failed to delete Project: ${oError.message}`);
            });
        },

        getMyFrameworkList: function (oGridListControl) {
          debugger;
          let aPromises = [];
          // Add promises for fetching Framework and Class data
          aPromises.push(this.AppService.getFramework());
          let that = this;
          // oGridListControl.setBusy(true);

          Promise.all(aPromises)
            .then(function (results) {
              // Process Framework data
              let aFrameworkList = results[0]?.data?.results || [];
              aFrameworkList = aFrameworkList.map(function (item) {
                return new Framework(item);
              });

              // Store the processed data in the corresponding arrays
              that.data.aFramework = aFrameworkList;
              // that.data.aFramework.class = aClassList;

              // oGridListControl.setBusy(false);
              that.ViewController.createPanels();
            })
            .catch(function (error) {
              // Handle any errors during the Promise resolution
              console.error("Error fetching Framework or Class data:", error);
              oGridListControl.setBusy(false);
            });
        },

        createNewFrameworkEntry: function (oFramework) {
          debugger;
          if (oFramework.ID) {
            // let frameworkID = oFramework.ID;
            //    delete oFramework.Classes;
            //    delete oFramework.phases;
            //    delete oFramework.areas;
            // oFramework.Classes = [];
            // oFramework.templateAreas = oFramework.area;
            // oFramework.templatePhases = oFramework.phase;
            // oFramework.templateTasks = oFramework.task;
            //    delete oFramework.pct_complete;
            // oFramework.ID = frameworkID;
            this.AppService.updateFramework(oFramework).then(function (result) {
              MessageBox.success(`Roadmap Template Details Updated!`);
            });
          } else {
            //    oFramework.ID = '225eaa61-ade1-48d2-a712-ba8dbee7a02d';
            // oFramework.Classes = [{
            //   ProjectType:oFramework.ProjectType,
            //   IndustryType:oFramework.IndustryType
            // }];
            //  delete oFramework.ProjectType;
            //  delete oFramework.IndustryType;

            oFramework.templateAreas = oFramework.area;
            oFramework.templatePhases = oFramework.phase;
            oFramework.templateTasks = oFramework.task;
            delete oFramework.area;
            delete oFramework.phase;
            delete oFramework.task;

            debugger;
            this.AppService.saveFramework(oFramework).then(function (result) {
              MessageBox.success(`Roadmap Template Details Saved!`);
              that.data.aFramework = that.data.aFramework.filter(
                (Framework) => Framework.ID !== oFramework.ID
              );
            });
          }
        },

        deleteFrameworkEntry: function (oFramework) {
          debugger;
          if (!oFramework || !oFramework.ID) {
            MessageBox.error(
              "Invalid Framework: Cannot delete without a valid ID."
            );
            return;
          }

          let that = this;
          this.AppService.deleteFramework(oFramework)
            .then(function () {
              MessageBox.success(`Framework deleted successfully!`);

              // Optionally remove the deleted Framework from the local data list
              that.data.aFramework = that.data.aFramework.filter(
                (Framework) => Framework.ID !== oFramework.ID
              );
            })
            .catch(function (oError) {
              MessageBox.error(`Failed to delete Framework: ${oError.message}`);
            });
        },

        getMyActivityList: function () {
          let aPromises = [];
          aPromises.push(this.AppService.getActivity());
          let that = this;
          Promise.all(aPromises).then(function (result) {
            debugger;
            let aActivityList = result[0]?.data?.results || [];
            aActivityList = aActivityList.map(function (item) {
              return new Activity(item);
            });
            that.data.aActivity = aActivityList;
            that.ViewController.attachDragAndDrop();
          });
        },
        createNewActivityEntry: function (oActivity) {
         var that = this;
          oActivity.planned_start = this._formatODataDate(
            oActivity.planned_start
          );
          oActivity.planned_finish = this._formatODataDate(
            oActivity.planned_finish
          );
          oActivity.fore_act_start = this._formatODataDate(
            oActivity.fore_act_start
          );
          oActivity.fore_act_finish = this._formatODataDate(
            oActivity.fore_act_finish
          );

          if (oActivity.ID) {
            let frameworkID = oActivity.ID;

            // oActivity.Classes=[];
            // oActivity.phases=[];
            // oActivity.areas=[];
            //    delete oActivity.pct_complete;
            oActivity.ID = frameworkID;
            this.AppService.updateActivity(oActivity).then(function (result) {
              MessageBox.success(`Activity Details Updated!`);
              that.updateProgress();
            });
          } else {
            //    oActivity.ID = '225eaa61-ade1-48d2-a712-ba8dbee7a02d';
            //    oActivity.Classes=[];
            // oActivity.phases=[];
            // oActivity.areas=[];

            this.AppService.saveActivity(oActivity).then(function (result) {
              MessageBox.success(`Activity Details Saved!`);
            });
          }
        },

        /**
         * Helper function to format a date into "/Date(…)/" format.
         * @param {Date | string} date - The date to format.
         * @returns {string | null} The formatted date or null if invalid.
         */
        _formatODataDate: function (date) {
          if (date) {
            const parsedDate = new Date(date);
            if (!isNaN(parsedDate.getTime())) {
              // Convert to "/Date(…)/" format
              return `/Date(${parsedDate.getTime()})/`;
            }
          }
          return null;
        },
        deleteActivityEntry: function (oActivity) {
          debugger;
          if (!oActivity || !oActivity.ID) {
            MessageBox.error(
              "Invalid Activity: Cannot delete without a valid ID."
            );
            return;
          }

          let that = this;
          this.AppService.deleteActivity(oActivity)
            .then(function () {
              MessageBox.success(`Activity deleted successfully!`);
              // Optionally remove the deleted activity from the local data list
              that.data.aActivity = that.data.aActivity.filter(
                (activity) => activity.ID !== oActivity.ID
              );
            })
            .catch(function (oError) {
              MessageBox.error(`Failed to delete activity: ${oError.message}`);
            });
        },
        createNewTask: function (oTask) {
          oTask.planned_start = new Date(oTask.planned_start);
          oTask.planned_finish = new Date(oTask.planned_finish);
          oTask.parent_key_ID = "7c80d6d0-4457-4e07-9de1-946d2085c9ea";
          this.AppService.createTask(oTask).then(function (result) {
            MessageBox.success(`New Task Created`);
          });
        },
        updateProgress:function(){
          let aPromises = [];
          aPromises.push(this.AppService.processTaskProgress());
          let that = this;
          Promise.all(aPromises).then(function (result) {
            MessageBox.success('Task Progress Updated!!');
          
          });
        }
      }
    );
    return AppState;
  }
);
