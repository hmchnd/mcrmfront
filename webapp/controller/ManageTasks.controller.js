sap.ui.define([
	"./BaseController",
	"sap/f/LayoutType",

], function(
	BaseController,LayoutType
) {
	"use strict";

	return BaseController.extend("micro.crm.frontend.controller.ManageTasks", {


		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter
			  .getRoute("manage_tasks")
			  .attachPatternMatched(this.onRouteMatched, this);
		},
		onRouteMatched: function(oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			this.AppState = this.getOwnerComponent().getState("App");
			this.getView().setModel(this.AppState.getModel(), "AppState");
			this.AppState.getModel().setSizeLimit(999999);
			this.AppState.currentPage = "manage_tasks";
			this.AppState.data.globalCreateButtonVisibility = true;
			this.AppState.getTasks();
			this.AppState.getProjects();
		},
		onSaveTaskDetails: function(oEvent) {
			let oTask = this.AppState.data.oSelectedTaskObject;
			this.AppState.saveTaskDetails(oTask);
		},
		onCloseDetailPage: function(oEvent) {
			let sLayout = sap.f.LayoutType.OneColumn;
			this.getModel("TaskLayoutView").setProperty("/layout", sLayout);
			this.getModel("TaskLayoutView").refresh(true);
		},
		onPress: function (oEvent) {
			let oSelectedTaskObject =
            oEvent.getSource()?.getBindingContext("AppState")?.getObject() ||
            {};
			this.AppState.data.oSelectedTaskObject = oSelectedTaskObject;
			var sLayout = LayoutType.TwoColumnsBeginExpanded;
			this.getModel("TaskLayoutView").setProperty("/layout", sLayout);

		},
		formatProject:function(sProjectId) {
			let aProjects = this.AppState.data.projects || [];
			
			let oProject = aProjects.find((oProject) => oProject.id === sProjectId);
			if (oProject) {
				return oProject.name;
			}
			return sProjectId;
		},
		formatStatus:function(sStatus) {
			if(sStatus === "Done") {
				return "Success";
			}
			if(sStatus === "To Do") {
				return "Error";
				
			}
			if(sStatus === "In Progress") {
				return "Warning";
		
			}
			return sStatus;
		}
	});
});