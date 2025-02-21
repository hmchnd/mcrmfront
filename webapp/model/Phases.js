sap.ui.define([
    "./BaseObject"
], function (BaseObject) {
    "use strict";
    return BaseObject.extend("framsys.com.framsysfrontend.model.Phases", {
 
        constructor: function (data) {
            BaseObject.call(this, {});
            if (data) {
                this.ID = data?.ID || "";
                this.name = data?.name || "";
                this.description = data?.description || "";
                this.displaySequence = data?.displaySequence;
                this.milestone = data?.milestone.results || [];
                this.planned_start = data?.planned_start || [];
                this.planned_finish = data?.planned_finish || [];

            
 
            }
        },
 
    });
 
});