sap.ui.define([
   
    "./BaseController",
  
], function (Controller) {
    "use strict";

    return Controller.extend("micro.crm.frontend.controller.Login", {
        onInit: function () {
            this.getRouter().attachRouteMatched(this.onRouteChange.bind(this));
        },

        onRouteChange: function (oEvent) {
            this.AppState = this.getOwnerComponent().getState("App");
            this.getView().setModel(this.AppState.getModel(), "AppState");
            this.AppState.getModel().setSizeLimit(999999);
            this.AppState.data.currentPage = "login";
            this.AppState.setViewController(this)
        },

        onLoginPress: function () {
            debugger;
            const email = this.getView().byId("emailInput").getValue();
            const password = this.getView().byId("passwordInput").getValue();
            console.log("Email:", email, "Password:", password);
            let oUser = {
                email: email,
                password: password
            };
            this.AppState.doUserLogin(oUser);
            // TODO: Call your backend API for authentication here
        }
    });
});
