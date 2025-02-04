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
        "area": ""

      },
     ]
      let editArea = new JSONModel(editAreaData)
      this.getView().setModel(editArea, "editAreaModel")

      let createPhaseData = [{
        "phase": ""
      },
      ]
      let createPhase = new JSONModel(createPhaseData)
      this.getView().setModel(createPhase, "createPhaseModel")


      let editPhaseData = [{
        "phase": ""

      }
      ]
      let editPhase = new JSONModel(editPhaseData)
      this.getView().setModel(editPhase, "editPhaseModel")



      let task = [{
        "name": "",
        "desc": "",
        "area": "",
        "phase": "",

      }
      ]
      let tasks = new JSONModel(task)
      this.getView().setModel(tasks, "taskModel")

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("RoadmapTemplate").attachPatternMatched(this.onRouteMatched, this);

      this._editFragment = null;
      this._createFragment = null;
    },
    onRouteMatched: function (oEvent) {
      this.AppState = this.getOwnerComponent().getState("App");
      this.getView().setModel(this.AppState.getModel(), "AppState");
      this.AppState.getModel().setSizeLimit(999999);
      this.AppState.data.showGlobalAddButton = false;
      this.AppState.data.showBackToRoadmapButton = false;
      this.AppState.data.currentPage = "roadmapTemplate";
      let oGridListControl = this.byId("gridList1");
      this.AppState.getMyFrameworkList(oGridListControl);
      this.AppState.data.currentPageLabel="Manage Roadmap Template"
      this.AppState.getModel().refresh(true);
    },
    onAfterRendering: function () {
      var sLayout = LayoutType.OneColumn;
      this.getModel("roadmapTemplateLayoutView").setProperty("/layout", sLayout);
    },
    onPress: function (oEvent) {
      this.AppState.data.sidePanelOpen = false;
      let aaa = this.getView().getModel("AppState").getData().aFramework;
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
      debugger;
      
      let editAreaModel = this.AppState.data.oSelectedFramework.templateAreas;
  
          editAreaModel.results.push({ name: "" });
  
          this.getView().getModel("AppState").refresh(true);
      
  }
    ,
    onEditCreatePhase: function () {
      let editPhasesModel = this.AppState.data.oSelectedFramework.templatePhases;
  
      editPhasesModel.results.push({ name: "" });
  
          this.getView().getModel("AppState").refresh(true);
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
    onCreateTasks: function () {
      debugger
      let createTaskModel = this.getView().getModel("taskModel");

      let data = createTaskModel.getData();

      data.push({
        "name": "",
        "desc": "",
        "area": "",
        "phase": "",

      });

      createTaskModel.setData(data);
    },
    onDeleteCreateArea: function (oEvent) {
      let oBindingContext = oEvent.getSource().getBindingContext("AppState");

      let createAreaModel = this.getView().getModel("AppState");
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
        debugger
        let oRowContext = oEvent.getSource().getBindingContext("AppState");
        
        if (!oRowContext) {
            sap.m.MessageToast.show("Unable to get row context for deletion.");
            return;
        }
    
        let oModel = oRowContext.getModel();
        let path = oRowContext.getPath(); 
        let rowIndex = parseInt(path.split("/").pop());
    
        let templateAreas = this.AppState.data.oSelectedFramework.templateAreas.results;
    
        if (templateAreas && rowIndex >= 0) {
            templateAreas.splice(rowIndex, 1); 
            oModel.refresh(true); 
            sap.m.MessageToast.show("Row deleted successfully.");
        }
    },
    onDeleteEditPhase: function (oEvent) {
      debugger
      let oRowContext = oEvent.getSource().getBindingContext("AppState");
      
      if (!oRowContext) {
          sap.m.MessageToast.show("Unable to get row context for deletion.");
          return;
      }
  
      let oModel = oRowContext.getModel();
      let path = oRowContext.getPath(); 
      let rowIndex = parseInt(path.split("/").pop());
  
      let templateAreas = this.AppState.data.oSelectedFramework.templatePhases.results;
  
      if (templateAreas && rowIndex >= 0) {
          templateAreas.splice(rowIndex, 1); 
          oModel.refresh(true); 
          sap.m.MessageToast.show("Row deleted successfully.");
      }
    }, onSaveFrameworkDetails: function () {
      debugger
      let oFrameworkDetails = this.AppState.data.oSelectedFramework;
      if (!oFrameworkDetails.ID) {
        let area = [];
        let phases = [];
        let templateTasks = [];
        let areatable = this.getView().byId("createTable");
        let areaItems = areatable.getItems();
        areaItems.forEach(function (oItem) {
          let name = oItem.getCells()[0].getValue();
          area.push({
            name: name,

          });
        });

        let phasetable = this.getView().byId("phasesTable");
        let phaseItems = phasetable.getItems();
        phaseItems.forEach(function (oItem) {
          let name = oItem.getCells()[0].getValue();
          phases.push({
            name: name,

          });
        });


        let tasktable = this.getView().byId("ManageTaskTable");
        let taskItems = tasktable.getItems();
        taskItems.forEach(function (oItem) {
          let name = oItem.getCells()[0].getValue();
          let desc = oItem.getCells()[1].getValue();
          let area = oItem.getCells()[2].getValue();
          let phase = oItem.getCells()[3].getValue();
          templateTasks.push({
            name: name,
            description: desc,
            // area: area,
            // phase: phase,

          });
        });

        // oFrameworkDetails.ProjectType = this.getView().byId("projectType").getSelectedItem().getText()
        // oFrameworkDetails.IndustryType = this.getView().byId("industryType").getSelectedItem().getText()
        oFrameworkDetails.area = area;
        oFrameworkDetails.phase = phases;
        oFrameworkDetails.task = templateTasks;
      }
debugger
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