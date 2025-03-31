sap.ui.define([
    "./BaseObject"
], function (BaseObject) {
    "use strict";
    return BaseObject.extend("micro.crm.frontend.model.Task", {
 
        constructor: function (data) {
            BaseObject.call(this, {});
            if (data) {
                this.id = data?.id || "";
                this.name = data?.name || "";
                this.description = data?.description || "";
                this.duedate = data?.duedate || "";
                this.project = data?.project || "";

                this.status = data?.status || "";
                this.assignedto = data?.assignedto || "";
             
 
            }
        },
 
    });
 
});