sap.ui.define([
    "./BaseObject"
], function (BaseObject) {
    "use strict";
    return BaseObject.extend("micro.crm.frontend.model.Client", {
 
        constructor: function (data) {
            BaseObject.call(this, {});
            if (data) {
                this.id = data?.id || "";
                this.name = data?.name || "";
                this.email = data?.email || "";
                this.phone = data?.phone || "";
                this.address = data?.address || "";

                this.budgetrange = data?.budgetrange || "";
                this.industry = data?.industry || "";
                this.profession = data?.profession || "";

                this.company = data?.company || "";
                this.website = data?.website || "";
                this.notes = data?.notes || "";
                this.tenantid = data?.tenantid || "b570c207-76fc-4dbb-b932-cbd4b1d12df5";
 
            }
        },
 
    });
 
});