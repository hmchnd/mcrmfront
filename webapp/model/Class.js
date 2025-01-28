
sap.ui.define([
    "./BaseObject"
], function (BaseObject) {
    "use strict";
    return BaseObject.extend("framsys.com.framsysfrontend.model.Framework", {

        constructor: function (data) {
            BaseObject.call(this, {});
            if (data) {
                this.ID = data?.ID || "";
                this.ProjectType = data?.ProjectType || "";
                this.IndustryType = data?.IndustryType || "";
               

            }
        },

    });

});