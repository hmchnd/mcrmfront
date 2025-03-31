sap.ui.define([
    "./BaseObject"
], function (BaseObject) {
    "use strict";
    return BaseObject.extend("micro.crm.frontend.model.Project", {
 
        constructor: function (data) {
            BaseObject.call(this, {});
            if (data) {
                this.id = data?.id || "";
                this.name = data?.team || "";
                this.description = data?.description || "";
                this.startdate = data?.startdate || "";
                this.enddate = data?.enddate || "";

                this.status = data?.status || "";
                this.client = data?.client || "";
             
 
            }
        },
 
    });
 
});