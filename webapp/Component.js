sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "framsys/com/framsysfrontend/model/models",
    "./service/AppService",
    "./state/AppState",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
  ],
  (
    UIComponent,
    models,
    AppService,
    AppState,
    MessageBox,
    Fragment,
    MessageToast
  ) => {
    "use strict";

    return UIComponent.extend("framsys.com.framsysfrontend.Component", {
      metadata: {
        manifest: "json",
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
      },

      init() {
        // Call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        // Set models
        this.setModel(models.createDeviceModel(), "device");
        this.setModel(models.createLocalJsonModel(), "sideContentModel");
        this.setModel(
          models.createProjectViewLayoutModel(),
          "projectLayoutView"
        );
        this.setModel(
          models.manageActivityViewLayoutModel(),
          "activityLayoutView"
        );
        this.setModel(
          models.roadmapTemplateViewLayoutModel(),
          "roadmapTemplateLayoutView"
        );
        this.setModel(
          models.manageRoadmapViewLayoutModel(),
          "manageRoadmapLayoutView"
        );

        // Instantiating services and states
        this._oAppService = new AppService(this.getModel());
        this._oAppState = new AppState(
          this._oAppService,
          this.getModel("i18n").getResourceBundle()
        );
        this.openLoginDialog();
        // Enable routing
        this.getRouter().initialize();
            this.getRouter().navTo("Dashboard");
            setTimeout(() => {
                this.openLoginDialog();
            }, 1500);

      },

      getService_: function (sService) {
        return this["_o" + sService + "Service"];
      },

      getState: function (sState) {
        return this["_o" + sState + "State"];
      },

      /** Open the login dialog */
      openLoginDialog: function () {
        if (!this.oLoginDialog) {
          Fragment.load({
            id: this.getId() + "LoginDialog",
            name: "framsys.com.framsysfrontend.fragment.LoginDialog",
            controller: this,
          }).then((oDialog) => {
            this.oLoginDialog = oDialog;
            this.oLoginDialog.setModel(this.getModel());
            this.oLoginDialog.open();
          });
        } else {
          this.oLoginDialog.open();
        }
      },
      onCancelLoginDialog: function () {
        this.oLoginDialog.close();
        MessageToast.show("Login cancelled please select a role to login");
        this.getRouter().navTo("Dashboard");
        setTimeout(() => {
            this.openLoginDialog();
        }, 1000);
      },

      onLogin: function () {
        debugger;
        let oComboBox = sap.ui.core.Fragment.byId(
          this.getId() + "LoginDialog",
          "loginComboBox"
        );

        if (!oComboBox || !oComboBox.getSelectedItem()) {
          sap.m.MessageBox.error("Please select a valid login role.");
          return;
        }

        let loginPerson = oComboBox.getSelectedItem().getText();
        let oRoleVisibility = this._oAppState.data.oRoleBasesVisiblity;

        oRoleVisibility.sLoginPerson = loginPerson;
        let model = this.getModel("sideContentModel");
        let modelData = model.getData();
        let views = modelData.navigation;
        let areaResponsibleId = "053ee50a-7309-4394-8f55-d43ea1e3adb2";

        // Set role-based visibility
        switch (loginPerson) {
          // 0-dashboard
          // 1-portfolio
          // 2-roadmapTemplateViewLayoutModel
          // 3-manageRoadmap
          // 4-kanban
          case "Enterprise Portfolio Administrator":
            debugger;

            views[2].visible = false;
            views[3].visible = false;
            views[4].visible = false;

            model.setData(modelData);
            model.refresh(true);
            this._oAppState.data.oRoleBasesVisiblity.manageroadmapBtn = false;
            this._oAppState.data.showGlobalAddButton = true;

            // this.getRouter().navTo("manage_projects");

            break;
          case "Project Manager":
            // views[2].visible = false;
            // views[4].visible = false;

            model.setData(modelData);
            model.refresh(true);
            this._oAppState.data.oRoleBasesVisiblity.saveBtnVisiblity = false;
            this._oAppState.data.oRoleBasesVisiblity.areaLeaderSaveBtnVisiblity = true;
            this._oAppState.data.oRoleBasesVisiblity.deleteBtnVisiblity = false;
            this._oAppState.data.makeTaskMilestoneVisiblity.milestonevisiblity1 = true;
            this._oAppState.data.showGlobalAddButton = false;

            break;

          case "Project Area Leader":
            areaResponsibleId = "053ee50a-7309-4394-8f55-d43ea1e3adb2";
            this._oAppState.data.oRoleBasesVisiblity.areaResponsibleId =
              areaResponsibleId;
            this._oAppState.data.oRoleBasesVisiblity.showCreateMilestoneBtnVisiblity = false;
            this._oAppState.data.oRoleBasesVisiblity.areaLeaderSaveBtnVisiblity = false;
            this._oAppState.data.oRoleBasesVisiblity.isEditAreaVisible = false;
            this._oAppState.data.oRoleBasesVisiblity.saveBtnVisiblity = false;
            this._oAppState.data.makeTaskMilestoneVisiblity.milestonevisiblity1 = true;
            this._oAppState.data.oRoleBasesVisiblity.deleteBtnVisiblity = false;

            this._oAppState.data.showGlobalAddButton = true;

            // views[1].visible = false;
            views[2].visible = false;

            model.setData(modelData);
            model.refresh(true);
            //   this.getRouter().navTo("ManageRoadmap");
            break;
          case "Project Gate Keeper":
            // this._oAppState.data.oRoleBasesVisiblity.areaResponsibleId = areaResponsibleId;
            this._oAppState.data.oRoleBasesVisiblity.showCreateTaskBtnVisiblity = false;
            this._oAppState.data.oRoleBasesVisiblity.areaLeaderSaveBtnVisiblity = true;
            this._oAppState.data.oRoleBasesVisiblity.isEditAreaVisible = false;
            this._oAppState.data.oRoleBasesVisiblity.manageActivityBtnVisiblity = false;
            this._oAppState.data.oRoleBasesVisiblity.deleteBtnVisiblity = false;
            this._oAppState.data.makeTaskMilestoneVisiblity.milestonevisiblity1 = true;

            this._oAppState.data.showGlobalAddButton = true;

            // views[1].visible = false;
            views[2].visible = false;
            views[4].visible = false;

            model.setData(modelData);
            model.refresh(true);
            //   this.getRouter().navTo("ManageRoadmap");
            break;
          case "Task Responsible":
            areaResponsibleId = "053ee50a-7309-4394-8f55-d43ea1e3adb2";
            this._oAppState.data.oRoleBasesVisiblity.areaResponsibleId =
              areaResponsibleId;
            this._oAppState.data.oRoleBasesVisiblity.showCreateMilestoneBtnVisiblity = false;
            this._oAppState.data.oRoleBasesVisiblity.areaLeaderSaveBtnVisiblity = false;
            this._oAppState.data.oRoleBasesVisiblity.isEditAreaVisible = false;
            this._oAppState.data.oRoleBasesVisiblity.saveBtnVisiblity = false;
            this._oAppState.data.makeTaskMilestoneVisiblity.milestonevisiblity1 = true;
            this._oAppState.data.oRoleBasesVisiblity.deleteBtnVisiblity = false;

            // views[1].visible = false;
            views[2].visible = false;

            model.setData(modelData);
            model.refresh(true);
            //   this.getRouter().navTo("ManageRoadmap");
            break;

          case "Activity Performer":
            // oRoleVisibility.portfolioVisiblity = true;
            // oRoleVisibility.roadmapVisiblity = true;
            // oRoleVisibility.kanbanVisiblity = true;

            this._oAppState.data.showGlobalAddButton = true;
            this._oAppState.data.makeTaskMilestoneVisiblity.milestonevisiblity1 = true;
            this._oAppState.data.oRoleBasesVisiblity.areaLeaderSaveBtnVisiblity = true;
            this._oAppState.data.oRoleBasesVisiblity.showMilestoneSave = true;

            model.setData(modelData);
            model.refresh(true);
            // this.getRouter().navTo("manage_projects");

            break;

          default:
            sap.m.MessageBox.warning("Unrecognized role.");
            return;
        }

        // Close the dialog if it exists
        if (this.oLoginDialog) {
          this.oLoginDialog.close();
        }
      },
    });
  }
);
