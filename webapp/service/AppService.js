

                  sap.ui.define([
                    "./CoreService",
                    "sap/ui/model/FilterOperator",
                    "sap/ui/model/Filter"
                ], function (CoreService, FilterOperator, Filter) {
                
                     "use strict";
                
                     var AppService = CoreService.extend("framsys.com.framsysfrontend.service.AppService", {
                         constructor: function (model) {
                             CoreService.call(this, model);
                         },
                         getProjects(){
                            return this.odata("/Project").get();
                         },
                         saveProject: function (oProject) {
                            return this.odata("/Project").post(oProject);
                        },
                        updateProject : function (oProject){
                            var sObjectPath = this.model.createKey("/Project", {
                                ID: oProject.ID
                            });
                            return this.odata(sObjectPath).put(oProject);
                        },
                        getFramework(){
                            return this.odata("/Framework").get();
                         },
                         saveFramework: function (oFramework) {
                            return this.odata("/Framework").post(oFramework);
                        },
                        updateFramework : function (oFramework){
                            var sObjectPath = this.model.createKey("/Framework", {
                                ID: oFramework.ID
                            });
                            return this.odata(sObjectPath).put(oFramework);
                        },
                        getActivity(){
                            return this.odata("/Activity").get();
                         },
                         saveActivity: function (oActivity) {
                            return this.odata("/Activity").post(oActivity);
                        },
                        updateActivity : function (oActivity){
                            var sObjectPath = this.model.createKey("/Activity", {
                                ID: oActivity.ID
                            });
                            return this.odata(sObjectPath).put(oActivity);
                        }

                
                     });
                     return AppService;
                 });