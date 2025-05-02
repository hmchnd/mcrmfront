sap.ui.define([
    "sap/m/Page",
    "sap/m/Input",
    "sap/m/Label",
    "sap/m/Button",
    "sap/m/VBox",
    "sap/m/Panel",
    "sap/m/Text",
    "sap/ui/core/mvc/Controller",
    "sap/m/Image"
], function (Page, Input, Label, Button, VBox, Panel, Text, Controller, Image) {
    "use strict";

    return Controller.extend("micro.crm.frontend.controller.Login", {
        onInit: function () {
            // Any initialization if needed
        },

        onLoginPress: function () {
            const email = this.getView().byId("emailInput").getValue();
            const password = this.getView().byId("passwordInput").getValue();
            console.log("Email:", email, "Password:", password);
            // TODO: Call your backend API for authentication here
        }
    });
});
