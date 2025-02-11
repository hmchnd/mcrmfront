sap.ui.define([
    "./BaseObject"
], function (BaseObject) {
    "use strict";
    return BaseObject.extend("framsys.com.framsysfrontend.model.Project", {

        constructor: function (data) {
            BaseObject.call(this, {});
            if (data) {
                this.ID = data?.ID || "";
                this.name = data?.name || "";
                this.description = data?.description || "";
                this.initialBudget = data?.initialBudget || 0;
                this.purpose = data?.purpose || "";
                this.result = data?.result || "";
                this.currency = data?.currency || "";
                this.roadmapTemplate_ID = data?.roadmapTemplate_ID || "";
                this.projectManager_ID = data?.projectManager_ID || "";
                this.projectGateKeeper_ID = data?.projectGateKeeper_ID || "";
                this.fore_act_start = data?.fore_act_start?.toISOString()?.slice(0,10) || null;
                this.fore_act_finish = data?.fore_act_finish?.toISOString()?.slice(0,10) || null;
                this.pct_complete = Number(data?.pct_complete || 0);
                this.state = data?.state || "Not Started";
                this.status = data?.status || "Not Started";
                this.planned_start = data?.planned_start?.toISOString()?.slice(0,10) || null;
                this.planned_finish = data?.planned_finish?.toISOString()?.slice(0,10) || null;
                this.actualStart = data?.actualStart || null;
                this.actualFinish = data?.actualFinish || null;
            }
        },
        convertMSDate:function(msDate) {
           // Extract the timestamp from "/Date(1739836800000)/"
           const timestamp = parseInt(msDate.match(/\d+/)[0], 10);
           
           // Convert to JavaScript Date
           return new Date(timestamp);
       }
    });

});