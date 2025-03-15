sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "micro/crm/frontend/model/models",
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
        }, 2500);
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
      
        let oComboBox = sap.ui.core.Fragment.byId(
          this.getId() + "LoginDialog",
          "loginComboBox"
        );
        let oComboBoxArea = sap.ui.core.Fragment.byId(
          this.getId() + "LoginDialog",
          "projectAreaComboBox"
        );

        if (!oComboBox || !oComboBox.getSelectedItem()) {
          sap.m.MessageBox.error("Please select a valid login role.");
          return;
        }

        let loginPerson = oComboBox.getSelectedItem().getText();

        let areaResponsibleId = null;
        if (
          loginPerson === "Project Area Leader" ||
          loginPerson === "Task Responsible" ||
          loginPerson === "Activity Performer"
        ) {
          if (!oComboBoxArea || !oComboBoxArea.getSelectedItem()) {
            sap.m.MessageBox.error("Please select a valid project area.");
            return;
          }
          areaResponsibleId = oComboBoxArea.getSelectedItem().getKey();
        }

        let oRoleVisibility = this._oAppState.data.oRoleBasesVisiblity;
        oRoleVisibility.sLoginPerson = loginPerson;
        let model = this.getModel("sideContentModel");
        let modelData = model.getData();
        let views = modelData.navigation;

        switch (loginPerson) {
          // 0-dashboard
          // 1-portfolio
          // 2-roadmapTemplateViewLayoutModel
          // 3-manageRoadmap
          // 4-kanban
          case "Enterprise Portfolio Administrator":           
            

            break;
          case "Project Manager":           
            
            this._oAppState.data.oRoleBasesVisiblity.showCreateMilestoneBtnVisiblity = false;          
            break;

          case "Project Area Leader":
            this._oAppState.data.oRoleBasesVisiblity.areaResponsibleId =
              areaResponsibleId;
            this._oAppState.data.oRoleBasesVisiblity.showCreateMilestoneBtnVisiblity = false;
            this._oAppState.data.oRoleBasesVisiblity.isEditAreaVisible = false;  
            

            views[2].visible = false;

            model.setData(modelData);
            model.refresh(true);
            break;
          case "Project Gate Keeper":
            this._oAppState.data.oRoleBasesVisiblity.showCreateTaskBtnVisiblity = false;
            this._oAppState.data.oRoleBasesVisiblity.isEditAreaVisible = false;  
            

            views[2].visible = false;

            model.setData(modelData);
            model.refresh(true);
            break;
          case "Task Responsible":
            this._oAppState.data.oRoleBasesVisiblity.areaResponsibleId =
              areaResponsibleId;
            this._oAppState.data.oRoleBasesVisiblity.showCreateMilestoneBtnVisiblity = false;
            this._oAppState.data.oRoleBasesVisiblity.isEditAreaVisible = false;
            this._oAppState.data.taskTileVisible = true;
            this._oAppState.data.activityTileVisible = true;
            


            views[2].visible = false;

            model.setData(modelData);
            model.refresh(true);
            break;

          case "Activity Performer":
            this._oAppState.data.oRoleBasesVisiblity.areaResponsibleId =
              areaResponsibleId;
            this._oAppState.data.oRoleBasesVisiblity.showCreateMilestoneBtnVisiblity = false;
            this._oAppState.data.oRoleBasesVisiblity.isEditAreaVisible = false;
            this._oAppState.data.taskTileVisible = true;
            this._oAppState.data.activityTileVisible = true;
            


            // views[1].visible = false;
            views[2].visible = false;

            model.setData(modelData);
            model.refresh(true);
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
      onLoginRoleChange: function (oEvent) {
        let oComboBox = sap.ui.core.Fragment.byId(
          this.getId() + "LoginDialog",
          "loginComboBox"
        );
        let sSelectedRole = oComboBox?.getSelectedItem()?.getText();
        let oProjectAreaLabel = sap.ui.core.Fragment.byId(
          this.getId() + "LoginDialog",
          "projectAreaLabel"
        );
        let oProjectAreaComboBox = sap.ui.core.Fragment.byId(
          this.getId() + "LoginDialog",
          "projectAreaComboBox"
        );

        if (oProjectAreaLabel && oProjectAreaComboBox) {
          let bVisible =
            sSelectedRole === "Project Area Leader" ||
            sSelectedRole === "Task Responsible" ||
            sSelectedRole === "Activity Performer";
          oProjectAreaLabel.setVisible(bVisible);
          oProjectAreaComboBox.setVisible(bVisible);
        }
      },
    });
  }
);