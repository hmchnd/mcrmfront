sap.ui.define([
    "./BaseObject"
], function (BaseObject) {
    "use strict";
    return BaseObject.extend("micro.crm.frontend.model.Leads", {
 
        constructor: function (data) {
            BaseObject.call(this, {});
            if (data) {
                // Core identifiers
                this.id = data.id || "";
             
                // Contact information
                this.name = data.name || "";
                this.email = data.email || "";
                this.phone = data.phone || "";
                
                // Lead tracking
                this.status = data.status || "New";
                this.source = data.source || "Other";
                this.priority = data.priority || "Medium";
                this.budget = data.budget || 0;
                
               
        
                // Timeline fields
                this.last_contacted = data.last_contacted || null;
                this.next_followup = data.next_followup || null;
                this.createdat = data.createdat || new Date().toISOString();
                this.modifiedat = data.modifiedat || new Date().toISOString();
                
                // Additional details
                this.tags = data.tags || [];
                this.notes = data.notes || "";
                
             
            }
        },
 
    });
 
});