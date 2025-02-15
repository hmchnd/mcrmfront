sap.ui.define(
  [
    "./BaseController",
    "sap/f/LayoutType",
    "../model/Project",
    "../model/Activity",
    "../model/Framework",
    "../model/Task",
    "sap/ui/core/Fragment",
  ],
  (
    BaseController,
    LayoutType,
    Project,
    Activity,
    Framework,
    Task,
    Fragment
  ) => {
    "use strict";

    return BaseController.extend("framsys.com.framsysfrontend.controller.App", {
      onInit() {
        if (sap?.ushell?.Container?.getRenderer("fiori2")) {
          sap?.ushell?.Container?.getRenderer("fiori2")?.setHeaderVisibility(
            false,
            true
          );
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
        this.getRouter().navTo(oSelectedItem.getKey());
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
      onAddNewItem: function (oEvent) {
        if (this.AppState.data.oRoleBasesVisiblity.sLoginPerson=="Project Area Leader") {
          this.AppState.data.makeTaskMilestoneVisiblity.milestonevisiblity1 = false
                  this.AppState.data.oRoleBasesVisiblity.areaLeaderSaveBtnVisiblity = true
                  this.AppState.data.oRoleBasesVisiblity.showMilestoneSave = true
        }
       

        this.AppState.data.sidePanelOpen = false;

        if (this.AppState.data.currentPage == "PROJECT") {
          let sLayout = LayoutType.TwoColumnsBeginExpanded;
          this.AppState.data.aPhase = {}
          this.AppState.data.aArea = {}
          this.AppState.data.aTask = {}

          this.getModel("projectLayoutView").setProperty("/layout", sLayout);
          this.getModel("projectLayoutView").refresh(true);
          this.AppState.data.oSelectedProject = new Project();
        } else if (this.AppState.data.currentPage == "roadmapTemplate") {
          let sLayout = LayoutType.EndColumnFullScreen;
          this.getModel("roadmapTemplateLayoutView").setProperty(
            "/layout",
            sLayout
          );
          this.getModel("roadmapTemplateLayoutView").refresh(true);
          this.AppState.data.oSelectedFramework = new Framework();
        } else if (this.AppState.data.currentPage == "ManageRoadmap") {
          var oView = this.getView();

          // Load the fragment only once
          if (!this._oPopover) {
            Fragment.load({
              id: oView.getId(),
              name: "framsys.com.framsysfrontend.fragment.Milestone",
              controller: this,
            }).then(
              function (oPopover) {
                oView.addDependent(oPopover);
                this._oPopover = oPopover;
                this._oPopover.openBy(oEvent.getSource()); // Open popover near button
              }.bind(this)
            );
          } else {
            this._oPopover.openBy(oEvent.getSource());
          }

          // let sLayout = LayoutType.TwoColumnsBeginExpanded;

          // this.getModel("manageRoadmapLayoutView").setProperty("/layout", sLayout);
          // this.getModel("manageRoadmapLayoutView").refresh(true);
          this.AppState.data.oSelectedTask = new Activity();
        } else if (this.AppState.data.currentPage == "manageActivity") {
          let sLayout = LayoutType.TwoColumnsBeginExpanded;
          this.getModel("activityLayoutView").setProperty("/layout", sLayout);
          this.getModel("activityLayoutView").refresh(true);
          this.AppState.data.oSelectedActivity = new Activity();
        }
      },
      onPopoverOk: function () {
        var oView = this.getView();

        if (!this._oPopover) {
          return;
        }

        var oRadioGroup = Fragment.byId(oView.getId(), "radioGroup");

        if (!oRadioGroup) {
          console.error("RadioButtonGroup not found!");
          return;
        }

        var iSelectedIndex = oRadioGroup.getSelectedIndex();
        console.log("Selected Index: ", iSelectedIndex);

        let sLayout = LayoutType.TwoColumnsBeginExpanded;
        // this.AppState.data.aa = sLayout;
        debugger;
        if (iSelectedIndex === 0) {
          this.AppState.data.oRoleBasesVisiblity.saveBtnVisiblity = true;
          this.AppState.data.makeTaskMilestoneVisiblity.milestonevisiblity = true;
          this.AppState.data.makeTaskMilestoneVisiblity.taskvisiblity = false;
          this.AppState.data.makeTaskMilestoneVisiblity.EditAreaVisiblity = false;
          this.AppState.data.oSelectedMilestone = {};
          // if (this.AppState.data.oRoleBasesVisiblity.sLoginPerson=="Activity Performer") {
          //   this.AppState.data.makeTaskMilestoneVisiblity.milestonevisiblity1 = true
          //           this.AppState.data.oRoleBasesVisiblity.areaLeaderSaveBtnVisiblity = true
          //           this.AppState.data.oRoleBasesVisiblity.showMilestoneSave = true
          // }

          this.getModel("manageRoadmapLayoutView").setProperty(
            "/layout",
            sLayout
          );
          this.getModel("manageRoadmapLayoutView").refresh(true);
        } else if (iSelectedIndex === 1) {
          console.log("Creating Task...");
          this.AppState.data.makeTaskMilestoneVisiblity.milestonevisiblity = false;
          this.AppState.data.makeTaskMilestoneVisiblity.taskvisiblity = true;
          this.AppState.data.makeTaskMilestoneVisiblity.EditAreaVisiblity = false;
          // if (this.AppState.data.oRoleBasesVisiblity.sLoginPerson=="Activity Performer") {
          //   this.AppState.data.makeTaskMilestoneVisiblity.milestonevisiblity1 = false
          //           this.AppState.data.oRoleBasesVisiblity.areaLeaderSaveBtnVisiblity = true
          //           this.AppState.data.oRoleBasesVisiblity.showMilestoneSave = true
          // }

          this.getModel("manageRoadmapLayoutView").setProperty(
            "/layout",
            sLayout
          );

          this.getModel("manageRoadmapLayoutView").refresh(true);
        }

        this._oPopover.close();
        // this.onSideNavButtonPress();
        // this.getModel("manageRoadmapLayoutView").setProperty("/layout", "TwoColumnsBeginExpanded");
      },
      onBackToRoadmap: function () {
        let sRoadmapID = this.AppState.data.sSelectedProjectRoadmapID;
        //  this.AppState.data.sSelectedProjectName
        this.getOwnerComponent().getRouter().navTo("ManageRoadmap", {
          sRoadmapID: sRoadmapID
        });
        let sLayout = LayoutType.OneColumn;
        
        this.getModel("manageRoadmapLayoutView").setProperty("/layout", sLayout);
      },
      onPopoverCancel: function () {
        this._oPopover.close();
      },
      onSettingsPress: function (oEvent) {
        // Load and display the create new product dialog
        if (!this.oLoginDialog) {
          Fragment.load({
            id: this.getView().getId(),
            name: "framsys.com.framsysfrontend.fragment.LoginDialog",
            controller: this
          }).then(oDialog => {
            this.oLoginDialog = oDialog
            this.getView().addDependent(oDialog)
            oDialog.open()
          })
        } else {
          this.oLoginDialog.open()
        }
      },
      onCancelLoginDialog: function () {
        this.oLoginDialog.close()
      },
      onLogin: function () {
        let loginPerson = this.getView().byId("loginComboBox").getSelectedItem().getText();
        this.AppState.data.oRoleBasesVisiblity.sLoginPerson = loginPerson;
        if (loginPerson == "Enterprise Portfolio Administrator") {
          this.AppState.data.oRoleBasesVisiblity.portfolioVisiblity = true;
          this.AppState.data.oRoleBasesVisiblity.roadmapVisiblity = true;
          this.AppState.data.oRoleBasesVisiblity.kanbanVisiblity = true;


        } else if (loginPerson == "Project Manager") {
          this.AppState.data.oRoleBasesVisiblity.portfolioVisiblity = true;
          this.AppState.data.oRoleBasesVisiblity.roadmapVisiblity = true;
          this.AppState.data.oRoleBasesVisiblity.kanbanVisiblity = true;
        }
        else if (loginPerson == "Project Area Leader") { 
          this.AppState.data.oRoleBasesVisiblity.portfolioVisiblity = true;
          this.AppState.data.oRoleBasesVisiblity.roadmapVisiblity = true;
          this.AppState.data.oRoleBasesVisiblity.kanbanVisiblity = false;
        }
        else if (loginPerson == "Project Gate Keeper") {
          this.AppState.data.oRoleBasesVisiblity.portfolioVisiblity = true;
          this.AppState.data.oRoleBasesVisiblity.roadmapVisiblity = true;
          this.AppState.data.oRoleBasesVisiblity.kanbanVisiblity = false;
         }
        else if (loginPerson == "Task Responsible") {
          this.AppState.data.oRoleBasesVisiblity.portfolioVisiblity = true;
          this.AppState.data.oRoleBasesVisiblity.roadmapVisiblity = true;
          this.AppState.data.oRoleBasesVisiblity.kanbanVisiblity = false;
         }
        else if (loginPerson == "Activity Performer") {
          this.AppState.data.oRoleBasesVisiblity.portfolioVisiblity = true;
          this.AppState.data.oRoleBasesVisiblity.roadmapVisiblity = true;
          this.AppState.data.oRoleBasesVisiblity.kanbanVisiblity = true;
        }
        this.oLoginDialog.close()

      }
    });
  }
);