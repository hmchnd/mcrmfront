sap.ui.define([
    "./BaseObject"
], function (BaseObject) {
    "use strict";
    return BaseObject.extend("micro.crm.frontend.model.InvoiceItems", {
 
        constructor: function (data) {
            BaseObject.call(this, {});
            if (data) {
                this.id = data?.id || "";
                this.invoice_id   = data?.invoice_id   || "";
                this.service_id   = data?.service_id   || "";
                this.description   = data?.description   || "";
                this.quantity   = data?.quantity   || "";
                this.unit_price   = data?.unit_price   || "";

                this.tax_rate   = data?.tax_rate   || "";

                this.created_at   = data?.created_at   || "";
      
            }
        },
 
    });
 
});