sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("framsys.com.framsysfrontend.controller.NotFound", {
        onInit: function () {
            // Initialization code
        },
        onBackToDashboard:function(){
            this.getOwnerComponent().getRouter().navTo("ManageRoadmap");
        },
        onBackToKanban:function(){  
            this.getOwnerComponent().getRouter().navTo("ManageActivity")
            
                  }

        
    });
});