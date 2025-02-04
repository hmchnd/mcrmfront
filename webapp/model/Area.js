sap.ui.define([
    "./BaseObject"
], function (BaseObject) {
    "use strict";
    return BaseObject.extend("framsys.com.framsysfrontend.model.Area", {
 
        constructor: function (data) {
            BaseObject.call(this, {});
            if (data) {
                this.ID = data?.ID || "";
                this.name = data?.name || "";
                this.responsible_ID = data?.responsible_ID || "";
                this.ProjectType = data?.ProjectType || "";
 
            }
        },
 
    });
 
});