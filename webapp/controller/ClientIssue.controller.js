sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("micro.crm.frontend.controller.ClientIssue", {

		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter
			  .getRoute("manage_ticket")
			  .attachPatternMatched(this.onRouteMatched, this);
		},
		onRouteMatched: function(oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			this.AppState = this.getOwnerComponent().getState("App");
			this.getView().setModel(this.AppState.getModel(), "AppState");
			this.AppState.getModel().setSizeLimit(999999);
			this.AppState.currentPage = "manage_ticket";
			this.AppState.data.globalCreateButtonVisibility = true;
			this.AppState.getClients();
			this.AppState.getServices();
            this.AppState.getServiceCategories();
			this.AppState.getClientIssues();
			this.AppState.updateModel();
		},
		onSaveTicket: function(oEvent) {

			let oClientIssue = this.AppState.data.oSelectedClientIssuesObject;
			this.AppState.saveClientIssueDetails(oClientIssue);
		},
		onDeleteTicket: function(oEvent) {
			let oClientIssue = this.AppState.data.oSelectedClientIssuesObject;
			this.AppState.deleteClientIssue(oClientIssue);

		},
		statusFormatter: function(sStatus) {
			if (sStatus === "Open") {
				return "Error";
			} else if (sStatus === "In Progress") {
				return "Warning";
			} else if (sStatus === "Closed") {
				return "Success";
			}else{
				return "None";
			} 
		
		},
		ClientFormatter:function(sClient) {
			let oClient = this.AppState.data.clients.find((client) => {
				return client.id === sClient;
			});
			if (oClient) {
				return oClient.name;
			}
			return "";
		},
		onPressTicket:function(oEvent){

			let oTicket = oEvent.getSource().getBindingContext("AppState").getObject();
			this.AppState.data.oSelectedClientIssuesObject = oTicket;

			let sLayout = sap.f.LayoutType.TwoColumnsMidExpanded;
			//this.AppState.data.oSelectedProjectObject = oSelectedProjectObject;
			//this.AppState.data.projects.find(oProject => oProject.ProjectID === oItem.getBindingContext("AppState").getObject().ProjectID);
			this.getView().getModel("TicketLayoutView").setProperty("/layout", sLayout);
			this.getView().getModel("TicketLayoutView").refresh(true);
			
		
		},
		onCloseDetailPage: function() {
			let sLayout = sap.f.LayoutType.OneColumn;
			this.getView().getModel("TicketLayoutView").setProperty("/layout", sLayout);
			this.getView().getModel("TicketLayoutView").refresh(true);
		},

	});
});