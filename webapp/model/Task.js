sap.ui.define(["./BaseObject"], function (BaseObject) {
  "use strict";
  return BaseObject.extend("framsys.com.framsysfrontend.model.Task", {
    constructor: function (data) {
      BaseObject.call(this, {});
      if (data) {
        this.ID = data?.ID || "";
        this.name = data?.name || "";
        this.description = data?.description || "";
        this.planned_start =
          data?.planned_start?.toISOString()?.slice(0, 10) || null;
        this.planned_finish =
          data?.planned_finish?.toISOString()?.slice(0, 10) || null;
        this.fore_act_start =
          data?.fore_act_start?.toISOString()?.slice(0, 10) || null;
        this.fore_act_finish =
          data?.fore_act_finish?.toISOString()?.slice(0, 10) || null;
        this.pct_weight = Number(data?.pct_weight || 0);
        this.pct_complete = Number(data?.pct_complete || 0);
        this.state = data?.state || "";
        this.status = data?.status || "";
        this.area_ID = data?.area_ID || "";
        this.phase_ID = data?.phase_ID || "";
        this.precedingTaskID = data?.precedingTaskID || "";
        this.parent_key_ID = data?.parent_key_ID || "";
      }
    },
  });
});
