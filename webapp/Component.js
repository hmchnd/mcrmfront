sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "micro/crm/frontend/model/models",
    "./service/AppService",
    "./state/AppState",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/IllustrationPool",
	  "micro/crm/frontend/css/fioriMoment",
  ],
  (
    UIComponent,
    models,
    AppService,
    AppState,
    MessageBox,
    Fragment,
    MessageToast,
    IllustrationPool,
	  FioriMoment
  ) => {
    "use strict";

    return UIComponent.extend("micro.crm.frontend.Component", {
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
          models.createViewLayoutModel(),
          "projectLayoutView"
        );
        this.setModel(
          models.createViewLayoutModel(),
          "productLayoutView"
        );
        this.setModel(
          models.createLeadViewModel(),
          "productLayoutViewLeadView"
        );
        this.setModel(
          models.createViewLayoutModel(),
          "roadmapTemplateLayoutView"
        );
        this.setModel(
          models.createViewLayoutModel(),
          "manageRoadmapLayoutView"
        );
        this.setModel(models.createModel(), "oFiori");
        this.getModel("oFiori").setData(this._buildMomentsIcons());

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

      _buildMomentsIcons: function () {
        const tnt = "tnt";
        const oTntSet = {
          setFamily: tnt,
          setURI: sap.ui.require.toUrl("sap/tnt/themes/base/illustrations")
        };
        // register tnt illustration set
        const dialog = "Dialog";
        const sapIllus = "sapIllus";
        const services = "Services";
        const components = "Components";
        const spot = "Spot";
        const scene = "Scene";
        const ext = "ext";
        const faceID = "FaceID";
        IllustrationPool.registerIllustrationSet(oTntSet, false);
        return {
          noActivities: new FioriMoment(sapIllus, dialog, "NoActivities").getFioriMoments(),
          noTasks: new FioriMoment(sapIllus, dialog, "NoTasks").getFioriMoments(),
          noBookmarks: new FioriMoment(sapIllus, dialog, "NoSavedItems").getFioriMoments(),
          services: new FioriMoment(tnt, dialog, services).getFioriMoments(),
          sServices: new FioriMoment(tnt, spot, services).getFioriMoments(),
          results: new FioriMoment(tnt, scene, "Mission").getFioriMoments(),
          issues: new FioriMoment(sapIllus, dialog, "UnableToLoad-Alt2").getFioriMoments(),
          radar: new FioriMoment(tnt, dialog, "Radar").getFioriMoments(),
          external: new FioriMoment(tnt, dialog, "Company").getFioriMoments(),
          mission: new FioriMoment(tnt, dialog, "Mission").getFioriMoments(),
          systems: new FioriMoment(tnt, dialog, "Systems").getFioriMoments(),
          blocks: new FioriMoment(tnt, dialog, components).getFioriMoments(),
          sBlocks: new FioriMoment(tnt, spot, components).getFioriMoments(),
          lBlocks: new FioriMoment(tnt, scene, components).getFioriMoments(),
          teams: new FioriMoment(tnt, dialog, "Teams").getFioriMoments(),
          tools: new FioriMoment(tnt, dialog, "Tools").getFioriMoments(),
          flow: new FioriMoment(tnt, dialog, "ChartBPMNFlow").getFioriMoments(),
          user2: new FioriMoment(tnt, dialog, "User2").getFioriMoments(),
          balloon: new FioriMoment(sapIllus, spot, "SuccessCheckMark-Alt").getFioriMoments(),
          session: new FioriMoment(tnt, scene, "SessionExpiring").getFioriMoments(),
          lUser2: new FioriMoment(tnt, scene, "User2").getFioriMoments(),
          oCompany: new FioriMoment(tnt, scene, "Company").getFioriMoments(),
          tRobot: new FioriMoment(tnt, spot, faceID).getFioriMoments(),
          lRobot: new FioriMoment(tnt, scene, faceID).getFioriMoments(),
          mRobot: new FioriMoment(tnt, dialog, faceID).getFioriMoments(),
          mFingerprint: new FioriMoment(tnt, dialog, "Secrets").getFioriMoments(),
          oOrg: new FioriMoment(tnt, dialog, "ChartOrg").getFioriMoments(),
          noReport: new FioriMoment(tnt, scene, "NoFlows").getFioriMoments(),
          hi5: new FioriMoment(sapIllus, dialog, "SuccessHighFive").getFioriMoments(),
          extLink: new FioriMoment(tnt, spot, "ExternalLink").getFioriMoments(),
          document: new FioriMoment(sapIllus, dialog, "NoData").getFioriMoments(),
          analytics: new FioriMoment(tnt, dialog, "ChartBullet").getFioriMoments(),
          iamTrial: new FioriMoment(sapIllus, spot, "UnableToUpload").getFioriMoments(),
          helloNew: new FioriMoment(ext, ext, ext).getHello(),
          unauth: new FioriMoment(ext, ext, ext).getUnauth(),
          maintenance: new FioriMoment(ext, ext, ext).getMaintenance(),
          grafana: new FioriMoment(tnt, spot, "Grafana").getGrafanaIcon(),
          success: new FioriMoment(tnt, dialog, "Success").getFioriMoments(),
                  miniServices: new FioriMoment(tnt, scene, services).getFioriMoments(true),
                  miniSuccess: new FioriMoment(tnt, scene, "Success").getFioriMoments(true),
                  miniRadar: new FioriMoment(tnt, scene, "Radar").getFioriMoments(true),
                  miniTeams: new FioriMoment(tnt, scene, "Teams").getFioriMoments(true),
                  miniTools: new FioriMoment(tnt, scene, "Tools").getFioriMoments(true),
                  miniUser2: new FioriMoment(tnt, scene, "User2").getFioriMoments(true),
                  miniMRobot: new FioriMoment(tnt, scene, faceID).getFioriMoments(true),
                  miniMFingerprint: new FioriMoment(tnt, scene, "Secrets").getFioriMoments(true),
                  miniOOrg: new FioriMoment(tnt, scene, "ChartOrg").getFioriMoments(true),
                  miniHi5: new FioriMoment(sapIllus, dialog, "SuccessHighFive").getFioriMoments(true),
                  miniAnalytics: new FioriMoment(tnt, scene, "ChartBullet").getFioriMoments(true),
                  miniNoUsers: new FioriMoment(tnt, scene, "NoUsers").getFioriMoments(true)
        };
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