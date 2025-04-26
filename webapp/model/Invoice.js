sap.ui.define([
    "./BaseObject"
], function (BaseObject) {
    "use strict";
    return BaseObject.extend("micro.crm.frontend.model.Invoice", {
 
        constructor: function (data) {
            BaseObject.call(this, {});
            if (data) {
                this.id = data?.id || "";
                this.lead_id  = data?.lead_id  || "";
                this.client_id  = data?.client_id  || "";
                this.invoice_number  = data?.invoice_number  || "";
                this.due_date  = data?.due_date  || "";
                this.status   = data?.status   || "Draft";

                this.tax_rate   = data?.tax_rate   || "";

                this.discount   = data?.discount   || "";

                this.notes   = data?.notes   || "";
                this.created_at   = data?.created_at   || "";

                this.items = data?.invoice_items || [];
                 
            }else{

                this.id = "";
                this.lead_id  = "";
                this.client_id  = "";
                this.invoice_number  = "";
                this.due_date  = new Date().toISOString().split("T")[0];
                this.status   = "Draft";

                this.tax_rate   = "";

                this.discount   = "";

                this.notes   = "";
                this.created_at   = "";

            }
        },
        mapPostData: function () {
            return {
                id: this.id,
                lead_id: this.lead_id,
                client_id: this.client_id,
                invoice_number: this.invoice_number,
                tax_rate: this.tax_rate,
                discount: this.discount,  
                due_date: this.due_date,
                items: []
            };
        },
 
    });
 
});