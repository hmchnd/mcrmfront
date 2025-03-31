sap.ui.define([
    "./BaseController",
	"sap/f/LayoutType",
], function(BaseController,LayoutType) {
    "use strict";

    return BaseController.extend("micro.crm.frontend.controller.ManageProducts", {
        onInit: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter
			  .getRoute("manage_products")
			  .attachPatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function(oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			this.AppState = this.getOwnerComponent().getState("App");
			this.getView().setModel(this.AppState.getModel(), "AppState");
			this.AppState.getModel().setSizeLimit(999999);
			this.AppState.currentPage = "manage_products";
			this.AppState.getServices();
		},
        
        onSaveProductDetails: function() {
            let oService = this.AppState.data.oSelectedServiceObject;
			this.AppState.saveServiceDetails(oService);
        },
        onCloseDetailPage: function() {
            let sLayout = sap.f.LayoutType.OneColumn;
            this.getModel("productLayoutView").setProperty("/layout", sLayout);
            this.getModel("productLayoutView").refresh(true);
        },
        
        _validateProduct: function(oProduct) {
            if (!oProduct.name) {
                MessageBox.error("Product name is required");
                return false;
            }
            
            if (!oProduct.categoryid) {
                MessageBox.error("Category is required");
                return false;
            }
            
            if (!oProduct.price || oProduct.price <= 0) {
                MessageBox.error("Price must be greater than 0");
                return false;
            }
            
            return true;
        },
        
        onDeleteProduct: function(oEvent) {
            var oSelectedItem = oEvent.getSource().getBindingContext().getObject();
            
            MessageBox.confirm(
                `Are you sure you want to delete "${oSelectedItem.name}"?`,
                {
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    onClose: function(oAction) {
                        if (oAction === MessageBox.Action.YES) {
                            this.getOwnerComponent().getAppService().deleteProduct(oSelectedItem.id)
                                .then(function() {
                                    MessageToast.show("Product deleted successfully");
                                    this._loadInitialData();
                                }.bind(this))
                                .catch(function(oError) {
                                    MessageBox.error("Failed to delete product: " + oError.message);
                                });
                        }
                    }.bind(this)
                }
            );
        },
        
    });
});