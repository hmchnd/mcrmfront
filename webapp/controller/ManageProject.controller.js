sap.ui.define(
  [
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/f/LayoutType",
    "sap/m/MessageBox",
  ],
  (Controller, JSONModel, LayoutType, MessageBox) => {
    "use strict";

    return Controller.extend(
      "framsys.com.framsysfrontend.controller.ManageProject",
      {
        onInit() {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter
            .getRoute("manage_projects")
            .attachPatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
          this.AppState = this.getOwnerComponent().getState("App");
          this.getView().setModel(this.AppState.getModel(), "AppState");
          debugger;
          // let oComboBox = this.byId("idProjectManager");
          // let oBinding = oComboBox.getBinding("items");

          // let sLoginRole = this.AppState.data.oRoleBasesVisiblity.sLoginPerson;
          // let oFilter = new sap.ui.model.Filter("role", sap.ui.model.FilterOperator.EQ, sLoginRole);

          // oBinding.filter([oFilter]);

          this.AppState.getModel().setSizeLimit(999999);
          // this.AppState.data.showGlobalAddButton = true;
          this.AppState.data.showBackToRoadmapButton = false;
          this.AppState.setViewController(this);
          this.AppState.data.currentPage = "PROJECT";
          let oGridListControl = this.byId("gridList");
          if (
            this.AppState.data.oRoleBasesVisiblity.sLoginPerson ==
            "Enterprise Portfolio Administrator"
          ) {
            this.AppState.data.showGlobalAddButton = true;
            this.AppState.data.oRoleBasesVisiblity.showRoadmap = true;
          }
          if (
            this.AppState.data.oRoleBasesVisiblity.sLoginPerson ==
            "Project Area Leader"
          ) {
            this.AppState.data.showGlobalAddButton = false;
          }
          if (
            this.AppState.data.oRoleBasesVisiblity.sLoginPerson ==
            "Project Gate Keeper"
          ) {
            this.AppState.data.showGlobalAddButton = false;
          }
          this.AppState.data.oGridListControl = oGridListControl;
          this.AppState.getMyProjectsList(oGridListControl);
          this.AppState.data.currentPageLabel = "Manage Projects";
          this.AppState.getModel().refresh(true);
        },
        onAfterRendering: function () {
          var sLayout = LayoutType.OneColumn;
          this.getModel("projectLayoutView").setProperty("/layout", sLayout);
        },
        resetColumnLayout: function () {
          var sLayout = LayoutType.OneColumn;
          this.getModel("projectLayoutView").setProperty("/layout", sLayout);
        },
        onPress: function (oEvent) {
          debugger;

          this.AppState.data.sidePanelOpen = false;
          let oSelectedProjectObject =
            oEvent.getSource()?.getBindingContext("AppState")?.getObject() ||
            {};

          this.AppState.data.oSelectedProject = oSelectedProjectObject;

          let sRoadmapID = oSelectedProjectObject.roadmapTemplate_ID;
          if (sRoadmapID) {
            this.AppState.getProjectRoadmapById(sRoadmapID);
          }
          if (!sRoadmapID) {
            this.getView().byId("manageRoadmap").setVisible(false);
          }
          let sLoginPerson = this.AppState.data.oRoleBasesVisiblity.sLoginPerson;
          this.AppState.fieldAccessToAdministrator(sLoginPerson);

          var sLayout = LayoutType.TwoColumnsBeginExpanded;
          this.getModel("projectLayoutView").setProperty("/layout", sLayout);
        },
        onCloseDetailPage: function () {
          var sLayout = LayoutType.OneColumn;
          this.getModel("projectLayoutView").setProperty("/layout", sLayout);
        },
        onSaveProjectDetails: function () {
          if (!this._validateProjectForm()) {
            return;
          }
          let oProjectDetails = this.AppState.data.oSelectedProject;
          this.AppState.createNewProjectEntry(oProjectDetails);
        },
        onManageRoadmap: function (oEvent) {
          let oProjectDetails = this.AppState.data.oSelectedProject;
          this.getOwnerComponent().getRouter().navTo("ManageRoadmap", {
            sRoadmapID: oProjectDetails.roadmapTemplate_ID,
            sProjectName: oProjectDetails.name,
          });
          this.AppState.data.sSelectedProjectRoadmapID =
            oProjectDetails.roadmapTemplate_ID;
        },
        onDeleteProject: function () {
          var that = this;
          MessageBox.warning("Are you sure you want to delete this Project?", {
            actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
            onClose: function (sAction) {
              if (sAction === MessageBox.Action.OK) {
                let oProjectDetails = that.AppState.data.oSelectedProject;
                if (oProjectDetails)
                  that.AppState.deleteProjectEntry(oProjectDetails);
                var sLayout = LayoutType.OneColumn;
                that
                  .getModel("projectLayoutView")
                  .setProperty("/layout", sLayout);
              }
            },
          });
        },
        _validateProjectForm: function () {
          var bValid = true;
          var oView = this.getView();
          var aInputs = [
            oView.byId("pname"),
            oView.byId("pstart"),
            oView.byId("pend"),
            oView.byId("idProjectManager"),
          ];

          // Get both roadmapTemplate fields
          // var oRoadmapTemplate1 = oView.byId("roadmapTemplate");
          // var oRoadmapTemplate2 = oView.byId("roadmapTemplate1");

          // Add only the visible roadmapTemplate field for validation
          // if (oRoadmapTemplate1 && oRoadmapTemplate1.getVisible()) {
          //     aInputs.push(oRoadmapTemplate1);
          // } else if (oRoadmapTemplate2 && oRoadmapTemplate2.getVisible()) {
          //     aInputs.push(oRoadmapTemplate2);
          // }

          aInputs.forEach(function (oInput) {
            if (!oInput.getValue()) {
              oInput.setValueState("Error");
              oInput.setValueStateText("This field is mandatory");
              bValid = false;
            } else {
              oInput.setValueState("None");
            }
          });

          return bValid;
        },

        calculateDeltaInMonths: function (aParts, aParts2) {
          // Extract plannedStart and forecastStart from parts
          let plannedStart = aParts;
          let forecastStart = aParts2;

          if (!plannedStart || !forecastStart) {
            return ""; // Handle missing values gracefully
          }

          let plannedDate = new Date(plannedStart);
          let forecastDate = new Date(forecastStart);

          if (isNaN(plannedDate) || isNaN(forecastDate)) {
            return ""; // Invalid date handling
          }

          // Calculate difference in months
          let yearsDiff =
            forecastDate.getFullYear() - plannedDate.getFullYear();
          let monthsDiff = forecastDate.getMonth() - plannedDate.getMonth();
          let totalMonths = yearsDiff * 12 + monthsDiff;

          return totalMonths + " months";
        },
        onBudgetChange: function (oEvent) {
          var oInput = oEvent.getSource();
          var sValue = oInput.getValue();

          // Remove any non-numeric characters except digits and decimal separator
          var cleanValue = sValue.replace(/[^0-9]/g, "");

          // Convert to number
          var fValue = parseFloat(cleanValue);

          if (isNaN(fValue)) {
            oInput.setValueStateText("Please enter a valid number.");
            oInput.setValueState("Error");
          } else {
            oInput.setValueState("None");

            // Format the value and update input field
            var formattedValue = this.formatCurrency(fValue);
            oInput.setValue(formattedValue);
          }
        }



        ,

        //   currencyFormatter: function (value) {
        //     debugger
        //     if (isNaN(value)) {
        //         return "";
        //     }

        //     // Use Intl.NumberFormat for European-style formatting
        //     return new Intl.NumberFormat('de-DE', {
        //         minimumFractionDigits: 2,
        //         maximumFractionDigits: 2
        //     }).format(value);
        // },

        onChangeDate: function (oEvent) {
          let oInput = oEvent.getSource(); // Get the input field
          let uservalue = oInput.getValue(); // Format: MM/DD/YY
          let startDate = this.AppState.data.oSelectedProject.planned_start;
          let userDate = new Date(uservalue);
          let systemStartDate = new Date(startDate);

          if (userDate < systemStartDate) {
            oInput.setValueState("Error");
            oInput.setValueStateText(
              `Enter date should not be less than ${startDate}`
            );
            oInput.setValue("");
          } else {
            oInput.setValueState("None");
            oInput.setValueStateText("");
          }
        },
        formatEmployeeName: function (sName, sRole) {
          debugger;
          var sLoginRole = this.AppState.data.oRoleBasesVisiblity.sLoginPerson;

          if (sRole === sLoginRole) {
            return sName + " (You)";
          } else {
            return sName; // Default case
          }
        },
        formatPercentage: function (value) {
          if (value !== undefined && value !== null) {
            return Math.round(value)
          }
        },
        formatCurrency: function (value) {
          debugger
          if (isNaN(value)) {
            return "";
          }

          // Use Intl.NumberFormat for European-style formatting
          return new Intl.NumberFormat('de-DE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(value);
        },
      }
    );
  }
);
