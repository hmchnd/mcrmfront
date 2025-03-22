sap.ui.define([
    "./BaseController",
	"sap/f/LayoutType",
], function(BaseController,LayoutType) {
	"use strict";

    return BaseController.extend("micro.crm.frontend.controller.ManageCustomer", {

	
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter
			  .getRoute("manage_customers")
			  .attachPatternMatched(this.onRouteMatched, this);
		},
		onRouteMatched: function(oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			this.AppState = this.getOwnerComponent().getState("App");
			this.getView().setModel(this.AppState.getModel(), "AppState");
			this.AppState.getModel().setSizeLimit(999999);
			this.AppState.currentPage = "manage_customers";
			this.AppState.getClients();
		},
		onCloseDetailPage: function() {
			let sLayout = sap.f.LayoutType.OneColumn;
			this.getModel("projectLayoutView").setProperty("/layout", sLayout);
			this.getModel("projectLayoutView").refresh(true);
		},
        onPress: function (oEvent) {
			let oSelectedClientObject =
            oEvent.getSource()?.getBindingContext("AppState")?.getObject() ||
            {};
			this.AppState.data.oSelectedClientObject = oSelectedClientObject;
			var sLayout = LayoutType.TwoColumnsBeginExpanded;
			this.getModel("projectLayoutView").setProperty("/layout", sLayout);

		},
		onSaveClientDetails:function(){
			let oClient = this.AppState.data.oSelectedClientObject;
			this.AppState.saveClientDetails(oClient);
		}

		

	});

	
});