sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/dnd/DragInfo",
    "sap/f/dnd/GridDropInfo",
    "sap/ui/core/library",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
], (Controller, JSONModel, DragInfo, GridDropInfo, coreLibrary,Fragment,MessageBox) => {
    "use strict";
    // Shortcuts for drag-and-drop constants
   

    return Controller.extend("framsys.com.framsysfrontend.controller.ManageTask", {
        onInit() {
            
        },
        onManageActivity:function(){
            this.getOwnerComponent().getRouter().navTo("ManageActivity")
        },
        onDateRangeChange: function (oEvent) {
            // Get the selected date range from DateRangeSelection control
            const oDateRangePicker = oEvent.getSource();
            const sDateRange = oDateRangePicker.getValue(); // e.g., "01 Jan 2025 - 31 Mar 2025"
        
            // Update the SelectedDateRange Input field with the chosen range
            this.byId("SelectedDateRange").setValue(sDateRange);
        },
        onSave:function(){
            MessageBox.success("Task Saved Successfully!");
        }
        
    });
});