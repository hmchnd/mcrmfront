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

  });
    return AppService;
  }
);