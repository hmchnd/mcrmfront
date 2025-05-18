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
			this.AppState.data.currentPage = "manage_projects";
			this.AppState.data.globalCreateButtonVisibility = true;
			this.AppState.getProjects();
			this.AppState.getClients();
		},
		onCloseDetailPage: function() {
			let sLayout = sap.f.LayoutType.OneColumn;
			this.getModel("projectLayoutView").setProperty("/layout", sLayout);
			this.getModel("projectLayoutView").refresh(true);
		},
		onSaveProjectDetails: function(oEvent) {
			let oProject = this.AppState.data.oSelectedProjectObject;
			this.AppState.saveProjectDetails(oProject);
		},
		formatStatusState: function(sStatus) {
			if (sStatus === "Open") {
				return "Warning";
			} else if (sStatus === "Completed") {
				return "Success";
			} else if (sStatus === "On Hold") {
				return "Error";
			} else if (sStatus === "Cancelled") {
				return "Error";
			} else {
				return "None";
			}
		},
		onDetailPress:function(oEvent) {
			let oSelectedProjectObject =
            oEvent.getSource()?.getBindingContext("AppState")?.getObject() ||
            {};
			let sLayout = sap.f.LayoutType.TwoColumnsMidExpanded;
			this.AppState.data.oSelectedProjectObject = oSelectedProjectObject;
			//this.AppState.data.projects.find(oProject => oProject.ProjectID === oItem.getBindingContext("AppState").getObject().ProjectID);
			this.getModel("projectLayoutView").setProperty("/layout", sLayout);
			this.getModel("projectLayoutView").refresh(true);
			//this.getModel("projectLayoutView").setProperty("/detailPage", sPath);
		},
		formatDate: function(oDate) {
			if (oDate) {
				return new Date(oDate).toLocaleDateString("en-US", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
				});
			}
			return oDate;
		},
		formatClientName: function(sClientID) {
			let aClients = this.AppState?.data?.clients || [];
			let oClient = aClients?.find((oClient) => oClient.id === sClientID);
			if (oClient) {
				return oClient.name;
			}
			return sClientID;
		}


		
	});
});