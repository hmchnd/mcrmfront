sap.ui.define([
  "./BaseController",
  "sap/f/LayoutType",
  "../model/Project",
  "../model/Activity",
"../model/Framework",
"../model/Task",
], (BaseController,LayoutType,Project,Activity,Framework,Task) => {

  "use strict";

  return BaseController.extend("framsys.com.framsysfrontend.controller.App", {
      onInit() {
        if (sap?.ushell?.Container?.getRenderer("fiori2")) {
          sap?.ushell?.Container?.getRenderer("fiori2")?.setHeaderVisibility(false, true);
        }
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
        this.getRouter().navTo(oSelectedItem.getKey())
      },
      onRouteChange: function (oEvent) {
        this.AppState = this.getOwnerComponent().getState("App");
          this.getView().setModel(this.AppState.getModel(), "AppState");
			    this.AppState.getModel().setSizeLimit(999999);
        this.getModel("sideContentModel").setProperty(
          "/selectedKey",
          oEvent.getParameter("name")
        );
      },
      onAddNewItem:function(){
        debugger
        
        if(this.AppState.data.currentPage == "PROJECT"){
        let sLayout = LayoutType.TwoColumnsBeginExpanded;

          this.getModel("projectLayoutView").setProperty("/layout", sLayout);
          this.getModel("projectLayoutView").refresh(true);
          this.AppState.data.oSelectedTask = new Task();
        }else if(this.AppState.data.currentPage == "roadmapTemplate"){
          let sLayout = LayoutType.EndColumnFullScreen;
          this.getModel("roadmapTemplateLayoutView").setProperty("/layout", sLayout);
          this.getModel("roadmapTemplateLayoutView").refresh(true);
          this.AppState.data.oSelectedFramework = new Framework();
        }else if(this.AppState.data.currentPage == "ManageRoadmap"){
          let sLayout = LayoutType.TwoColumnsBeginExpanded;

          this.getModel("manageRoadmapLayoutView").setProperty("/layout", sLayout);
          this.getModel("manageRoadmapLayoutView").refresh(true);
          this.AppState.data.oSelectedProject = new Activity();
        }else if(this.AppState.data.currentPage == "manageActivity"){
          let sLayout = LayoutType.TwoColumnsBeginExpanded;
          this.getModel("activityLayoutView").setProperty("/layout", sLayout);
          this.getModel("activityLayoutView").refresh(true);
          this.AppState.data.oSelectedActivity = new Activity();
        }
       
      }
  });
});