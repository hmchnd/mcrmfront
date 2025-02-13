sap.ui.define([
  "./BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/f/LayoutType",

], (Controller, JSONModel, LayoutType) => {
  "use strict";

  return Controller.extend("framsys.com.framsysfrontend.controller.RoadmapTemplate", {
    onInit() {
      this._loadXLSXLibrary()
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

      // oProjectDetails.planned_start = new Date(oProjectDetails.planned_start);
      // oProjectDetails.planned_finish = new Date(oProjectDetails.planned_finish);
      this.AppState.createNewFrameworkEntry(oFrameworkDetails);
    },
    onDeleteFramework: function () {

      let oFrameworkDetails = this.AppState.data.oSelectedFramework;
      this.AppState.deleteFrameworkEntry(oFrameworkDetails)
      var sLayout = LayoutType.OneColumn;
      this.getModel("roadmapTemplateLayoutView").setProperty("/layout", sLayout);

    },
    _loadXLSXLibrary: function () {
      var script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
      script.onload = function () {
          console.log("XLSX library loaded!");
      };
      document.head.appendChild(script);
  },
  onUploadChange: function (oEvent) {
    const file = oEvent.getParameter("files")[0];

    if (file && window.FileReader) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });

            // Assume the first sheet contains the data
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Convert Excel data to JSON
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // Initialize structures
            let areaStructure = {};
            let phaseStructure = {};

            jsonData.forEach(row => {
                let area = row["Areas"];
                let phase = row["Phases"];
                let task = row["Task"];
                let taskActivity = row["Task Activities"];

                // Process Areas
                if (area && task) {
                    if (!areaStructure[area]) {
                        areaStructure[area] = {};
                    }
                    if (!areaStructure[area][task]) {
                        areaStructure[area][task] = [];
                    }
                    if (taskActivity) {
                        areaStructure[area][task].push(taskActivity);
                    }
                }

                // Process Phases
                if (phase && task) {
                    if (!phaseStructure[phase]) {
                        phaseStructure[phase] = {};
                    }
                    if (!phaseStructure[phase][task]) {
                        phaseStructure[phase][task] = [];
                    }
                    if (taskActivity) {
                        phaseStructure[phase][task].push(taskActivity);
                    }
                }
            });

            // Convert structured data to the required format
            let formattedJson = {
                Area: Object.keys(areaStructure).map(area => ({
                    [area]: Object.keys(areaStructure[area]).map(task => ({
                        [task]: areaStructure[area][task]
                    }))
                })),
                Phase: Object.keys(phaseStructure).map(phase => ({
                    [phase]: Object.keys(phaseStructure[phase]).map(task => ({
                        [task]: phaseStructure[phase][task]
                    }))
                }))
            };

            // Stringify the JSON data
            let payload = { jsonData: JSON.stringify(formattedJson) };
           
            // Trigger the insertRoadmapData action
            try {
                const oModel = this.getView().getModel(); // Assuming your model is correctly configured
                 oModel.create("/insertRoadmapData", payload,{
            
                    success: function () {
                        sap.m.MessageToast.show("Data successfully inserted!");
                    },
                    error: function (err) {
                        sap.m.MessageToast.show("Error inserting data.");
                        console.error(err);
                    }
                });
            } catch (error) {
                console.error("Error in API call:", error);
            }
        };
       reader.readAsBinaryString(file);
    }
}

  });
});