sap.ui.define(
  [
    "./BaseController",
    "sap/f/LayoutType",
    "sap/ui/core/util/File",
    "sap/m/MessageBox",
  ],
  function (BaseController, LayoutType, FileUtil, MessageBox) {
    "use strict";

    return BaseController.extend(
      "micro.crm.frontend.controller.ManageInvoices",
      {
        onInit: function () {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter
            .getRoute("manage_invoice")
            .attachPatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
          var oArgs, oView;
          oArgs = oEvent.getParameter("arguments");
          this.AppState = this.getOwnerComponent().getState("App");
          this.getView().setModel(this.AppState.getModel(), "AppState");
          this.AppState.getModel().setSizeLimit(999999);
          this.AppState.data.currentPage = "manage_invoice";
          this.AppState.data.globalCreateButtonVisibility = true;
          this.AppState.getServices();
          this.AppState.getClients();
          this.AppState.getLeads();
          this.AppState.getInvoices();
        },
        onSaveInvoice: function (oEvent) {
          let oInvoice =
            this.AppState.data.oSelectedInvoiceObject.mapPostData();
            oInvoice.subtotal = parseInt(this.byId("idGrandTotal").getText());
            oInvoice.tax_rate = '0';
          oInvoice.discount = this.AppState.data.oSelectedInvoiceObject.discount;
          let oInvoiceItems = this.AppState.data.oSelectedInvoiceItemObject;
          oInvoice.items = oInvoiceItems;
          debugger;
          this.AppState.saveInvoiceDetails(oInvoice);
        },
        onCloseDetailPage: function (oEvent) {
          let sLayout = sap.f.LayoutType.OneColumn;
          this.getModel("InvoiceLayoutView").setProperty("/layout", sLayout);
          this.getModel("InvoiceLayoutView").refresh(true);
        },
        onPressInvoice: function (oEvent) {
          let oSelectedInvoiceObject =
            oEvent.getSource()?.getBindingContext("AppState")?.getObject() ||
            {};
          this.AppState.data.oSelectedInvoiceObject = oSelectedInvoiceObject;
          this.AppState.data.oSelectedInvoiceItemObject = this.AppState.data.oSelectedInvoiceObject.items;
          this.byId("idGrandTotal").setText(
            this.AppState.data.oSelectedInvoiceObject.subtotal
          );
          var sLayout = LayoutType.MidColumnFullScreen;
          this.getModel("InvoiceLayoutView").setProperty("/layout", sLayout);
        },
        addInvoiceItem: function (oEvent) {
          let oTable = this.getView().byId("invoiceItemsTable");
          let oSelectedInvoiceItemObject = oTable
            .getModel("AppState")
            .getData().oSelectedInvoiceItemObject;
          debugger;

          let oNewItem = {
            service_id: "",
            description: "",
            quantity: 1,
            unit_price: 0,
            tax_rate: 0,
          };

          oSelectedInvoiceItemObject.push(oNewItem);
          oTable.getModel("AppState").refresh(true);
        },

        onInvoiceItemChange: function (oEvent) {
           const oInput = oEvent.getSource();
    const newValue = oEvent.getParameter("value");
    const sField = oInput.getBindingInfo("value").binding.getPath(); // "quantity", "unit_price", or "tax_rate"

    const oContext = oInput.getBindingContext("AppState");
    const oItem = oContext.getObject();
    const sItemPath = oContext.getPath();
    const oModel = oContext.getModel();

    // Manually update the correct field with the latest input
    oModel.setProperty(sItemPath + "/" + sField, newValue);

    // Now use the updated model values
    const quantity = parseFloat(oModel.getProperty(sItemPath + "/quantity")) || 0;
    const unitPrice = parseFloat(oModel.getProperty(sItemPath + "/unit_price")) || 0;
    const taxRate = parseFloat(oModel.getProperty(sItemPath + "/tax_rate")) || 0;
if (isNaN(quantity) || isNaN(unitPrice) || isNaN(taxRate)) {
    return;
}

    const amountBeforeTax = quantity * unitPrice;
    const taxAmount = (amountBeforeTax * taxRate) / 100;
    const totalAmount = amountBeforeTax + taxAmount;

    oModel.setProperty(sItemPath + "/amount", totalAmount.toFixed(2));
	this._updateGrandTotal()
        },
		_updateGrandTotal: function () {
    const oModel = this.getView().getModel("AppState");
    const aItems = oModel.getProperty("/oSelectedInvoiceItemObject") || [];
    let grandTotal = 0;

    // Sum all line item amounts
    aItems.forEach(item => {
        const amount = parseFloat(item.amount);
        if (!isNaN(amount)) {
            grandTotal += amount;
        }
    });

    // Get the discount (from the discount input field)
    const discount = parseFloat(oModel.getProperty("/oSelectedInvoiceObject/discount")) || 0;

    // Apply discount
    const finalTotal = grandTotal - discount;

    // Update the ObjectStatus control
    const oGrandTotalControl = this.getView().byId("idGrandTotal");
    if (oGrandTotalControl) {
        oGrandTotalControl.setText(finalTotal.toFixed(2));
        oGrandTotalControl.setState("Success");
    }
},onDiscountChange: function (oEvent) {
    const newValue = oEvent.getParameter("value");
    const oModel = this.getView().getModel("AppState");

    // Update the model with new discount
    oModel.setProperty("/oSelectedInvoiceObject/discount", newValue);

    // Recalculate grand total
    this._updateGrandTotal();
},

        formatStatusState: function (status) {
          const states = {
            draft: "None",
            sent: "Information",
            paid: "Success",
            overdue: "Error",
            cancelled: "Warning",
          };
          return states[status] || "None";
        },
        downloadInvovice: function (oEvent) {
          let oSelectedInvoiceObject =this.AppState.data.oSelectedInvoiceObject;
          let that = this;
          const invoice = {
            invoice_number: oSelectedInvoiceObject.invoice_number,
            client_name: this.AppState.data.clients.find((item)=> item.id==oSelectedInvoiceObject.client_id).name,
            client_address: this.AppState.data.clients.find((item)=> item.id==oSelectedInvoiceObject.client_id).address,
            invoice_date: oSelectedInvoiceObject.issue_date,
            due_date: oSelectedInvoiceObject.due_date,
            tax_rate: 0.00,
            discount: oSelectedInvoiceObject.discount,
            total_amount: 1050,
            items: oSelectedInvoiceObject.items.map((item) => ({
              description: item.description,
              quantity: item.quantity,
              unit_price: item.unit_price,
              amount: item.quantity * item.unit_price,
              serviceName: that.AppState.data.services.find((service) => service.id == item.service_id)?.name || "",  
            })),
          };

          // 1. Generate PDF content
          const pdfContent = this._generateInvoicePDF(invoice);

          // 2. Trigger download
          FileUtil.save(
            pdfContent,
            `Invoice_${invoice.invoice_number}.pdf`,
            "application/pdf",
            "UTF-8"
          ).catch((error) => {
            MessageBox.error("Failed to download invoice");
          });
        },
        _generateInvoicePDF: function (invoice) {
          // Create a professional invoice HTML template
          const html = `
  <!DOCTYPE html>
  <html>
  <head>
	  <meta charset="utf-8">
	  <style>
		  body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
		  .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
		  .company-logo { height: 80px; }
		  .invoice-title { font-size: 24px; font-weight: bold; color: #2a5885; }
		  .invoice-info { margin-top: 20px; }
		  .section { margin: 25px 0; }
		  .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
		  .table th { background: #f5f7fa; text-align: left; padding: 10px; }
		  .table td { padding: 10px; border-bottom: 1px solid #eee; }
		  .total-row { font-weight: bold; background: #f9f9f9; }
		  .footer { margin-top: 50px; font-size: 12px; text-align: center; color: #777; }
	  </style>
  </head>
  <body>
	  <div class="header">
		  <div>
			  <h1>${this.getOwnerComponent()
          .getModel("i18n")
          .getProperty("companyName")}</h1>
			  <p>123 Business Rd<br>City, ST 10001</p>
		  </div>
		  <div class="invoice-info">
			  <h2 class="invoice-title">INVOICE</h2>
			  <p><strong>Number:</strong> ${invoice.invoice_number}</p>
			  <p><strong>Date:</strong> ${new Date(
          invoice.issue_date
        ).toLocaleDateString()}</p>
			  <p><strong>Due Date:</strong> ${new Date(
          invoice.due_date
        ).toLocaleDateString()}</p>
		  </div>
	  </div>
  
	  <div class="section">
		  <div style="float: left; width: 50%;">
			  <h3>Bill To:</h3>
			  <p>${invoice.client_name}<br>
			  ${invoice.client_address || ""}</p>
		  </div>
		  <div style="float: right; width: 50%;">
			  <h3>From:</h3>
			  <p>${this.getOwnerComponent().getModel("i18n").getProperty("companyName")}<br>
			  support@yourcrm.com</p>
		  </div>
		  <div style="clear: both;"></div>
	  </div>
  
	  <table class="table">
		  <thead>
			  <tr>
				  <th>Description</th>
				  <th>Qty</th>
				  <th>Unit Price</th>
				  <th>Amount</th>
			  </tr>
		  </thead>
		  <tbody>
			  ${invoice.items
          .map(
            (item) => `
				  <tr>
					  <td>${item.description}</td>
					  <td>${item.quantity}</td>
					  <td>${this._formatCurrency(item.unit_price)}</td>
					  <td>${this._formatCurrency(item.quantity * item.unit_price)}</td>
				  </tr>
			  `
          )
          .join("")}
			  <tr class="total-row">
				  <td colspan="3" style="text-align: right;">Subtotal:</td>
				  <td>${this._formatCurrency(invoice.subtotal)}</td>
			  </tr>
			  <tr>
				  <td colspan="3" style="text-align: right;">Tax (${invoice.tax_rate}%):</td>
				  <td>${this._formatCurrency(invoice.subtotal * (invoice.tax_rate / 100))}</td>
			  </tr>
			  <tr class="total-row">
				  <td colspan="3" style="text-align: right;">Total Due:</td>
				  <td>${this._formatCurrency(invoice.total_amount)}</td>
			  </tr>
		  </tbody>
	  </table>
  
	  <div class="footer">
		  <p>Thank you for your business!</p>
		  <p>Payment terms: Net ${Math.ceil(
        (new Date(invoice.due_date) - new Date(invoice.issue_date)) /
          (1000 * 60 * 60 * 24)
      )} days</p>
	  </div>
  </body>
  </html>
			  `;

          // Convert HTML to PDF (using Window.print() as fallback)
          return this._htmlToPDF(html);
        },
        _htmlToPDF: function (html) {
          // For demo purposes - in production use a proper PDF library
          if (window.html2pdf) {
            // If html2pdf.js is available
            const opt = {
              margin: 10,
              filename: "invoice.pdf",
              image: { type: "jpeg", quality: 0.98 },
              html2canvas: { scale: 2 },
              jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            };
            return html2pdf().set(opt).from(html).output("arraybuffer");
          } else {
            // Fallback for demo (opens print dialog)
            const printWindow = window.open("", "_blank");
            printWindow.document.write(html);
            printWindow.document.close();
            printWindow.print();
            return Promise.reject("Using print fallback");
          }
        },

        _formatCurrency: function (amount) {
          return new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: "USD",
          }).format(amount);
        },
        onDeleteInvoiceItem: function (oEvent) {
         const oTable = this.byId("invoiceItemsTable");
    const oModel = this.getView().getModel("AppState");
    const aItems = oModel.getProperty("/oSelectedInvoiceItemObject");

    // Get selected item
    const oSelectedItem = oTable.getSelectedItem();
    if (!oSelectedItem) {
        sap.m.MessageToast.show("Please select an item to delete.");
        return;
    }

    // Ask for confirmation before deleting
    sap.m.MessageBox.confirm("Are you sure you want to delete this item?", {
        title: "Confirm Deletion",
        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
        onClose: function (oAction) {
            if (oAction === sap.m.MessageBox.Action.YES) {
                const sPath = oSelectedItem.getBindingContext("AppState").getPath();
                const iIndex = parseInt(sPath.split("/").pop(), 10);

                // Remove item from array
                aItems.splice(iIndex, 1);

                // Update model
                oModel.setProperty("/oSelectedInvoiceItemObject", aItems);
                oModel.refresh();

                // Clear table selection
                oTable.removeSelections();
            }
        }
    });
        }




      }
    );
  }
);
