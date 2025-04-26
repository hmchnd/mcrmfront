sap.ui.define([
	"./BaseController",
	"sap/f/LayoutType",
	"sap/ui/core/util/File",
	"sap/m/MessageBox",

], function(
	BaseController,LayoutType,FileUtil,MessageBox) {
	"use strict";

	return BaseController.extend("micro.crm.frontend.controller.ManageInvoices", {


		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter
			  .getRoute("manage_invoice")
			  .attachPatternMatched(this.onRouteMatched, this);
		},
		onRouteMatched: function(oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			this.AppState = this.getOwnerComponent().getState("App");
			this.getView().setModel(this.AppState.getModel(), "AppState");
			this.AppState.getModel().setSizeLimit(999999);
			this.AppState.currentPage = "manage_invoice";
			this.AppState.data.globalCreateButtonVisibility = true;
			this.AppState.getServices();
			this.AppState.getClients();
			this.AppState.getLeads();
			this.AppState.getInvoices();
		},
		onSaveInvoice: function(oEvent) {
			let oInvoice = this.AppState.data.oSelectedInvoiceObject.mapPostData();
			let oInvoiceItems = this.AppState.data.oSelectedInvoiceItemObject;
			oInvoice.items = oInvoiceItems;
			debugger;
			this.AppState.saveInvoiceDetails(oInvoice);
		},
		onCloseDetailPage: function(oEvent) {
			let sLayout = sap.f.LayoutType.OneColumn;
			this.getModel("InvoiceLayoutView").setProperty("/layout", sLayout);
			this.getModel("InvoiceLayoutView").refresh(true);
		},
		onPressInvoice: function (oEvent) {
			let oSelectedInvoiceObject =
            oEvent.getSource()?.getBindingContext("AppState")?.getObject() ||
            {};
			this.AppState.data.oSelectedInvoiceObject = oSelectedInvoiceObject;
			var sLayout = LayoutType.TwoColumnsBeginExpanded;
			this.getModel("InvoiceLayoutView").setProperty("/layout", sLayout);

		},
		addInvoiceItem: function(oEvent) {
			let oTable = this.getView().byId("invoiceItemsTable");
			let oSelectedInvoiceItemObject= oTable.getModel("AppState").getData().oSelectedInvoiceItemObject
		debugger
			
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
        
        formatTotalAmount: function(subtotal, taxRate, discount) {
            const tax = subtotal * (taxRate / 100);
            return subtotal + tax - (discount || 0);
        },
        
        formatStatusState: function(status) {
            const states = {
                "draft": "None",
                "sent": "Information",
                "paid": "Success",
                "overdue": "Error",
                "cancelled": "Warning"
            };
            return states[status] || "None";
        },
		downloadInvovice:function(oEvent) {
			const invoice = {
				invoice_number: "INV-001",
				client_name: "John Doe",
				client_address: "123 Main St, Springfield, USA",
				invoice_date: "2023-10-01",	
				due_date: "2023-10-15",
				subtotal: 1000,
				tax_rate: 10,
				discount: 50,
				total_amount: 1050,
				subtotal: 1000,
				items: [
					{ description: "Service 1", quantity: 2, unit_price: 200 },
					{ description: "Service 2", quantity: 1, unit_price: 300 },
					{ description: "Service 3", quantity: 3, unit_price: 150 }
				]
			
			}
            
            // 1. Generate PDF content
            const pdfContent = this._generateInvoicePDF(invoice);
            
            // 2. Trigger download
            FileUtil.save(
                pdfContent,
                `Invoice_${invoice.invoice_number}.pdf`,
                "application/pdf",
                "UTF-8"
            ).catch(error => {
                MessageBox.error("Failed to download invoice");
            });
		},
		_generateInvoicePDF: function(invoice) {
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
			  <h1>${this.getOwnerComponent().getModel("i18n").getProperty("companyName")}</h1>
			  <p>123 Business Rd<br>City, ST 10001</p>
		  </div>
		  <div class="invoice-info">
			  <h2 class="invoice-title">INVOICE</h2>
			  <p><strong>Number:</strong> ${invoice.invoice_number}</p>
			  <p><strong>Date:</strong> ${new Date(invoice.issue_date).toLocaleDateString()}</p>
			  <p><strong>Due Date:</strong> ${new Date(invoice.due_date).toLocaleDateString()}</p>
		  </div>
	  </div>
  
	  <div class="section">
		  <div style="float: left; width: 50%;">
			  <h3>Bill To:</h3>
			  <p>${invoice.client_name}<br>
			  ${invoice.client_address || ''}</p>
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
			  ${invoice.items.map(item => `
				  <tr>
					  <td>${item.description}</td>
					  <td>${item.quantity}</td>
					  <td>${this._formatCurrency(item.unit_price)}</td>
					  <td>${this._formatCurrency(item.quantity * item.unit_price)}</td>
				  </tr>
			  `).join('')}
			  <tr class="total-row">
				  <td colspan="3" style="text-align: right;">Subtotal:</td>
				  <td>${this._formatCurrency(invoice.subtotal)}</td>
			  </tr>
			  <tr>
				  <td colspan="3" style="text-align: right;">Tax (${invoice.tax_rate}%):</td>
				  <td>${this._formatCurrency(invoice.subtotal * (invoice.tax_rate/100))}</td>
			  </tr>
			  <tr class="total-row">
				  <td colspan="3" style="text-align: right;">Total Due:</td>
				  <td>${this._formatCurrency(invoice.total_amount)}</td>
			  </tr>
		  </tbody>
	  </table>
  
	  <div class="footer">
		  <p>Thank you for your business!</p>
		  <p>Payment terms: Net ${Math.ceil((new Date(invoice.due_date) - new Date(invoice.issue_date)) / (1000 * 60 * 60 * 24))} days</p>
	  </div>
  </body>
  </html>
			  `;
  
			  // Convert HTML to PDF (using Window.print() as fallback)
			  return this._htmlToPDF(html);
		}
		,

        _htmlToPDF: function(html) {
            // For demo purposes - in production use a proper PDF library
            if (window.html2pdf) {
                // If html2pdf.js is available
                const opt = {
                    margin: 10,
                    filename: 'invoice.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };
                return html2pdf().set(opt).from(html).output('arraybuffer');
            } else {
                // Fallback for demo (opens print dialog)
                const printWindow = window.open('', '_blank');
                printWindow.document.write(html);
                printWindow.document.close();
                printWindow.print();
                return Promise.reject("Using print fallback");
            }
        },

        _formatCurrency: function(amount) {
            return new Intl.NumberFormat(undefined, { 
                style: 'currency', 
                currency: 'USD' 
            }).format(amount);
        }
	});
});