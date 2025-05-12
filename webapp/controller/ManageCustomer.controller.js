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
			this.AppState.data.currentPage = "manage_customers";
			this.AppState.data.globalCreateButtonVisibility = true;
			this.AppState.getClients();
			this.AppState.getServices();
            this.AppState.getServiceCategories();
			this.AppState.updateModel();
		},
		onCloseDetailPage: function() {
			let sLayout = sap.f.LayoutType.OneColumn;
			this.getModel("customerLayoutView").setProperty("/layout", sLayout);
			this.getModel("customerLayoutView").refresh(true);
		},
        onDetailPress: function (oEvent) {
			let oSelectedClientObject =
            oEvent.getSource()?.getBindingContext("AppState")?.getObject() ||
            {};
			this.AppState.data.oSelectedClientObject = oSelectedClientObject;
			var sLayout = LayoutType.TwoColumnsBeginExpanded;
			this.getModel("customerLayoutView").setProperty("/layout", sLayout);

		},
		onSaveClientDetails:function(){
			let oClient = this.AppState.data.oSelectedClientObject;
			this.AppState.saveClientDetails(oClient);
		},
		onDeleteProject:function(oEvent){
			let oSelectedClientObject =
			this.AppState.data.oSelectedClientObject ||
			{};
			this.AppState.deleteClient(oSelectedClientObject);
		},
		onMobileNumberLiveChange:function(oEvent){
			const oInput = oEvent.getSource();
            const sValue = oInput.getValue();
            const oBinding = oInput.getBinding("value");
			try {
                oBinding.getType().validateValue(sValue);
                
                oInput.setValueState("Success");
            } catch (oException) {
               sap.m.MessageToast.show(oException.message, {
					duration: 3000,
					autoClose: true,
					closeOnBrowserNavigation: false,
				});
				oInput.setValueState("Error");
				
				oInput.setValueStateText(oException.message);

            }
		},

		

	});

	
});