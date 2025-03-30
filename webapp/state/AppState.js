sap.ui.define(
  [
    "../model/BaseObject",

    "sap/m/MessageBox",
   
    "sap/m/MessageToast",
	"sap/ui/commons/Message"


  ],
  function (
    BaseObject,
	MessageBox,
	MessageToast,
	Message
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
           user:{},
            clients:[],
            currentPage:"",
            oSelectedClientObject:{},
            oSelectedLeadObject: {}

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
            this.data.clients = JSON.parse(data);
            this.updateModel();
          }.bind(this)).catch((error)=>{
              console.log('Error occured')
          });
        },
        saveClientDetails:function(oClient){

          if(oClient.id){
            this.AppService.updateClientDetails(oClient).then(function(data){
              this.getClients();
              MessageToast.show("Client details updated successfully");
            }.bind(this)).catch((Message)=>{
              
            });
          }else{
            this.AppService.saveClientDetails(oClient).then(function(data){
              this.getClients();
              MessageToast.show("Client details saved successfully");
            }.bind(this)).catch((Message)=>{
              this.getClients();
              MessageToast.show("Client details saved successfully");
            });

          }

        
        },
        deleteClient:function(oClient){
          this.AppService.deleteClient(oClient).then(function(data){
            this.getClients();
            MessageToast.show("Client deleted successfully");
          }.bind(this)).catch((Message)=>{
            this.getClients();
            MessageToast.show("Client deleted successfully");
          });
        },
        deleteLeads:function(oLead){
          this.AppService.deleteLeads(oLead).then(function(data){
            this.getLeads();
            MessageToast.show("Leads deleted successfully");
          }.bind(this)).catch((Message)=>{
            this.getLeads();
            MessageToast.show("Leads deleted successfully");
          });
        }

    

      }
    );
    return AppState;
  }
);