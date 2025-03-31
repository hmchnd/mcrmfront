sap.ui.define([
	"./BaseController",
	"sap/f/LayoutType",
], function(
	BaseController,LayoutType
) {
	"use strict";

	return BaseController.extend("micro.crm.frontend.controller.ManageProjects", {


		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter
			  .getRoute("manage_projects")
			  .attachPatternMatched(this.onRouteMatched, this);
		},
		onRouteMatched: function(oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			this.AppState = this.getOwnerComponent().getState("App");
			this.getView().setModel(this.AppState.getModel(), "AppState");
			this.AppState.getModel().setSizeLimit(999999);
			this.AppState.currentPage = "manage_projects";
			this.AppState.getProjects();
		},
		onCloseDetailPage: function() {
			let sLayout = sap.f.LayoutType.OneColumn;
			this.getModel("projectLayoutView").setProperty("/layout", sLayout);
			this.getModel("projectLayoutView").refresh(true);
		},
		onSaveProjectDetails: function(oEvent) {
			let oProject = this.AppState.data.oSelectedProjectObject;
			this.AppState.saveProjectDetails(oProject);
		}


		
	});
});