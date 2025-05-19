sap.ui.define(
  [
    "../model/BaseObject",

    "sap/m/MessageBox",
   
    "sap/m/MessageToast",
	"sap/ui/commons/Message",
  "../model/InvoiceItems",
  "../model/Invoice",


  ],
  function (
    BaseObject,
	MessageBox,
	MessageToast,
	Message,
  InvoiceItems,
  Invoice
  ) {
    "use strict";
    var AppState = BaseObject.extend(
      "micro.crm.frontend.state.AppState",
      {
        /**
         * ----------------------------------------------
         * State constructor/destuctor functions.
         * ----------------------------------------------
         */

        /**
         * Constructor: Initializing State.
         * @param oService
         * @param oResourceBundle
         */
        constructor: function (oService, oResourceBundle) {
          var that = this;
          that.AppService = oService; // OData service.
          that.BusyCounter = 0; // Busy indicator counter.
          that.ResourceBundle = oResourceBundle; // Text Resources
          that.ViewController = null; // View controller instance.

          this.data = {
            globalCreateButtonVisibility: false,
            user:{},
            clients:[],
            Leads:[],
            services:[],
            categories:[],
            projects:[],
            tasks:[],
            invoices:[],
            invoice_items :[],
            payments:[],
            clientIssues:[],
            currentPage:"",
            oSelectedClientObject:{},
            oSelectedLeadObject: {},
            oSelectedServiceObject: {},
            oSelectedProjectObject: {},
            oSelectedTaskObject: {},
            oSelectedInvoiceObject: {},
            oSelectedInvoiceItemObject: [],
            oSelectedClientIssuesObject: {},
          
          };

          // Initialize base object.
          BaseObject.call(that, {
            isState: true,
          });
        },
        setViewController: function (oViewController) {
          this.ViewController = oViewController;
        },
        /**
         * Returns access to i18n text resources.
         * @returns ... Resource Bundle object.
         */
        getTextResources: function () {
          return this.ResourceBundle;
        },

        getUser:function(){
          this.AppService.getcrmuser().then(function(data){
            this.data.user = JSON.parse(data)[0];
            this.updateModel();
          }.bind(this)).catch((error)=>{
              console.log('Error occured')
          });
        },
        getClients:function(){
          this.AppService.getclients().then(function(data){
            this.data.clients = JSON.parse(data);
            this.updateModel();
          }.bind(this)).catch((error)=>{
              console.log('Error occured')
          });
        },

        getLeads:function(){
          this.AppService.getleads().then(function(data){
            this.data.Leads = JSON.parse(data);
            this.updateModel();
          }.bind(this)).catch((error)=>{
              console.log('Error occured')
          });
        },
        saveClientDetails:function(oLead){

          if(oLead.id){
            this.AppService.updateClientDetails(oLead).then(function(data){
              this.getClients();
              MessageBox.success("Client details updated successfully");
            }.bind(this)).catch((Message)=>{
            });
          }else{
            this.AppService.saveClientDetails(oLead).then(function(data){
              this.getClients();
              MessageBox.success("Client details saved successfully");
            }.bind(this)).catch((Message)=>{
              this.getClients();
              MessageToast.show("Client details saved successfully");
            });

          }
        },

        saveLeadDetails:function(oLead){
          if(oLead.id){
            this.AppService.updateLeadDetails(oLead).then(function(data){
              this.getLeads();
             MessageBox.success("Lead details updated successfully");
            }.bind(this)).catch((Message)=>{
            });
          }else{
            this.AppService.saveLeadDetails(oLead).then(function(data){
              this.getLeads();
              MessageBox.success("Lead details saved successfully");
            }.bind(this)).catch((Message)=>{
              this.getLeads();
              MessageToast.show("Lead details saved successfully");
            });

          }
        },

        deleteClient:function(oClient){
          this.AppService.deleteClient(oClient).then(function(data){
            this.getClients();
           MessageBox.success("Client deleted successfully");
          }.bind(this)).catch((Message)=>{
            this.getClients();
            MessageBox.error("Client deleted Error");
          });
        },
        deleteLeads:function(oLead){
          this.AppService.deleteLeads(oLead).then(function(data){
            this.getLeads();
            MessageBox.success("Leads deleted successfully");
          }.bind(this)).catch((Message)=>{
            this.getLeads();
            MessageBox.error("Leads deleted Error");
          });
        },
        saveServiceDetails:function(oService){
          if(oService.id){
              oService.userid = '1316dd7b-53b7-4e91-a1d4-8a171efc3481'
            this.AppService.updateServiceDetails(oService).then(function(data){
              this.getServices();
              MessageBox.success("Service details updated successfully");
            }.bind(this)).catch((Message)=>{
            });
          }else{
            oService.userid = '1316dd7b-53b7-4e91-a1d4-8a171efc3481'
            this.AppService.saveServiceDetails(oService).then(function(data){
              this.getServices();
              MessageBox.success("Service details saved successfully");
            }.bind(this)).catch((Message)=>{
              this.getServices();
              MessageBox.error("Service details saved Error");
            });

          }
        },
        deleteService:function(oService){
          this.AppService.deleteService(oService).then(function(data){
            this.getServices();
            MessageBox.success("Service deleted successfully");
          }.bind(this)).catch((Message)=>{
            this.getServices();
            MessageBox.error("Service deleted Error");
          });
        },
        getServices:function(){
          this.AppService.getServices().then(function(data){
            this.data.services = JSON.parse(data);
            this.updateModel();
          }.bind(this)).catch((error)=>{
              console.log('Error occured')
          });
        },
        getServiceCategories:function(){
          this.AppService.getServiceCategories().then(function(data){
            this.data.categories = JSON.parse(data);
            this.updateModel();
          }.bind(this)).catch((error)=>{
              console.log('Error occured')
          });
        },
        getProjects:function(){
          this.AppService.getProjects().then(function(data){
            this.data.projects = JSON.parse(data);
            this.updateModel();
          }.bind(this)).catch((error)=>{
              console.log('Error occured')
          });
        },
        saveProjectDetails:function(oProject){
          oProject.team = 'a5c2239e-c014-41dc-beac-6fc5130d1005'
          oProject.status = 'Open'
          if(oProject.id){
            this.AppService.updateProjectDetails(oProject).then(function(data){
              this.getProjects();
              MessageBox.success("Project details updated successfully");
            }.bind(this)).catch((Message)=>{
            });
          }else{
            this.AppService.saveProjectDetails(oProject).then(function(data){
              this.getProjects();
              MessageBox.success("Project details saved successfully");
            }.bind(this)).catch((Message)=>{
              this.getProjects();
              MessageBox.error("Project details saved Error");
            });

          }
        },
        deleteProject:function(oProject){
          this.AppService.deleteProject(oProject).then(function(data){
            this.getProjects();
            MessageBox.success("Project deleted successfully");
          }.bind(this)).catch((Message)=>{
            this.getProjects();
            MessageBox.error("Project deleted Error");
          });
        },
        getTasks:function(){
          this.AppService.getTasks().then(function(data){
            this.data.tasks = JSON.parse(data);
            this.updateModel();
          }.bind(this)).catch((error)=>{
              console.log('Error occured')
          });
        },
        saveTaskDetails:function(oTask){
  
          oTask.status = 'To Do'
          if(oTask.id){
            this.AppService.updateTaskDetails(oTask).then(function(data){
              this.getTasks();
              MessageBox.success("Task details updated successfully");
            }.bind(this)).catch((Message)=>{
            });
          }else{
            this.AppService.saveTaskDetails(oTask).then(function(data){
              this.getTasks();
              MessageBox.success("Task details saved successfully");
            }.bind(this)).catch((Message)=>{
              this.getTasks();
              MessageBox.error("Task details saved Error");
            });

          }
        },
        deleteTask:function(oTask){
          this.AppService.deleteTask(oTask).then(function(data){
            this.getTasks();
            MessageBox.success("Task deleted successfully");
          }.bind(this)).catch((Message)=>{
            this.getTasks();
            MessageBox.error("Task deleted Error");
          });
        },
        getInvoices:function(){
          this.AppService.getInvoices().then(function(data){
            this.data.invoices = JSON.parse(data);
            this.updateModel();
          }.bind(this)).catch((error)=>{
              console.log('Error occured')
          });
        },
        saveInvoiceDetails:function(oInvoice){
          //oInvoice.client_id = 'a5c2239e-c014-41dc-beac-6fc5130d1005'
          //oInvoice.lead_id = 'a5c2239e-c014-41dc-beac-6fc5130d1005'
          //oInvoice.status = 'Draft'
          debugger;
          if(oInvoice.id){
            this.AppService.updateInvoiceDetails(oInvoice).then(function(data){
              this.getInvoices();
              MessageBox.success("Invoice details updated successfully");
            }.bind(this)).catch((Message)=>{
            });
          }else{
            this.AppService.saveInvoiceDetails(oInvoice).then(function(data){
              this.getInvoices();
              MessageBox.success("Invoice details saved successfully");
            }.bind(this)).catch((Message)=>{
              this.getInvoices();
              MessageBox.error("Invoice details saved Error");
            });

          }
        },
        saveClientIssueDetails:function(oClientIssue){

          //oClientIssue.client_id = 'a5c2239e-c014-41dc-beac-6fc5130d1005'
          //oClientIssue.lead_id = 'a5c2239e-c014-41dc-beac-6fc5130d1005'
          oClientIssue.status = 'Draft'
          debugger;
          if(oClientIssue.id){
            this.AppService.updateClientIssueDetails(oClientIssue).then(function(data){
              this.getClientIssues();
              MessageBox.success("Client Issue details updated successfully");
            }.bind(this)).catch((Message)=>{
            });
          }else{
            this.AppService.saveClientIssueDetails(oClientIssue).then(function(data){
              this.getClientIssues();
              MessageBox.success("Client Issue details saved successfully");
            }.bind(this)).catch((Message)=>{
              this.getClientIssues();
              MessageBox.error("Client Issue details saved Error");
            });

          }
        },
        getClientIssues:function(){
          let that = this;
          this.AppService.getClientIssues().then(function(data){
            that.data.clientIssues = JSON.parse(data);
        
            that.updateModel();
          }.bind(this)).catch((error)=>{
         
              console.log('Error occurred')
          });
        },
        deleteClientIssue:function(oClientIssue){
          this.AppService.deleteClientIssue(oClientIssue).then(function(data){
            this.getClientIssues();
            MessageBox.success("Client Issue deleted successfully");
          }.bind(this)).catch((Message)=>{
            this.getClientIssues();
            MessageBox.error("Client Issue deleted Error");
          });
        },
        doUserLogin: function (oUser) {
          this.AppService.doLogin(oUser).then(function (data) {
            this.data.user = JSON.parse(data);
            // store token securely (localStorage for now)
            localStorage.setItem("auth_token",  this.data.user.token);
            sap.m.MessageToast.show("Login successful");
            // Navigate to dashboard
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this.ViewController);
            oRouter.navTo("Dashboard");
            this.updateModel();
          }.bind(this)).catch((Message) => {
            MessageBox.error("Invalid username or password");
          });
        },
      

    

      }
    );
    return AppState;
  }
);