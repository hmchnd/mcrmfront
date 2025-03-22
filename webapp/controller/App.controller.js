sap.ui.define(
  [
    "./BaseController",
    "sap/f/LayoutType",
   
    "sap/ui/core/Fragment",
    "micro/crm/frontend/model/Client"
  ],
  (
    BaseController,
    LayoutType,
  
    Fragment,
    Client
  ) => {
    "use strict";

    return BaseController.extend("micro.crm.frontend.controller.App", {
      onInit() {
       
        this.getRouter().attachRouteMatched(this.onRouteChange.bind(this));
      },
      onSideNavButtonPress: function (oEvent) {
        var oToolPage = this.byId("toolpage");
        var bSideExpanded = oToolPage.getSideExpanded();
        // this._setToggleButtonTooltip(bSideExpanded);
        oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
      },
      onSelect: function (oEvent) {
        var oSelectedItem = oEvent.getParameter("item");
        var oExpanded = oSelectedItem.getExpanded();
        if (oExpanded === false) {
          // var oNavigationList = oEvent.getSource();
          // var oItems = oNavigationList.getItems();
          // for (var i = 0; i < oItems.length; i++) {
          //   oItems[i].collapse();
          // }
          oSelectedItem.expand();
        }
        this.getRouter().navTo(oSelectedItem.getKey());
      },
      onRouteChange: function (oEvent) {
        this.AppState = this.getOwnerComponent().getState("App");
        this.getView().setModel(this.AppState.getModel(), "AppState");
        this.AppState.getModel().setSizeLimit(999999);
        this.AppState.getUser()
        this.getModel("sideContentModel").setProperty(
          "/selectedKey",
          oEvent.getParameter("name")
        );
      },
      onAddNewItem:function(){

        if(this.AppState.currentPage === "manage_customers"){
          this.AppState.data.oSelectedClientObject = new Client();
          let sLayout = LayoutType.TwoColumnsBeginExpanded;
          this.getModel("projectLayoutView").setProperty("/layout", sLayout);
          this.getModel("projectLayoutView").refresh(true);

        }


      }
    
    });
  }
);