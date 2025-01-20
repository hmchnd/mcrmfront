

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
                        }
                
                     });
                     return AppService;
                 });