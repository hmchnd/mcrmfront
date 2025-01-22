sap.ui.define([
    "sap/ui/core/UIComponent",
    "framsys/com/framsysfrontend/model/models",
    "./service/AppService",
    "./state/AppState",
	"sap/m/MessageBox"
], (UIComponent, models,AppService,AppState,MessageBox) => {
    "use strict";

    return UIComponent.extend("framsys.com.framsysfrontend.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");
            this.setModel(models.createLocalJsonModel(),"sideContentModel")
            this.setModel(models.createProjectViewLayoutModel(),"projectLayoutView")    
            // Instantiating services and states  
			this._oAppService = new AppService(this.getModel());
            this._oAppState = new AppState(this._oAppService, this.getModel("i18n").getResourceBundle());
            
            // enable routing
            this.getRouter().initialize();
        },

		getService_: function (sService) {
			return this["_o" + sService + "Service"];
		},

		getState: function (sState) {
			return this["_o" + sState + "State"];
		},
    });
});