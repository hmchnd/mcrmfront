sap.ui.define(
  [
    "../model/BaseObject",

    "sap/m/MessageBox",
   
    "sap/m/MessageToast"


  ],
  function (
    BaseObject,
   
    MessageBox,
  
    MessageToast
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
            this.data.user = data;
            this.updateModel();
          }.bind(this)).catch((error)=>{
              console.log('Error occured')
          });
        }

    

      }
    );
    return AppState;
  }
);