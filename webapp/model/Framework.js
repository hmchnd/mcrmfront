
sap.ui.define([
    "./BaseObject"
], function (BaseObject) {
    "use strict";
    return BaseObject.extend("framsys.com.framsysfrontend.model.Framework", {

        constructor: function (data) {
            BaseObject.call(this, {});
            if (data) {
                this.ID = data?.ID || "";
                this.name = data?.name || "";
                this.description = data?.description || "";
                this.templatePhases = data?.templatePhases || "";
                this.templateAreas = data?.templateAreas || "";
                this.templateTasks = data?.templateTasks || "";

            }
        },

    });

});