sap.ui.define([
    "./BaseObject"
], function (BaseObject) {
    "use strict";
    return BaseObject.extend("micro.crm.frontend.model.Leads", {
 
        constructor: function (data) {
            BaseObject.call(this, {});
            if (data) {
                this.id = data?.id || "";
                this.name = data?.team || "";
                this.email = data?.name || "";
                this.phone = data?.email || "";
                this.address = data?.phone || "";

                this.budgetrange = data?.status || "";
                this.industry = data?.source || "";
                this.profession = data?.notes || "";
                this.tenantid = data?.tenantid || "b570c207-76fc-4dbb-b932-cbd4b1d12df5";
 
            }
        },
 
    });
 
});