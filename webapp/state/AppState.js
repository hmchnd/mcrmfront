sap.ui.define(
  [
    "../model/BaseObject",
    "../model/Project",
    "sap/m/MessageBox",
    "../model/Activity",
    "../model/Framework",
    "../model/Task",
    "../model/Milestone",
    "../model/Phases",
    "sap/m/MessageToast"


  ],
  function (
    BaseObject,
    Project,
    MessageBox,
    Activity,
    Framework,
    Task,
    Milestone,
    Phases,
    MessageToast
  ) {
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
            aMilestone: [],
            aPhase: [],
            aArea: [],
            filteredTasks: [],
            oSelectedMilestone: {},
            oSelectedActivity: {},
            oSelectedProject: {},
            oSelectedTask: {},
            oSelectedArea: {},
            oSelectedTaskActivity: "",
            sSelectedProjectRoadmapID: "",
            notFoundBtnVisiblityRoadmap: true,
            notFoundBtnVisiblityKanban: false,
            oSelectedFramework: {},
            showGlobalAddButton: false,
            showBackToRoadmapButton: false,
            sidePanelOpen: true,
            currentPage: "",
            visible: true,
            currentPageLabel: "",
            sTaskID: "",

            makeTaskMilestoneVisiblity: {
              taskvisiblity: false,
              milestonevisiblity: false,
              milestonevisiblity1: false,
              EditAreaVisiblity: false,
            },
            currentRoadmapID: "",
            currentTaskID: "",
            Itemtype: "",
            currentItemID: "",
            oGridListControl: {},
            sTaskStartDate: "",
            sTaskFinishDate: "",
            sSelectedProjectName: "",
            oRoleBasesVisiblity: {
              "showRoadmap": false,
              "showMilestoneSave":true,
              "isEditAreaVisible":true,
              "areaResponsibleId": "",
              "manageroadmapBtn": true,
              "saveBtnVisiblity": true,
              "deleteBtnVisiblity": true,
              "manageActivityBtnVisiblity": true,
              "showCreateMilestoneBtnVisiblity": true,
              "showCreateTaskBtnVisiblity": true,
              "areaLeaderSaveBtnVisiblity": false,

              "portfolioVisiblity": true,
              "roadmapVisiblity": true,
              "kanbanVisiblity": true,
              "sLoginPerson": ""
            },
            showTaskInActivity:""

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
          let that = this;
          let oGridListControl = this.ViewController.getView().byId("gridList");
          if (oProject.ID) {
            delete oProject.fore_act_start;
            delete oProject.fore_act_finish;
            delete oProject.pct_complete;

            oProject.planned_start = new Date(oProject.planned_start);
            oProject.planned_finish = new Date(oProject.planned_finish);

            oProject.fore_act_start = new Date(oProject.planned_start);
            oProject.fore_act_finish = new Date(oProject.planned_finish);
            oProject.actualStart = new Date(oProject.actualStart);
            oProject.actualFinish = new Date(oProject.actualFinish);

            this.AppService.updateProject(oProject).then(function (result) {
              let sRoadmapTemplateID = oProject.roadmapTemplate_ID;
              let oCreatedProjectDetails = result.data;
              if (oProject.roadmapTemplate_ID && !oProject.isRoadmapMapped) {
                that.copyRoadmapTemplateToNewProject(sRoadmapTemplateID, oCreatedProjectDetails.ID);
            }

              MessageBox.success(`Project Details Updated!`);

            });
          } else {

            oProject.planned_start = new Date(oProject.planned_start);
            oProject.planned_finish = new Date(oProject.planned_finish);

            oProject.fore_act_start = new Date(oProject.planned_start);
            oProject.fore_act_finish = new Date(oProject.planned_finish);
            oProject.status = "Not Started";
            oProject.state = "Not Started";

            let sRoadmapTemplateID = oProject.roadmapTemplate_ID;

            this.ViewController.getView().setBusy(true);

            this.AppService.saveProject(oProject).then(function (result) {
              that.ViewController.getView().setBusy(false);
              let oCreatedProjectDetails = result.data;
              if (oProject.roadmapTemplate_ID && !oProject.isRoadmapMapped) {
                that.copyRoadmapTemplateToNewProject(sRoadmapTemplateID, oCreatedProjectDetails.ID);
            }
              that.getMyProjectsList(oGridListControl);
              that.ViewController.resetColumnLayout();
            });
          }
          debugger
         
          that.ViewController.onCloseDetailPage();
         
          this.getMyProjectsList(this.data.oGridListControl);
          
        },
        deleteProjectEntry: function (oProject) {

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
            })
            .catch(function (error) {
              // Handle any errors during the Promise resolution
              console.error("Error fetching Framework or Class data:", error);
              oGridListControl.setBusy(false);
            });
        },

        createNewFrameworkEntry: function (oFramework) {

          if (oFramework.ID) {

            this.AppService.updateFramework(oFramework).then(function (result) {
              MessageBox.success(`Roadmap Template Details Updated!`);
            });
          } else {

            oFramework.templateAreas = oFramework.area;
            oFramework.templatePhases = oFramework.phase;
            oFramework.templateTasks = oFramework.task;
            delete oFramework.area;
            delete oFramework.phase;
            delete oFramework.task;


            this.AppService.saveFramework(oFramework).then(function (result) {
              MessageBox.success(`Roadmap Template Details Saved!`);
              that.data.aFramework = that.data.aFramework.filter(
                (Framework) => Framework.ID !== oFramework.ID
              );
            });
          }
        },

        deleteFrameworkEntry: function (oFramework) {

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

        getMyActivityList: function (sTaskID) {
debugger
          if (!sTaskID) {
            // this.ViewController.getView().setBusy(true);

            // dialog
            if(this.data.oRoleBasesVisiblity.sLoginPerson){
            this.ViewController.onShowDirectKanban()
            }

            
          }
          else {
            let aPromises = [];
            aPromises.push(this.AppService.getActivity(sTaskID));
            let that = this;
            Promise.all(aPromises).then(function (result) {

              let aActivityList = result[0]?.data?.results || [];
              aActivityList = aActivityList.map(function (item) {
                return new Activity(item);
              });
              that.data.aActivity = aActivityList;
                if (that.data.oRoleBasesVisiblity.sLoginPerson == "Task Responsible" || that.data.oRoleBasesVisiblity.sLoginPerson == "Activity Performer") {
                that.ViewController.attachDragAndDrop();
                }
              that.ViewController.getView().setBusy(false);
              that.ViewController.calculateActivityCounts();
            });
          }
        },
        createNewActivityEntry: function (oActivity) {
          debugger;
          var that = this;
          oActivity.planned_start = this._formatODataDate(
            oActivity.planned_start
          );
          oActivity.planned_finish = this._formatODataDate(
            oActivity.planned_finish
          );



          if (oActivity.ID) {
            let ActivityID = oActivity.ID;
            if (oActivity.state == "NEW") {
              oActivity.pct_complete = "0";

              oActivity.act_start = null
              oActivity.act_finish = null
            }
            else if (oActivity.state == "INPROGRESS") {
              oActivity.pct_complete = "25";

              oActivity.act_start = new Date()
            }
            else if (oActivity.state == "COMPLETED") {
              if (oActivity.act_start == null) {
                oActivity.pct_complete = "100";

                oActivity.act_start = new Date()
              }
              oActivity.act_finish = new Date()
            }

            // oActivity.Classes=[];
            // oActivity.phases=[];
            // oActivity.areas=[];
            delete oActivity.responsible;
            oActivity.ID = ActivityID;
            this.AppService.updateActivity(oActivity).then(function (result) {
              MessageBox.success(`Activity Details Updated!`);
              that.updateProgress(that.data.currentTaskID);
              // that.updatePlannedDates(that.data.Itemtype, that.data.currentItemID);
            });
          } else {
            oActivity.fore_act_start = oActivity.planned_start
            oActivity.fore_act_finish = oActivity.planned_finish
            oActivity.pct_complete = 0;
            oActivity.state = "NEW";
            oActivity.parent_key_ID = that.data.oSelectedTask;

            this.AppService.saveActivity(oActivity).then(function (result) {
              MessageBox.success(`Activity Details Saved!`);
            });
          }

          that.getMyActivityList(that.data.oSelectedTask);
          that.ViewController.onCloseDetailPage();
        },

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

        updateProjectArea: function (oAreaDetails) {
          let that = this;
          this.AppService.updateProjectArea(oAreaDetails).then(function (result) {
            MessageBox.success(`Area Updated!`);
          });
          that.ViewController.onCloseDetailPage();
          this.getProjectRoadmapById(this.data.sSelectedProjectRoadmapID)
        },

        createNewTask: function (oTask) {
          debugger
          let that = this;
          if (oTask.ID) {
            delete oTask.area;
            delete oTask.phase;

            this.AppService.updateTask(oTask).then(function (result) {
              MessageBox.success(`Roadmap Template Details Updated!`);
              that.updateProjectProgress(that.data.currentRoadmapID);
              // that.updatePlannedDates(that.data.Itemtype, that.data.currentItemID);
            });
          } else {
            oTask.planned_start = new Date(oTask.planned_start);
            oTask.planned_finish = new Date(oTask.planned_finish);
            oTask.actualStart = new Date(oTask.actualStart);
            oTask.actualFinish = new Date(oTask.actualFinish);
            oTask.parent_key_ID = that.data.currentRoadmapID;
            oTask.fore_act_start = new Date(oTask.planned_start);
            oTask.fore_act_finish = new Date(oTask.planned_finish);
            oTask.status = "Not Started";
            oTask.state = "NEW";
            oTask.pct_complete = 0;
            this.AppService.createTask(oTask).then(function (result) {
              MessageBox.success(`New Task Created`);
            });
          }
          that.ViewController.onCloseDetailPage();
          this.getProjectRoadmapById(this.data.sSelectedProjectRoadmapID)
        },
        deleteTaskEntry: function (oTask) {
          if (!oTask || !oTask.ID) {
            MessageBox.error(
              "Invalid Task: Cannot delete without a valid ID."
            );
            return;
          }

          let that = this;
          this.AppService.deleteTask(oTask)
            .then(function () {
              MessageBox.success(`Task deleted successfully!`);
              // Optionally remove the deleted task from the local data list
              that.data.aTask = that.data.aTask.filter(
                (task) => task.ID !== oTask.ID
              );
            })
            .catch(function (oError) {
              MessageBox.error(`Failed to delete task: ${oError.message}`);
            });
          that.ViewController.onCloseDetailPage();
          this.getProjectRoadmapById(this.data.sSelectedProjectRoadmapID)
        },
        updatePlannedDates: function (Itemtype, currentItemID) {

          let aPromises = [];
          aPromises.push(this.AppService.processDateUpdate(Itemtype, currentItemID));
          let that = this;
          Promise.all(aPromises).then(function (result) {
            MessageToast.show("Dates Updated!!")
            // that.updateProjectPlannedDates(that.data.currentRoadmapID);
          });
        },
        // updateProjectPlannedDates: function (sTaskId) {
        //   let aPromises = [];
        //   aPromises.push(this.AppService.processProjectDateUpdate(sTaskId));
        //   let that = this;
        //   Promise.all(aPromises).then(function (result) {
        //     MessageToast.show("Project Dates Updated!!")
        //   });
        // },
        updateProgress: function (sTaskId) {
          let aPromises = [];
          aPromises.push(this.AppService.processTaskProgress(sTaskId));
          let that = this;
          Promise.all(aPromises).then(function (result) {
            MessageToast.show("Task Progress Updated!!")
            that.updateProjectProgress(that.data.currentRoadmapID);
          });
        },
        updateProjectProgress: function (sRoadmapId) {
          debugger
          let aPromises = [];
          aPromises.push(this.AppService.processProjectProgress(sRoadmapId));
          let that = this;
          Promise.all(aPromises).then(function (result) {
            MessageToast.show("Project Progress Updated!!")
          });
        },
        copyRoadmapTemplateToNewProject: function (sTemplateId, sProjectID) {
          let aPromises = [];
          this.ViewController.getView().setBusy(true);

          aPromises.push(
            this.AppService.CopyRoadmapTemplateForProject(sTemplateId, sProjectID)
          );
          let that = this;
          Promise.all(aPromises).then(function (result) {
            that.ViewController.getView().setBusy(false);

            // MessageBox.success(
            //   "Project Created and Template Details Configured Successfully In Project Roadmap!!"
            // );
          });
        },
        createMilestone: function (oMilestone) {

          let that = this;
          if (oMilestone.ID) {
            // delete oMilestone.targetAchievementDate;

            this.AppService.updateMilestone(oMilestone).then(function (result) {
              MessageBox.success(`Milestone Details Updated!`);
            });
          } else {
            oMilestone.targetAchievementDate = new Date(
              oMilestone.targetAchievementDate
            );
            this.AppService.createMilestone(oMilestone).then(function (result) {
              MessageBox.success(`New Milestone created!`);
            });
          }
          that.ViewController.onCloseDetailPage();
          this.getProjectRoadmapById(this.data.sSelectedProjectRoadmapID)
        },
        deleteMilestoneEntry: function (oMilestone) {

          if (!oMilestone || !oMilestone.ID) {
            MessageBox.error(
              "Invalid Milestone: Cannot delete without a valid ID."
            );
            return;
          }

          let that = this;
          this.AppService.deleteMilestone(oMilestone)
            .then(function () {
              MessageBox.success(`Milestone deleted successfully!`);
              // Optionally remove the deleted milestone from the local data list
              that.data.aMilestone = that.data.aMilestone.filter(
                (milestone) => milestone.ID !== oMilestone.ID
              );
            })
            .catch(function (oError) {
              MessageBox.error(`Failed to delete milestone: ${oError.message}`);
            });
          that.ViewController.onCloseDetailPage();
          this.getProjectRoadmapById(this.data.sSelectedProjectRoadmapID)
        },
        getProjectRoadmapById: function (sRoadmapID) {
          debugger
          let that = this;

          // If Roadmap ID is null, open a dialog with project selection
          if (!sRoadmapID) {
            if (!this.oProjectDialog) {
              this.oProjectDialog = new sap.m.Dialog({
                title: "Select a Project",
                contentWidth: "500px",
                contentHeight: "80px",
                content: [
                  new sap.m.VBox({
                    items: [
                      new sap.m.Select("projectDropdown", {
                        width: "100%",
                        items: {
                          path: "/Project",
                          template: new sap.ui.core.Item({
                            key: "{roadmapTemplate_ID}",
                            text: "{name}"
                          })
                        }
                      })
                    ]
                  })
                ],
                beginButton: new sap.m.Button({
                  text: "OK",
                  press: function () {
                    let oDropdown = sap.ui.getCore().byId("projectDropdown");
                    let sSelectedProjectID = oDropdown.getSelectedKey();

                    that.oProjectDialog.close();
                    that.data.sSelectedProjectRoadmapID = sSelectedProjectID;
                    that.data.sSelectedProjectName = oDropdown.getSelectedItem().getText();

                    that.ViewController.getOwnerComponent().getRouter().navTo("ManageRoadmap", {
                      sRoadmapID: sSelectedProjectID,
                      sProjectName: that.data.sSelectedProjectName
                    });


                    that.getProjectRoadmapById(sSelectedProjectID);


                  }
                }),
                endButton: new sap.m.Button({
                  text: "Cancel",
                  press: function () {
                    that.oProjectDialog.close();
                    that.data.notFoundBtnVisiblityRoadmap=true;
                    that.data.notFoundBtnVisiblityKanban=false;
                    that.ViewController.getOwnerComponent().getRouter().navTo("NotFound");
                    // that.ViewController.getView().setBusy(true);
                    MessageToast.show("Please select a project to proceed!");
                  }
                })
              });

              // Add dialog to the view
              this.ViewController.getView().addDependent(this.oProjectDialog);
            }

            this.oProjectDialog.open();
            // return;
          }
          
            // If Roadmap ID is provided, proceed with fetching the data
            // this.ViewController.getView().setBusy(true);
            let aPromises = [this.AppService.getProjectRoadmapByID(sRoadmapID)];

            Promise.all(aPromises).then(function (result) {
              let oFetchedProjectRoadmap = result[0].data || {};
              that.data.aPhase = (oFetchedProjectRoadmap.projectPhase.results || []).map(
                (item) => new Phases(item)
              );
              that.data.aArea = oFetchedProjectRoadmap.projectArea.results || [];              
              that.data.aTask = oFetchedProjectRoadmap.projectTask.results || [];
              that.data.filteredTasks = that.data.aTask;

              if (that.data.oRoleBasesVisiblity.sLoginPerson === "Project Area Leader") {
                that.data.aArea = (oFetchedProjectRoadmap.projectArea.results || []).filter(area => area.responsible_ID === that.data.oRoleBasesVisiblity.areaResponsibleId);
              }
              
              if (that.data.oRoleBasesVisiblity.sLoginPerson === "Task Responsible") {
                // Filter tasks based on responsible_ID
                that.data.aTask = (oFetchedProjectRoadmap.projectTask.results || []).filter(
                    task => task.responsible_ID === that.data.oRoleBasesVisiblity.areaResponsibleId
                );
            
                // Extract unique area IDs from filtered tasks
                const filteredAreaIds = new Set(that.data.aTask.map(task => task.area_ID));
            
                // Filter areas based on the extracted area IDs
                that.data.aArea = (oFetchedProjectRoadmap.projectArea.results || []).filter(
                    area => filteredAreaIds.has(area.ID)
                );
            }
            debugger
            if (that.data.oRoleBasesVisiblity.sLoginPerson === "Activity Performer") {
              // Step 1: Filter activities based on responsible_ID
              const filteredActivities = (oFetchedProjectRoadmap.projectTask.results || [])
                  .flatMap(task => task.activities.results || [])
                  .filter(activity => activity.responsible_ID === that.data.oRoleBasesVisiblity.areaResponsibleId);
          
              // Step 2: Get task IDs from filtered activities (parent_key is the task ID)
              const filteredTaskIds = new Set(filteredActivities.map(activity => activity.parent_key_ID));
          
              // Step 3: Filter tasks where ID exists in filteredTaskIds
              that.data.aTask = (oFetchedProjectRoadmap.projectTask.results || []).filter(task => 
                  filteredTaskIds.has(task.ID)
              );
          
              // Step 4: Extract unique area IDs from filtered tasks
              const filteredAreaIds = new Set(that.data.aTask.map(task => task.area_ID));
          
              // Step 5: Filter areas based on the extracted area IDs
              that.data.aArea = (oFetchedProjectRoadmap.projectArea.results || []).filter(
                  area => filteredAreaIds.has(area.ID)
              );
          
              // Store the filtered activities separately
              that.data.aActivity = filteredActivities;
          }
          
            
              that.updateModel(true);

              if (that.data.currentPage === "ManageRoadmap") {
                that.ViewController.createPanels();
              }

              that.ViewController.getView().setBusy(false);
            });
          
        },
        fieldAccessToAdministrator: function (sLoginPerson) {
          if (sLoginPerson === "Enterprise Portfolio Administrator") {
            this.ViewController.getView().byId("initialBudget").setEditable(false);
            this.ViewController.getView().byId("fore_act_start").setEditable(false);
            this.ViewController.getView().byId("fore_act_finish").setEditable(false);
            this.ViewController.getView().byId("actualStart").setEditable(false);
            this.ViewController.getView().byId("actualFinish").setEditable(false);
            this.ViewController.getView().byId("purpose").setEditable(false);
            this.ViewController.getView().byId("result").setEditable(false);
          }
          if (sLoginPerson === "Project Manager") {
            if(this.data.currentPage === "PROJECT"){
            // this.ViewController.getView().byId("initialBudget").setEditable(false);
            // this.ViewController.getView().byId("fore_act_start").setEditable(false);
            // this.ViewController.getView().byId("fore_act_finish").setEditable(false);
            // this.ViewController.getView().byId("actualStart").setEditable(false);
            // this.ViewController.getView().byId("actualFinish").setEditable(false);
            }

            if(this.data.currentPage === "ManageRoadmap"){
            this.ViewController.getView().byId("name").setEditable(false);
            this.ViewController.getView().byId("description").setEditable(false);
            this.ViewController.getView().byId("tstart").setEditable(false);
            this.ViewController.getView().byId("tend").setEditable(false);
            this.ViewController.getView().byId("idPrecedingTask").setEditable(false);
            this.ViewController.getView().byId("outcomeDesc").setEditable(false);
            this.ViewController.getView().byId("idphase").setEditable(false);
            this.ViewController.getView().byId("idarea").setEditable(false);
            this.ViewController.getView().byId("weight").setEditable(false);
            this.ViewController.getView().byId("idowner").setEditable(false);
            this.ViewController.getView().byId("idCriticalToMilestone").setEditable(false);
            this.ViewController.getView().byId("idMilestone").setEditable(false);


            this.ViewController.getView().byId("idmilestonename").setEditable(false);
            this.ViewController.getView().byId("idmilestonedesc").setEditable(false);
            this.ViewController.getView().byId("idmilestonephase").setEditable(false);
            this.ViewController.getView().byId("idmilestonetargetDate").setEditable(false);
            this.ViewController.getView().byId("idmilestoneforecastedDate").setEditable(false);
          
          }
          if(this.data.currentPage === "manageActivity"){
            this.ViewController.getView().byId("aname").setEditable(false);
            this.ViewController.getView().byId("adesc").setEditable(false);
            this.ViewController.getView().byId("astart").setEditable(false);
            this.ViewController.getView().byId("aend").setEditable(false);
            this.ViewController.getView().byId("apctweight").setEditable(false);
            this.ViewController.getView().byId("aPActivity").setEditable(false);
            this.ViewController.getView().byId("aowner").setEditable(false);
            this.ViewController.getView().byId("apctcomplete").setEditable(false);
            this.ViewController.getView().byId("acomment").setEditable(false);
 
          }
          }
          if (sLoginPerson === "Project Area Leader") {
            if(this.data.currentPage === "PROJECT"){
            this.ViewController.getView().byId("saveProjectDetails").setVisible(false);
            this.ViewController.getView().byId("pname").setEditable(false);
            this.ViewController.getView().byId("pdesc").setEditable(false);
            this.ViewController.getView().byId("pstart").setEditable(false);
            this.ViewController.getView().byId("pend").setEditable(false);
            this.ViewController.getView().byId("currency").setEditable(false);
            this.ViewController.getView().byId("idProjectManager").setEditable(false);
            this.ViewController.getView().byId("idProjectGateKeeper").setEditable(false);
            this.ViewController.getView().byId("initialBudget").setEditable(false);
            this.ViewController.getView().byId("fore_act_start").setEditable(false);
            this.ViewController.getView().byId("fore_act_finish").setEditable(false);
            this.ViewController.getView().byId("actualStart").setEditable(false);
            this.ViewController.getView().byId("actualFinish").setEditable(false);
            this.ViewController.getView().byId("purpose").setEditable(false);
            this.ViewController.getView().byId("result").setEditable(false);
            }
            if(this.data.currentPage === "ManageRoadmap"){
             
              this.ViewController.getView().byId("idmilestonename").setEditable(false);
              this.ViewController.getView().byId("idmilestonedesc").setEditable(false);
              this.ViewController.getView().byId("idmilestonephase").setEditable(false);
              this.ViewController.getView().byId("idmilestonetargetDate").setEditable(false);
              this.ViewController.getView().byId("idmilestoneforecastedDate").setEditable(false);
            
            }
            if(this.data.currentPage === "manageActivity"){
              this.ViewController.getView().byId("aname").setEditable(false);
              this.ViewController.getView().byId("adesc").setEditable(false);
              this.ViewController.getView().byId("astart").setEditable(false);
              this.ViewController.getView().byId("aend").setEditable(false);
              this.ViewController.getView().byId("apctweight").setEditable(false);
              this.ViewController.getView().byId("aPActivity").setEditable(false);
              this.ViewController.getView().byId("aowner").setEditable(false);
            this.ViewController.getView().byId("apctcomplete").setEditable(false);
            this.ViewController.getView().byId("acomment").setEditable(false);
 
            }
          }
          if (sLoginPerson === "Project Gate Keeper") {
            if(this.data.currentPage === "PROJECT"){
            this.ViewController.getView().byId("saveProjectDetails").setVisible(false);
            this.ViewController.getView().byId("pname").setEditable(false);
            this.ViewController.getView().byId("pdesc").setEditable(false);
            this.ViewController.getView().byId("pstart").setEditable(false);
            this.ViewController.getView().byId("pend").setEditable(false);
            this.ViewController.getView().byId("currency").setEditable(false);
            this.ViewController.getView().byId("idProjectManager").setEditable(false);
            this.ViewController.getView().byId("idProjectGateKeeper").setEditable(false);
            this.ViewController.getView().byId("initialBudget").setEditable(false);
            this.ViewController.getView().byId("fore_act_start").setEditable(false);
            this.ViewController.getView().byId("fore_act_finish").setEditable(false);
            this.ViewController.getView().byId("actualStart").setEditable(false);
            this.ViewController.getView().byId("actualFinish").setEditable(false);
            this.ViewController.getView().byId("purpose").setEditable(false);
            this.ViewController.getView().byId("result").setEditable(false);
            }  
            if(this.data.currentPage === "ManageRoadmap"){
              this.data.oRoleBasesVisiblity.saveBtnVisiblity = false;
              this.ViewController.getView().byId("name").setEditable(false);
              this.ViewController.getView().byId("description").setEditable(false);
              this.ViewController.getView().byId("tstart").setEditable(false);
              this.ViewController.getView().byId("tend").setEditable(false);
              this.ViewController.getView().byId("idPrecedingTask").setEditable(false);
              this.ViewController.getView().byId("outcomeDesc").setEditable(false);
              this.ViewController.getView().byId("idphase").setEditable(false);
              this.ViewController.getView().byId("idarea").setEditable(false);
              this.ViewController.getView().byId("weight").setEditable(false);
              this.ViewController.getView().byId("idowner").setEditable(false);
              this.ViewController.getView().byId("idCriticalToMilestone").setEditable(false);
              this.ViewController.getView().byId("idMilestone").setEditable(false);  
            
            }                  
          }
          if (sLoginPerson === "Task Responsible") {
            if(this.data.currentPage === "PROJECT"){
            this.ViewController.getView().byId("saveProjectDetails").setVisible(false);
            this.ViewController.getView().byId("pname").setEditable(false);
            this.ViewController.getView().byId("pdesc").setEditable(false);
            this.ViewController.getView().byId("pstart").setEditable(false);
            this.ViewController.getView().byId("pend").setEditable(false);
            this.ViewController.getView().byId("currency").setEditable(false);
            this.ViewController.getView().byId("idProjectManager").setEditable(false);
            this.ViewController.getView().byId("idProjectGateKeeper").setEditable(false);
            this.ViewController.getView().byId("initialBudget").setEditable(false);
            this.ViewController.getView().byId("fore_act_start").setEditable(false);
            this.ViewController.getView().byId("fore_act_finish").setEditable(false);
            this.ViewController.getView().byId("actualStart").setEditable(false);
            this.ViewController.getView().byId("actualFinish").setEditable(false);
            this.ViewController.getView().byId("purpose").setEditable(false);
            this.ViewController.getView().byId("result").setEditable(false);
            }  
            if(this.data.currentPage === "ManageRoadmap"){
              this.data.oRoleBasesVisiblity.saveBtnVisiblity = true;
              this.data.oRoleBasesVisiblity.areaLeaderSaveBtnVisiblity = true;
              this.data.oRoleBasesVisiblity.showMilestoneSave = true;
              this.data.makeTaskMilestoneVisiblity.milestonevisiblity1 = true;
              this.data.makeTaskMilestoneVisiblity.milestonevisiblity = false;
              // this.ViewController.getView().byId("name").setEditable(false);
              // this.ViewController.getView().byId("description").setEditable(false);
              // this.ViewController.getView().byId("tstart").setEditable(false);
              // this.ViewController.getView().byId("tend").setEditable(false);
              // this.ViewController.getView().byId("idPrecedingTask").setEditable(false);
              // this.ViewController.getView().byId("outcomeDesc").setEditable(false);
              // this.ViewController.getView().byId("idphase").setEditable(false);
              // this.ViewController.getView().byId("idarea").setEditable(false);
              // this.ViewController.getView().byId("weight").setEditable(false);
              // this.ViewController.getView().byId("idowner").setEditable(false);
              // this.ViewController.getView().byId("idCriticalToMilestone").setEditable(false);
              // this.ViewController.getView().byId("idMilestone").setEditable(false);
  
  
              this.ViewController.getView().byId("idmilestonename").setEditable(false);
              this.ViewController.getView().byId("idmilestonedesc").setEditable(false);
              this.ViewController.getView().byId("idmilestonephase").setEditable(false);
              this.ViewController.getView().byId("idmilestonetargetDate").setEditable(false);
              this.ViewController.getView().byId("idmilestoneforecastedDate").setEditable(false);
            
            }         
          }
          if (sLoginPerson === "Activity Performer") {
            if(this.data.currentPage === "PROJECT"){
            this.ViewController.getView().byId("saveProjectDetails").setVisible(false);
            this.ViewController.getView().byId("pname").setEditable(false);
            this.ViewController.getView().byId("pdesc").setEditable(false);
            this.ViewController.getView().byId("pstart").setEditable(false);
            this.ViewController.getView().byId("pend").setEditable(false);
            this.ViewController.getView().byId("currency").setEditable(false);
            this.ViewController.getView().byId("idProjectManager").setEditable(false);
            this.ViewController.getView().byId("idProjectGateKeeper").setEditable(false);
            this.ViewController.getView().byId("initialBudget").setEditable(false);
            this.ViewController.getView().byId("fore_act_start").setEditable(false);
            this.ViewController.getView().byId("fore_act_finish").setEditable(false);
            this.ViewController.getView().byId("actualStart").setEditable(false);
            this.ViewController.getView().byId("actualFinish").setEditable(false);
            this.ViewController.getView().byId("purpose").setEditable(false);
            this.ViewController.getView().byId("result").setEditable(false);
            }  
            if(this.data.currentPage === "ManageRoadmap"){
              this.data.oRoleBasesVisiblity.saveBtnVisiblity = false;
              // this.data.oRoleBasesVisiblity.areaLeaderSaveBtnVisiblity = true;
              // this.data.oRoleBasesVisiblity.showMilestoneSave = true;
              // this.data.makeTaskMilestoneVisiblity.milestonevisiblity1 = true;
              // this.data.makeTaskMilestoneVisiblity.milestonevisiblity = false;

              this.ViewController.getView().byId("name").setEditable(false);
              this.ViewController.getView().byId("description").setEditable(false);
              this.ViewController.getView().byId("tstart").setEditable(false);
              this.ViewController.getView().byId("tend").setEditable(false);
              this.ViewController.getView().byId("idPrecedingTask").setEditable(false);
              this.ViewController.getView().byId("outcomeDesc").setEditable(false);
              this.ViewController.getView().byId("idphase").setEditable(false);
              this.ViewController.getView().byId("idarea").setEditable(false);
              this.ViewController.getView().byId("weight").setEditable(false);
              this.ViewController.getView().byId("idowner").setEditable(false);
              this.ViewController.getView().byId("idCriticalToMilestone").setEditable(false);
              this.ViewController.getView().byId("idMilestone").setEditable(false);
  
  
              this.ViewController.getView().byId("idmilestonename").setEditable(false);
              this.ViewController.getView().byId("idmilestonedesc").setEditable(false);
              this.ViewController.getView().byId("idmilestonephase").setEditable(false);
              this.ViewController.getView().byId("idmilestonetargetDate").setEditable(false);
              this.ViewController.getView().byId("idmilestoneforecastedDate").setEditable(false);
            
            }     
            if(this.data.currentPage === "manageActivity"){
              this.data.oRoleBasesVisiblity.saveBtnVisiblity = true;
              this.ViewController.getView().byId("aforefinish").setEditable(true);
              this.ViewController.getView().byId("aforestart").setEditable(true);
              this.ViewController.getView().byId("astart").setEditable(false);
              this.ViewController.getView().byId("aend").setEditable(false);
            }
             
          }

        }


      }
    );
    return AppState;
  }
);