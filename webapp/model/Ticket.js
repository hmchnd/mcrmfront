sap.ui.define([
    "./BaseObject"
], function (BaseObject) {
    "use strict";
    return BaseObject.extend("micro.crm.frontend.model.Ticket", {
 
        constructor: function (data) {
            BaseObject.call(this, {});
            if (data) {
                this.id = data?.id || "";
                this.title = data?.title || "";
                this.description = data?.description || "";
                this.client_id = data?.client_id || "";
                this.status = data?.status || "";
                this.priority = data?.priority || "";
                this.createdat = data?.createdat || "";
                this.modifiedat = data?.modifiedat || "";   
            }else{
                this.id = "";
                this.title = "";
                this.description = "";
                this.client_id = "";
                this.status = "Open";
                this.priority = "";
                this.createdat = "";
                this.modifiedat = "";   
            }
        },
 
    });
 
});