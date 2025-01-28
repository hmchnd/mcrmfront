sap.ui.define([
  "./BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/f/LayoutType",

], (Controller, JSONModel, LayoutType) => {
  "use strict";

  return Controller.extend("framsys.com.framsysfrontend.controller.RoadmapTemplate", {
    onInit() {
      let createAreaData = [{
        "area": ""
      },
      ]
      let createArea = new JSONModel(createAreaData)
      this.getView().setModel(createArea, "createAreaModel")


      let editAreaData = [{
        "area": "Area1"

      },
      {
        "area": "Area2"

      }]
      let editArea = new JSONModel(editAreaData)
      this.getView().setModel(editArea, "editAreaModel")

      let createPhaseData = [{
        "phase": "phase1"
      },
      ]
      let createPhase = new JSONModel(createPhaseData)
      this.getView().setModel(createPhase, "createPhaseModel")


      let editPhaseData = [{
        "phase": "phase"

      }
      ]
      let editPhase = new JSONModel(editPhaseData)
      this.getView().setModel(editPhase, "editPhaseModel")

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.attachRouteMatched(this.onRouteMatched, this);

      this._editFragment = null;
      this._createFragment = null;
    },
    onRouteMatched: function (oEvent) {
      this.AppState = this.getOwnerComponent().getState("App");
      this.getView().setModel(this.AppState.getModel(), "AppState");
      this.AppState.getModel().setSizeLimit(999999);
      this.AppState.data.showGlobalAddButton = true;
      this.AppState.data.currentPage = "roadmapTemplate";
      let oGridListControl = this.byId("gridList1");
      this.AppState.getMyFrameworkList(oGridListControl);
    },
    onAfterRendering: function () {
      var sLayout = LayoutType.OneColumn;
      this.getModel("roadmapTemplateLayoutView").setProperty("/layout", sLayout);
    },
    onPress: function (oEvent) {
      let aaa = this.getView().getModel("AppState").getData().aFramework.Classes;
      debugger
      let oSelectedFrameworkObject = oEvent.getSource()?.getBindingContext("AppState")?.getObject() || {};
      this.AppState.data.oSelectedFramework = oSelectedFrameworkObject;
      var sLayout = LayoutType.TwoColumnsMidExpanded;
      this.getModel("roadmapTemplateLayoutView").setProperty("/layout", sLayout);
    },
    onCloseDetailPage: function () {
      var sLayout = LayoutType.OneColumn;
      this.getModel("roadmapTemplateLayoutView").setProperty("/layout", sLayout);
    },
    onStepActivated: function (oEvent) {
      const currentStep = oEvent.getParameter("step").getId();
      this.getView().getModel().setProperty("/currentStep", currentStep);
    },
    onEditCreateArea: function () {
      let editAreaModel = this.getView().getModel("editAreaModel");

      let data = editAreaModel.getData();

      data.push({ area: "" });

      editAreaModel.setData(data);

    }
    ,
    onEditCreatePhase: function () {
      let editPhaseModel = this.getView().getModel("editPhaseModel");

      let data = editPhaseModel.getData();

      data.push({ phase: "" });

      editPhaseModel.setData(data);
    }
    ,
    onCreateArea: function () {
      let createAreaModel = this.getView().getModel("createAreaModel");

      let data = createAreaModel.getData();

      data.push({ area: "" });

      createAreaModel.setData(data);
    }
    ,
    onCreatePhase: function () {
      let createPhaseModel = this.getView().getModel("createPhaseModel");

      let data = createPhaseModel.getData();

      data.push({ phase: "" });

      createPhaseModel.setData(data);
    },
    onDeleteCreateArea: function (oEvent) {
      let oBindingContext = oEvent.getSource().getBindingContext("createAreaModel");

      let createAreaModel = this.getView().getModel("createAreaModel");
      let data = createAreaModel.getData();

      let rowIndex = parseInt(oBindingContext.getPath().split("/")[1]);

      data.splice(rowIndex, 1);

      createAreaModel.setData(data);
    },
    onDeleteCreatePhase: function (oEvent) {
      let oBindingContext = oEvent.getSource().getBindingContext("createPhaseModel");

      let createPhaseModel = this.getView().getModel("createPhaseModel");
      let data = createPhaseModel.getData();

      let rowIndex = parseInt(oBindingContext.getPath().split("/")[1]);

      data.splice(rowIndex, 1);

      createPhaseModel.setData(data);

    },
    onDeleteEditArea: function (oEvent) {
      let oBindingContext = oEvent.getSource().getBindingContext("editAreaModel");

      let editAreaModel = this.getView().getModel("editAreaModel");
      let data = editAreaModel.getData();

      let rowIndex = parseInt(oBindingContext.getPath().split("/")[1]);

      data.splice(rowIndex, 1);

      editAreaModel.setData(data);
    },
    onDeleteEditPhase: function (oEvent) {
      let oBindingContext = oEvent.getSource().getBindingContext("editPhaseModel");

      let editPhaseModel = this.getView().getModel("editPhaseModel");
      let data = editPhaseModel.getData();

      let rowIndex = parseInt(oBindingContext.getPath().split("/")[1]);

      data.splice(rowIndex, 1);

      editPhaseModel.setData(data);
    }, onSaveFrameworkDetails: function () {
      debugger
      let oFrameworkDetails = this.AppState.data.oSelectedFramework;
      if(!oFrameworkDetails.ID){
        let area=[];
        let phases =[];
        let areatable=this.getView().byId("createTable");
        let areaItems = areatable.getItems();
        areaItems.forEach(function (oItem) {
          let name = oItem.getCells()[0].getValue();
          area.push({
              name:name,
              
          });
      });

      let phasetable=this.getView().byId("createTable");
      let phaseItems = phasetable.getItems();
      phaseItems.forEach(function (oItem) {
        let name = oItem.getCells()[0].getValue();
        phases.push({
            name:name,
            
        });
    });

        oFrameworkDetails.ProjectType=this.getView().byId("projectType").getSelectedItem().getText()
        oFrameworkDetails.IndustryType=this.getView().byId("industryType").getSelectedItem().getText()
        oFrameworkDetails.area=area;
        oFrameworkDetails.phase=phases;
      }

      // oProjectDetails.planned_start = new Date(oProjectDetails.planned_start);
      // oProjectDetails.planned_finish = new Date(oProjectDetails.planned_finish);
      this.AppState.createNewFrameworkEntry(oFrameworkDetails);
    },
    onDeleteFramework: function () {
      debugger
      let oFrameworkDetails = this.AppState.data.oSelectedFramework;
      this.AppState.deleteFrameworkEntry(oFrameworkDetails)
      var sLayout = LayoutType.OneColumn;
      this.getModel("roadmapTemplateLayoutView").setProperty("/layout", sLayout);
         
  },


  });
});