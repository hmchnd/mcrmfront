sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
], function(Controller, MessageBox, MessageToast, Filter, FilterOperator, JSONModel) {
    "use strict";

    return Controller.extend("micro.crm.frontend.controller.ManageProducts", {
        onInit: function() {
            // Initialize models
           // this._initModels();
            
            // Load initial data
          //  this._loadInitialData();
            
            // Set up table binding
          //  this._bindTable();
        },
        
        _initModels: function() {
            // Product model for dialog
            var oProductModel = new JSONModel({
                mode: "create", // 'create' or 'edit'
                id: "",
                tenantid: "",
                categoryid: "",
                crmuserid: "",
                name: "",
                description: "",
                price: 0,
                currency: "USD",
                stockquantity: 0
            });
            this.getView().setModel(oProductModel, "productModel");
            
            // Supported currencies
            var oCurrenciesModel = new JSONModel([
                { key: "USD", text: "USD" },
                { key: "EUR", text: "EUR" },
                { key: "GBP", text: "GBP" }
                // Add more as needed
            ]);
            this.getView().setModel(oCurrenciesModel, "supportedCurrencies");
        },
        
        _loadInitialData: function() {
            var oView = this.getView();
            
            // Load products
            this.getOwnerComponent().getAppService().getProducts()
                .then(function(aProducts) {
                    oView.getModel().setProperty("/ProductCatalog", aProducts);
                })
                .catch(function(oError) {
                    MessageBox.error("Failed to load products: " + oError.message);
                });
            
            // Load categories
            this.getOwnerComponent().getAppService().getProductCategories()
                .then(function(aCategories) {
                    oView.getModel().setProperty("/ProductCategories", aCategories);
                })
                .catch(function(oError) {
                    MessageBox.error("Failed to load categories: " + oError.message);
                });
        },
        
        _bindTable: function() {
            var oTable = this.byId("productsTable");
            var oBinding = oTable.getBinding("rows");
            
            if (oBinding) {
                oBinding.attachChange(this._onTableDataChange.bind(this));
            }
        },
        
        _onTableDataChange: function() {
            // Handle table data changes if needed
        },
        
        onSearch: function(oEvent) {
            var sQuery = oEvent.getSource().getValue();
            var aFilters = [];
            
            if (sQuery) {
                aFilters.push(new Filter({
                    filters: [
                        new Filter("name", FilterOperator.Contains, sQuery),
                        new Filter("description", FilterOperator.Contains, sQuery)
                    ],
                    and: false
                }));
            }
            
            this.byId("productsTable").getBinding("rows").filter(aFilters);
        },
        
        onLiveSearch: function(oEvent) {
            // Implement debounced search if needed
            this.onSearch(oEvent);
        },
        
        onAddProduct: function() {
            var oProductModel = this.getView().getModel("productModel");
            oProductModel.setProperty("/mode", "create");
            oProductModel.setData({
                mode: "create",
                id: "",
                tenantid: this.getOwnerComponent().getCurrentTenant(),
                categoryid: "",
                crmuserid: this.getOwnerComponent().getCurrentUser(),
                name: "",
                description: "",
                price: 0,
                currency: "USD",
                stockquantity: 0
            });
            
            this.byId("productDialog").open();
        },
        
        onEditProduct: function(oEvent) {
            var oSelectedItem = oEvent.getSource().getBindingContext().getObject();
            var oProductModel = this.getView().getModel("productModel");
            
            oProductModel.setProperty("/mode", "edit");
            oProductModel.setData(Object.assign({}, oSelectedItem, { mode: "edit" }));
            
            this.byId("productDialog").open();
        },
        
        onSaveProduct: function() {
            var oProductModel = this.getView().getModel("productModel");
            var oProduct = oProductModel.getData();
            
            if (!this._validateProduct(oProduct)) {
                return;
            }
            
            var fnServiceCall = oProduct.mode === "create" 
                ? this.getOwnerComponent().getAppService().createProduct(oProduct)
                : this.getOwnerComponent().getAppService().updateProduct(oProduct);
            
            fnServiceCall
                .then(function() {
                    MessageToast.show(`Product ${oProduct.mode === "create" ? "created" : "updated"} successfully`);
                    this._loadInitialData();
                    this.byId("productDialog").close();
                }.bind(this))
                .catch(function(oError) {
                    MessageBox.error(`Failed to ${oProduct.mode} product: ${oError.message}`);
                });
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
        
        onCloseDialog: function() {
            this.byId("productDialog").close();
        },
        
        onRowSelect: function(oEvent) {
            // Handle row selection if needed
        },
        
        formatStockState: function(iQuantity) {
            if (iQuantity === 0) {
                return "Error";
            } else if (iQuantity < 10) {
                return "Warning";
            }
            return "Success";
        }
    });
});