sap.ui.define(
  [
    "./BaseController",
    "sap/f/LayoutType",
    "sap/ui/core/Fragment",
    "micro/crm/frontend/model/Client",
    "micro/crm/frontend/model/Leads",
    "micro/crm/frontend/model/Service",
    "micro/crm/frontend/model/Project",
  ],
  (
    BaseController,
    LayoutType,
    Fragment,
    Client,
    Leads,
    Service,
    Project
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
          this.getModel("customerLayoutView").setProperty("/layout", sLayout);
          this.getModel("customerLayoutView").refresh(true);

        }

        if(this.AppState.currentPage === "manage_products"){
          this.AppState.data.oSelectedClientObject = new Service();
          let sLayout = LayoutType.TwoColumnsBeginExpanded;
          this.getModel("productLayoutView").setProperty("/layout", sLayout);
          this.getModel("productLayoutView").refresh(true);

        }

        if(this.AppState.currentPage === "manage_leads"){
          this.AppState.data.oSelectedLeadObject = new Leads();
          let sLayout = LayoutType.TwoColumnsBeginExpanded;
          this.getModel("productLayoutViewLeadView").setProperty("/layout", sLayout);
          this.getModel("productLayoutViewLeadView").refresh(true);

        }

        if(this.AppState.currentPage === "manage_projects"){
          this.AppState.data.oSelectedLeadObject = new Project();
          let sLayout = LayoutType.TwoColumnsBeginExpanded;
          this.getModel("projectLayoutView").setProperty("/layout", sLayout);
          this.getModel("projectLayoutView").refresh(true);

        }

        if(this.AppState.currentPage === "manage_tasks"){
          this.AppState.data.oSelectedLeadObject = new Leads();
          let sLayout = LayoutType.TwoColumnsBeginExpanded;
          this.getModel("TaskLayoutView").setProperty("/layout", sLayout);
          this.getModel("TaskLayoutView").refresh(true);

        }


      }
    
    });
  }
);