sap.ui.define([
    "./BaseObject"
], function (BaseObject) {
    "use strict";
    return BaseObject.extend("micro.crm.frontend.model.Service", {
 
        constructor: function (data) {
            BaseObject.call(this, {});
            if (data) {
                this.id = data?.id || "";
                this.categoryid = data?.categoryid || "";
                this.name = data?.name || "";
                this.description = data?.description || "";
                this.rate = data?.rate || "";

                this.currency = data?.currency || "";
                this.rate_type = data?.rate_type || "";
                this.estimated_hours = data?.estimated_hours || "";
                this.is_active = data?.is_active ;

                this.userid = data?.userid || "";

            

 
            }
        },
 
    });
 
});