
sap.ui.define([
    "./BaseObject"
], function (BaseObject) {
    "use strict";
    return BaseObject.extend("framsys.com.framsysfrontend.model.Milestone", {

        constructor: function (data) {
            BaseObject.call(this, {});
            if (data) {
                this.ID = data?.ID || "";

                this.parent_key_ID = data?.parent_key_ID;
                this.name = data?.name || "";
                this.description = data?.description || "";
                this.targetAchievementDate = data?.targetAchievementDate;
                this.status = data?.status;
                this.fore_act_achievement_date = data?.fore_act_achievement_date;
                this.pct_complete = data?.pct_complete;
            
            }
        },

    });

});