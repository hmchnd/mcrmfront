sap.ui.define(
  ["./CoreService", "sap/ui/model/FilterOperator", "sap/ui/model/Filter"],
  function (CoreService, FilterOperator, Filter) {
    "use strict";

    var AppService = CoreService.extend(
      "micro.crm.frontend.service.AppService",
      {
       getcrmuser:function(){
          return this.http("/backend/crmusers").get()

       }
      }
    );
    return AppService;
  }
);