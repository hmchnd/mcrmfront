sap.ui.define(
  ["./CoreService", "sap/ui/model/FilterOperator", "sap/ui/model/Filter"],
  function (CoreService, FilterOperator, Filter) {
    "use strict";

    var AppService = CoreService.extend(
      "micro.crm.frontend.service.AppService",
      {
       getcrmuser:function(){
          return this.http("/backend/crmusers").get()

       },
       getclients:function(){
        return this.http("/backend/clients").get()
       },
       getleads:function(){
        return this.http("/backend/leads").get()
       }
      ,
      saveClientDetails:function(oClient){
        return this.http("/backend/clients").post("",oClient)
      },
      updateClientDetails:function(oClient){
        return this.http(`/backend/clients/${oClient.id}`).put("",oClient)
      },
      deleteClient:function(oClient){
        return this.http(`/backend/clients/${oClient.id}`).delete()
      },

      saveLeadDetails:function(oLeads){
        return this.http("/backend/leads").post("",oLeads)
      },
      updateLeadDetails:function(oLeads){
        return this.http(`/backend/leads/${oLeads.id}`).put("",oLeads)
      },
     
      deleteLeads:function(oLeads){
        return this.http(`/backend/leads/${oLeads.id}`).delete()
      },
      saveServiceDetails:function(oService){
        return this.http("/backend/services").post("",oService)
      },
      updateServiceDetails:function(oService){
        return this.http(`/backend/services/${oService.id}`).put("",oService)
      },
      deleteService:function(oService){
        return this.http(`/backend/services/${oService.id}`).delete()
      },
      getServices:function(){
        return this.http("/backend/services").get()
      },
      getServiceCategories:function(){
        return this.http("/backend/service-categories").get()
      },
      getProjects:function(){
        return this.http("/backend/projects").get()
      },
      saveProjectDetails:function(oProject){
        return this.http("/backend/projects").post("",oProject)
      },
      updateProjectDetails:function(oProject){
        return this.http(`/backend/projects/${oProject.id}`).put("",oProject)
      },
      deleteProject:function(oProject){
        return this.http(`/backend/projects/${oProject.id}`).delete()
      },
      getTasks:function(){
        return this.http("/backend/tasks").get()
      },
      saveTaskDetails:function(oTask){
        return this.http("/backend/tasks").post("",oTask)
      },
      updateTaskDetails:function(oTask){
        return this.http(`/backend/tasks/${oTask.id}`).put("",oTask)
      },
      deleteTask:function(oTask){
        return this.http(`/backend/tasks/${oTask.id}`).delete()
      },
      getInvoices:function(){
        return this.http("/backend/invoices").get()
      },
      saveInvoiceDetails:function(oInvoice){
        return this.http("/backend/invoices").post("",oInvoice)
      },
      saveClientIssueDetails:function(oClientIssue){
        return this.http("/backend/tickets").post("",oClientIssue)
      },
      updateClientIssueDetails:function(oClientIssue){
        return this.http(`/backend/tickets/${oClientIssue.id}`).put("",oClientIssue)
      },
      deleteClientIssue:function(oClientIssue){
        return this.http(`/backend/tickets/${oClientIssue.id}`).delete()
      },
      getClientIssues:function(){
        return this.http("/backend/tickets").get()
      },
      doLogin: function (oUser) {
        return this.http("/backend/login").post("", oUser);
      },
     

  });
    return AppService;
  }
);