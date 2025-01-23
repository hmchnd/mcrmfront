
sap.ui.define([
	"../model/BaseObject",
	"../model/Project",
	"sap/m/MessageBox",
], function (BaseObject,Project,MessageBox) {
	"use strict";
	var AppState = BaseObject.extend("framsys.com.framsysfrontend.state.AppState", {
		/**
		 * ----------------------------------------------
		 * State constructor/destuctor functions.
		 * ----------------------------------------------
		 */

		/** 
		 * Constructor: Initializing State.
		 * @param oService
		 * @param oResourceBundle
		 */
		constructor: function (oService, oResourceBundle) {
			var that = this;
			that.AppService = oService; // OData service.
			that.BusyCounter = 0; // Busy indicator counter.
			that.ResourceBundle = oResourceBundle; // Text Resources
			that.ViewController = null; // View controller instance.

			this.data = {
				aProjects: [],
				oSelectedProject:{},
				showGlobalAddButton:false,
				currentPage:"",
				currentPageLabel:"",
				dummyLineChartJson:{
					"description": "Project KPI",
					"threshold": 50,
					"leftTopLabel": "120 M",
					"rightTopLabel": "140 M",
					"leftBottomLabel": "Sept 2016",
					"rightBottomLabel": "Oct 2016",
					"showPoints": true,
					"lines": [
					  {
						"points": [
						  {"x": 0, "y": 50},
						  {"x": 8, "y": 68},
						  {"x": 20, "y": 25},
						  {"x": 30, "y": 45},
						  {"x": 40, "y": 67},
						  {"x": 100, "y": 88}
						]
					  },
					  {
						"points": [
						  {"x": 2, "y": 55},
						  {"x": 8, "y": 40},
						  {"x": 15, "y": 20},
						  {"x": 30, "y": 75},
						  {"x": 40, "y": 30},
						  {"x": 100, "y": 50}
						]
					  }
					]
				  }
			};

			// Initialize base object.
			BaseObject.call(that, {
				isState: true
			});
		},
		setViewController: function (oViewController) {
			this.ViewController = oViewController;
		},
		/** 
		 * Returns access to i18n text resources.
		 * @returns ... Resource Bundle object.
		 */
		getTextResources: function () {
			return this.ResourceBundle;
		},
		getMyProjectsList:function(oGridListControl){
			let aPromises = [];
			aPromises.push(this.AppService.getProjects());
			let that = this;
			oGridListControl.setBusy(true);
		Promise.all(aPromises).then(function (result) {
			let aProjectsList = result[0]?.data?.results || [];
			aProjectsList= aProjectsList.map(function(item){
				return new Project(item);
			});
			that.data.aProjects = aProjectsList;
			oGridListControl.setBusy(false);
		})
	},
	createNewProjectEntry:function(oProject){

	 if(oProject.ID){
		delete oProject.framework;
		delete oProject.fore_act_start;
		delete oProject.fore_act_finish;
		delete oProject.pct_complete;
		oProject.framework_ID = '215eaa61-ade1-48d2-a712-ba8dbee7a02d';
		this.AppService.updateProject(oProject).then(function(result){
			MessageBox.success(`Project Details Updated!`)
		 })

		}else{
			oProject.framework_ID = '215eaa61-ade1-48d2-a712-ba8dbee7a02d';
			this.AppService.saveProject(oProject).then(function(result){
			   MessageBox.success(`Project Details Saved!`)
			})
		}


   


	},
	getMyFrameworkList:function(oGridListControl){
		let aPromises = [];
		aPromises.push(this.AppService.getFramework());
		let that = this;
		oGridListControl.setBusy(true);
	Promise.all(aPromises).then(function (result) {
		let aFrameworkList = result[0]?.data?.results || [];
		aFrameworkList= aFrameworkList.map(function(item){
			return new Project(item);
		});
		that.data.aProjects = aFrameworkList;
		oGridListControl.setBusy(false);
	})
}
		
	});
	return AppState;
});