sap.ui.define([
    "./BaseController",
	"sap/f/LayoutType",
], function(BaseController,LayoutType) {
	"use strict";

    return BaseController.extend("micro.crm.frontend.controller.ManageLeads", {

	
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter
			  .getRoute("manage_leads")
			  .attachPatternMatched(this.onRouteMatched, this);
		},
		onRouteMatched: function(oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			this.AppState = this.getOwnerComponent().getState("App");
			this.getView().setModel(this.AppState.getModel(), "AppState");
			this.AppState.getModel().setSizeLimit(999999);
			this.AppState.data.currentPage = "manage_leads";
			this.AppState.data.globalCreateButtonVisibility = true;
			this.AppState.getLeads();
		},
		onCloseDetailPage: function() {
			let sLayout = sap.f.LayoutType.OneColumn;
			this.getModel("productLayoutViewLeadView").setProperty("/layout", sLayout);
			this.getModel("productLayoutViewLeadView").refresh(true);
		},
        onLeadPress: function (oEvent) {
			let oSelectedLeadObject =
            oEvent.getSource()?.getBindingContext("AppState")?.getObject() ||
            {};
			this.AppState.data.oSelectedLeadObject = oSelectedLeadObject;
			var sLayout = LayoutType.TwoColumnsBeginExpanded;
			this.getModel("productLayoutViewLeadView").setProperty("/layout", sLayout);

		},
		onSaveLeadDetails:function(){
			let oClient = this.AppState.data.oSelectedLeadObject;
			this.AppState.saveLeadDetails(oClient);
		},
		onDeleteLead:function(oEvent){
			let oSelectedLeadObject =
			this.AppState.data.oSelectedLeadObject ||
			{};
			this.AppState.deleteLeads(oSelectedLeadObject);
		}

		

	});

	
});