sap.ui.define(
  ["./CoreService", "sap/ui/model/FilterOperator", "sap/ui/model/Filter"],
  function (CoreService, FilterOperator, Filter) {
    "use strict";

    var AppService = CoreService.extend(
      "micro.crm.frontend.service.AppService",
      {
       getcrmuser:function(){
          return this.http("https://mcrmback.onrender.com/backend/crmusers").get()

       },
       getclients:function(){
        return this.http("https://mcrmback.onrender.com/backend/clients").get()
       },
       getleads:function(){
        return this.http("https://mcrmback.onrender.com/backend/leads").get()
       }
      ,
      saveClientDetails:function(oClient){
        return this.http("https://mcrmback.onrender.com/backend/clients").post("",oClient)
      },
      updateClientDetails:function(oClient){
        return this.http(`https://mcrmback.onrender.com/backend/clients/${oClient.id}`).put("",oClient)
      },
      deleteClient:function(oClient){
        return this.http(`https://mcrmback.onrender.com/backend/clients/${oClient.id}`).delete()
      },

      saveLeadDetails:function(oLeads){
        return this.http("https://mcrmback.onrender.com/backend/leads").post("",oLeads)
      },
      updateLeadDetails:function(oLeads){
        return this.http(`https://mcrmback.onrender.com/backend/leads/${oLeads.id}`).put("",oLeads)
      },

      deleteLeads:function(oLeads){
        return this.http(`https://mcrmback.onrender.com/backend/leads/${oLeads.id}`).delete()
      },
      saveServiceDetails:function(oService){
        return this.http("https://mcrmback.onrender.com/backend/services").post("",oService)
      },
      updateServiceDetails:function(oService){
        return this.http(`https://mcrmback.onrender.com/backend/services/${oService.id}`).put("",oService)
      },
      deleteService:function(oService){
        return this.http(`https://mcrmback.onrender.com/backend/services/${oService.id}`).delete()
      },
      getServices:function(){
        return this.http("https://mcrmback.onrender.com/backend/services").get()
      },
      getServiceCategories:function(){
        return this.http("https://mcrmback.onrender.com/backend/service-categories").get()
      },
      getProjects:function(){
        return this.http("https://mcrmback.onrender.com/backend/projects").get()
      },
      saveProjectDetails:function(oProject){
        return this.http("https://mcrmback.onrender.com/backend/projects").post("",oProject)
      },
      updateProjectDetails:function(oProject){
        return this.http(`https://mcrmback.onrender.com/backend/projects/${oProject.id}`).put("",oProject)
      },
      deleteProject:function(oProject){
        return this.http(`https://mcrmback.onrender.com/backend/projects/${oProject.id}`).delete()
      },
      getTasks:function(){
        return this.http("https://mcrmback.onrender.com/backend/tasks").get()
      },
      saveTaskDetails:function(oTask){
        return this.http("https://mcrmback.onrender.com/backend/tasks").post("",oTask)
      },
      updateTaskDetails:function(oTask){
        return this.http(`https://mcrmback.onrender.com/backend/tasks/${oTask.id}`).put("",oTask)
      },
      deleteTask:function(oTask){
        return this.http(`https://mcrmback.onrender.com/backend/tasks/${oTask.id}`).delete()
      },
      getInvoices:function(){
        return this.http("https://mcrmback.onrender.com/backend/invoices").get()
      },
      saveInvoiceDetails:function(oInvoice){
        return this.http("https://mcrmback.onrender.com/backend/invoices").post("",oInvoice)
      },
      saveClientIssueDetails:function(oClientIssue){
        return this.http("https://mcrmback.onrender.com/backend/tickets").post("",oClientIssue)
      },
      updateClientIssueDetails:function(oClientIssue){
        return this.http(`https://mcrmback.onrender.com/backend/tickets/${oClientIssue.id}`).put("",oClientIssue)
      },
      deleteClientIssue:function(oClientIssue){
        return this.http(`https://mcrmback.onrender.com/backend/tickets/${oClientIssue.id}`).delete()
      },
      getClientIssues:function(){
        return this.http("https://mcrmback.onrender.com/backend/tickets").get()
      },
      doLogin: function (oUser) {
        return this.http("https://mcrmback.onrender.com/backend/login").post("", oUser);
      },


  });
    return AppService;
  }
);