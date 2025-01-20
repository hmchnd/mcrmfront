sap.ui.define(
    [
      "./BaseController",
      "sap/ui/model/json/JSONModel",
      "sap/ui/core/dnd/DragInfo",
      "sap/f/dnd/GridDropInfo",
      "sap/ui/core/library",
      "sap/ui/core/Fragment",
    ],
    (Controller, JSONModel, DragInfo, GridDropInfo, coreLibrary, Fragment) => {
      "use strict";
      // Shortcuts for drag-and-drop constants
      var DropPosition = coreLibrary.dnd.DropPosition;
      var DropLayout = coreLibrary.dnd.DropLayout;
  
      return Controller.extend(
        "framsys.com.framsysfrontend.controller.ManageRoadmap3",
        {
          onInit() {
            this.initData();
            this.attachDragAndDrop();
          },
          initData: function () {
            // Initialize JSON Model
            var oModel = new JSONModel({
              grid2: [
                {
                  title:
                    "1. RISE with SAP Adoption Framework and Entitlement Review",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/soft-yellow-gradient-background_558873-52947.jpg" // Yellow
                },
              ],
              grid3: [
                {
                  title: "1. Getting Started and On-boarding",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://www.colorcombos.com/images/colors/FFCCCB.png" // Red
                },
                {
                  title: "2. RISE with SAP Onboarding Workshops",
                  percentageValue: 50,
                  deadline: "2025-01-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/green-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-67222.jpg?semt=ais_hybrid" // Green
                },
                {
                  title: "3. Project Initiation Standard & Kick-off",
                  percentageValue: 10,
                  deadline: "2025-01-20",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://www.colorcombos.com/images/colors/FFCCCB.png"
                },
              ],
              grid4: [
                {
                  title: "1. Realise & Sprint Planning",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/green-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-67222.jpg?semt=ais_hybrid"
                
                },
              ],
              grid5: [
                {
                  title: "1. Execution / Monitoring of Project",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/soft-yellow-gradient-background_558873-52947.jpg"
                },
                {
                  title: "2. Sprint Initiation",
                  percentageValue: 50,
                  deadline: "2025-01-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/green-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-67222.jpg?semt=ais_hybrid"
                },
                {
                  title: "3. Sprint Closing",
                  percentageValue: 10,
                  deadline: "2025-01-20",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://www.colorcombos.com/images/colors/FFCCCB.png"
                },
              ],
              grid6: [],
              grid7: [
                {
                  title: "1. Governance Model",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/green-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-67222.jpg?semt=ais_hybrid"
                },
              ],
              grid8: [
                {
                  title: "1. Strategic Planing",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/soft-yellow-gradient-background_558873-52947.jpg"
                },
                {
                  title: "2. Conversion Readiness Assesment",
                  percentageValue: 50,
                  deadline: "2025-01-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://www.colorcombos.com/images/colors/FFCCCB.png"
                },
              ],
              grid9: [
                {
                  title: "1. Initial system Access and SAP Cloud ALM",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/soft-yellow-gradient-background_558873-52947.jpg"
                },
                {
                  title: "2. Implemntation Tool Access",
                  percentageValue: 50,
                  deadline: "2025-01-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://www.colorcombos.com/images/colors/FFCCCB.png"
                },
                {
                  title: "3. Transition Planning & Prepration",
                  percentageValue: 50,
                  deadline: "2025-01-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/soft-yellow-gradient-background_558873-52947.jpg"
                },
              ],
              grid10: [
                {
                  title: "1. Sizing Validation",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/green-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-67222.jpg?semt=ais_hybrid"
                },
              ],
              grid11: [
                {
                  title: "1. SAP Buisness Network Release Requet",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://www.colorcombos.com/images/colors/FFCCCB.png"
                },
                {
                  title: "2. Quality System Access and Setup",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/green-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-67222.jpg?semt=ais_hybrid"
                },
                {
                  title: "3. Production System Initial access",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/soft-yellow-gradient-background_558873-52947.jpg"
                },
              ],
              grid12: [
                {
                  title: "1. System Go Live",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/green-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-67222.jpg?semt=ais_hybrid"
                },
              ],
              grid13: [
                {
                  title: "1. Identify Innovation & Growth Opprotunity",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/green-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-67222.jpg?semt=ais_hybrid"
                },
                {
                  title: "1. Ongoing Operation",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/soft-yellow-gradient-background_558873-52947.jpg"
                },
              ],
              grid14: [
                {
                  title: "1. Discovery Assessment",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://www.colorcombos.com/images/colors/FFCCCB.png"
                },
                {
                  title: "2. Application Value and Scoping",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/green-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-67222.jpg?semt=ais_hybrid"
                },
                {
                  title: "3. Coversion Readiness Assessment",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/soft-yellow-gradient-background_558873-52947.jpg"
                },
              ],
              grid15: [
                {
                  title: "1. Transition Planning & Preparation",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://www.colorcombos.com/images/colors/FFCCCB.png"
                },
                {
                  title: "2. Business Driven Configuration Assessment",
                  percentageValue: 50,
                  deadline: "2025-01-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/soft-yellow-gradient-background_558873-52947.jpg"
                },
                {
                  title:
                    "3. Fit to Standard Analysis Preparation & System Preparation",
                  percentageValue: 10,
                  deadline: "2025-01-20",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/green-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-67222.jpg?semt=ais_hybrid"
                },
                {
                  title: "4. User Experience Strategy Workshop",
                  percentageValue: 10,
                  deadline: "2025-01-20",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://www.colorcombos.com/images/colors/FFCCCB.png"
                },
              ],
              grid16: [
                {
                  title: "1. Fit-to-Standard",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/soft-yellow-gradient-background_558873-52947.jpg"
                },
  
                {
                  title: "2. Business Process Performance Planning & Design",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/green-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-67222.jpg?semt=ais_hybrid"
                },
  
                {
                  title: "3. Design Workshops and Documentation",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/green-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-67222.jpg?semt=ais_hybrid"
                },
  
                {
                  title: "4. User Interface Design",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/soft-yellow-gradient-background_558873-52947.jpg"
                },
  
                {
                  title: "5. User Access and Security planning and Design",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://www.colorcombos.com/images/colors/FFCCCB.png"
                },
              ],
  
              grid17: [
                {
                  title: "1. Solution Configuration",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/green-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-67222.jpg?semt=ais_hybrid"
                },
                {
                  title: "2. User Access and Security Implementation",
                  percentageValue: 50,
                  deadline: "2025-01-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/soft-yellow-gradient-background_558873-52947.jpg"
                },
                {
                  title: "3. Output Management",
                  percentageValue: 10,
                  deadline: "2025-01-20",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://www.colorcombos.com/images/colors/FFCCCB.png"
                },
              ],
              grid18: [],
              grid19: [
                {
                  title: "1. Identity Innovation and Growth Opportunities",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/soft-yellow-gradient-background_558873-52947.jpg"
                },
              ],
              grid20: [],
              grid21: [
                {
                  title: "1. Prepare Integration Setup",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://www.colorcombos.com/images/colors/FFCCCB.png"
                },
              ],
              grid22: [
                {
                  title: "1. Integration Planning & Design",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/green-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-67222.jpg?semt=ais_hybrid"
                },
                {
                  title: "1. AI Planning & Design",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://www.colorcombos.com/images/colors/FFCCCB.png"
                },
                {
                  title: "1. AI Setup",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/soft-yellow-gradient-background_558873-52947.jpg"
                },
              ],
              grid23: [
                {
                  title: "1. Ai Integration Setup in Q",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/green-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-67222.jpg?semt=ais_hybrid"
                },
                {
                  title: "2. Ai Integration Setup in P",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/soft-yellow-gradient-background_558873-52947.jpg"
                },
              ],
              grid24: [],
              grid25: [
                {
                  title: "1. Ongoing Operation",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://www.colorcombos.com/images/colors/FFCCCB.png"
                },
              ],
              grid26: [],
              grid27: [],
              grid28: [
                {
                  title: "1. Test Planning",
                  percentageValue: 40,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/green-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-67222.jpg?semt=ais_hybrid"
                },
              ],
  
              grid29: [
                {
                  title: "1. Test Preparation",
                  percentageValue: 20,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/soft-yellow-gradient-background_558873-52947.jpg"
                },
                {
                  title: "2. Test Execution",
                  percentageValue: 10,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://www.colorcombos.com/images/colors/FFCCCB.png"
                },
              ],
              grid30: [
                {
                  title: "1. Dress Rehearsal",
                  percentageValue: 30,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/green-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-67222.jpg?semt=ais_hybrid"
                },
              ],
              grid31: [],
              grid32: [],
              grid33: [
                {
                  title: "1. Approach And Plan",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://www.colorcombos.com/images/colors/FFCCCB.png"
                },
              ],
              grid34: [
                {
                  title: "1. Data Load preapration",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/green-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-67222.jpg?semt=ais_hybrid"
                },
              ],
              grid35: [
                {
                  title: "1. Data Migration(Development)",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/soft-yellow-gradient-background_558873-52947.jpg"
                },
                {
                  title: "2.  Data Migration(Test)",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://www.colorcombos.com/images/colors/FFCCCB.png"
                },
                {
                  title: "3.  Cut-over Prepration",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/green-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-67222.jpg?semt=ais_hybrid"
                },
              ],
              grid36: [
                {
                  title: "1. Dress Rehersal",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://www.colorcombos.com/images/colors/FFCCCB.png"
                },
                {
                  title: "2.  Production Cutover",
                  percentageValue: 80,
                  deadline: "2025-05-10",
                  rows: 3,
                  columns: 3,
                  bgColor:"https://img.freepik.com/premium-photo/soft-yellow-gradient-background_558873-52947.jpg"
                },
              ],
              grid37: [],
            });
            this.getView().setModel(oModel);
          },
          attachDragAndDrop: function () {
            var aGridIds = [
              "grid2",
              "grid3",
              "grid4",
              "grid5",
              "grid6",
              "grid7",
              "grid8",
              "grid9",
              "grid10",
              "grid11",
              "grid12",
              "grid13",
              "grid14",
              "grid15",
              "grid16",
              "grid17",
              "grid18",
              "grid19",
              "grid20",
              "grid21",
              "grid22",
              "grid23",
              "grid24",
              "grid25",
              "grid26",
              "grid27",
              "grid28",
              "grid29",
              "grid30",
              "grid31",
              "grid32",
              "grid33",
              "grid34",
              "grid35",
              "grid36",
              "grid37",
            ];
            var oView = this.getView();
  
            aGridIds.forEach(
              function (sGridId) {
                var oGrid = oView.byId(sGridId);
  
                // Enable dragging
                oGrid.addDragDropConfig(
                  new DragInfo({
                    sourceAggregation: "items",
                  })
                );
  
                // Enable dropping
                oGrid.addDragDropConfig(
                  new GridDropInfo({
                    targetAggregation: "items",
                    dropPosition: DropPosition.Between,
                    dropLayout: DropLayout.Horizontal,
                    dropIndicatorSize: this.onDropIndicatorSize.bind(this),
                    drop: this.onDrop.bind(this),
                  })
                );
              }.bind(this)
            );
          },
          onDropIndicatorSize: function (oDraggedControl) {
            var oBindingContext = oDraggedControl.getBindingContext(),
              oData = oBindingContext
                .getModel()
                .getProperty(oBindingContext.getPath());
  
            return {
              rows: oData.rows,
              columns: oData.columns,
            };
          },
  
          onDrop: function (oInfo) {
            var oDragged = oInfo.getParameter("draggedControl"),
              oDropped = oInfo.getParameter("droppedControl"),
              sInsertPosition = oInfo.getParameter("dropPosition"),
              oDragContainer = oDragged.getParent(),
              oDropContainer = oInfo.getSource().getParent(),
              oDragModel = oDragContainer.getModel(),
              oDropModel = oDropContainer.getModel(),
              sDragPath = oDragged.getBindingContext().getPath(),
              oDraggedData = oDragModel.getProperty(sDragPath);
  
            // Remove dragged item from its original container
            var aDragData = oDragModel.getProperty(
              oDragContainer.getBinding("items").getPath()
            );
            aDragData.splice(oDragContainer.indexOfItem(oDragged), 1);
  
            // Handle the case where the drop target is empty
            var aDropData = oDropModel.getProperty(
              oDropContainer.getBinding("items").getPath()
            );
            if (oDropped) {
              var iDropIndex = oDropContainer.indexOfItem(oDropped);
              if (sInsertPosition === "After") {
                iDropIndex++;
              }
              aDropData.splice(iDropIndex, 0, oDraggedData);
            } else {
              // If no tile exists in the drop container, simply add the dragged tile
              aDropData.push(oDraggedData);
            }
  
            // Update the models to reflect the changes
            oDragModel.refresh();
            oDropModel.refresh();
          },
          onCancelTask: function () {
            this.oAddTaskDialog.close();
          },
          onAddNewTask: function () {
            if (!this.oAddTaskDialog) {
              Fragment.load({
                id: this.getView().getId(),
                name: "framsys.com.framsysfrontend.fragment.AddTaskDialog",
                controller: this,
              }).then((oDialog) => {
                this.oAddTaskDialog = oDialog;
                this.getView().addDependent(this.oAddTaskDialog);
                oDialog.open();
              });
            } else {
              this.oAddTaskDialog.open();
            }
          },
          onCardPress: function () {
            this.getRouter().navTo("ManageTask");
          },
          onCreateNewTask: function () {
            // Get the model and data
            const oModel = this.getView().getModel();
            const oData = oModel.getData();
  
            // Retrieve values from dialog input fields
            const oDialog = this.byId("taskDialog"); // Ensure dialog ID matches
            const taskTitle = this.byId("idinput1").getValue(); // Task Title
  
            // Calculate the new task number based on the current number of entries in grid2
            const newTaskNumber = oData.grid2.length + 1;
  
            // Create the new task object with a dynamically generated title
            const newTask = {
              title: `${newTaskNumber}. ${taskTitle}`, // Add the number and a space before the title
              description: this.byId("idinput2").getValue(), // Task Description
              project: this.byId("idinput3").getValue(), // Project value
              phase: this.byId("idinput4").getValue(), // Project value
              area: this.byId("idinput5").getValue(), // Project value
  
              percentageValue: 0,
              deadline: "2025-02-10", // Default deadline
              rows: 3, // Default rows
              columns: 3, // Default columns
              bgColor:"https://www.colorcombos.com/images/colors/FFCCCB.png"
            };
  
            // Push the new task to grid2 array
            oData.grid2.push(newTask);
  
            // Update the model
            oModel.refresh();
  
            // Close the dialog
            this.oAddTaskDialog.close();
  
            // Show success message
            sap.m.MessageToast.show("New task added successfully!");
          },
          onRoadmap2Press:function(){
            this.getOwnerComponent().getRouter().navTo("ManageRoadmap2")
          },
          onRoadmap3Press:function(){
            this.getOwnerComponent().getRouter().navTo("ManageRoadmap3")
          }
  
  
        }
      );
    }
  );