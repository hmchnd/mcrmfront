sap.ui.define([
    "./BaseObject"
], function (BaseObject) {
    "use strict";
    return BaseObject.extend("micro.crm.frontend.model.TeamMember", {
 
        constructor: function (data) {
            BaseObject.call(this, {});
            if (data) {
                this.id = data?.id || "";
                this.team = data?.team || "";
                this.users = data?.users || "";
                this.roles = data?.roles || "";
                this.joinedat = data?.joinedat || "";
              
            }
        },
 
    });
 
});