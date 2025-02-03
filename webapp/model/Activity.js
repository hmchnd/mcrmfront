sap.ui.define([
    "./BaseObject"
], function (BaseObject) {
    "use strict";
    return BaseObject.extend("framsys.com.framsysfrontend.model.Activity", {
 
        constructor: function (data) {
            BaseObject.call(this, {});
            if (data) {
                this.ID = data?.ID || "";
                this.name = data?.name || "";
                this.planned_start = data?.planned_start?.toISOString()?.slice(0,10)|| null;
                this.planned_finish = data?.planned_finish?.toISOString()?.slice(0,10)|| null;
                this.fore_act_start = data?.fore_act_start?.toISOString()?.slice(0,10)|| null;
                this.fore_act_finish = data?.fore_act_finish?.toISOString()?.slice(0,10)|| null;
                this.pct_weight = Number(data?.pct_weight || 0);
                this.pct_complete = Number(data?.pct_complete || 0);
                this.state = data?.state || "";
                this.responsible_ID = data?.responsible_ID || "";
                this.responsible = data?.responsible || "";
               
            }
        },
       
    });
 
});