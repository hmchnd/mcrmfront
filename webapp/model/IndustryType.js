sap.ui.define([
    "./BaseObject"
], function (BaseObject) {
    "use strict";
    return BaseObject.extend("framsys.com.framsysfrontend.model.IndustryType", {
 
        constructor: function (data) {
            BaseObject.call(this, {});
            if (data) {
                this.ID = data?.ID || "";
                this.IndustryType = data?.IndustryType || "";
 
            }
        },
 
    });
 
});