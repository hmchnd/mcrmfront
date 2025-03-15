
 sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/model/json/JSONModel"
], function (Object, JSONModel) {
    "use strict";
    return Object.extend("micro.crm.frontend.model.BaseObject", {

        constructor: function (data) {
            var that = this;
            that.copyValues(data);
            if (that.isState) {
                that.initDirtyCheck();
                that.getModel().attachPropertyChange(function (oProperty) {
                    var sPath = oProperty.getParameter("path");
                    var sParent = sPath.split("/")[sPath.split("/").length - 1];
                    if (!isNaN(parseInt(sParent))) { //in case of integer it's probably an array and we need to go one level up
                        sPath = sPath.split("/").slice(0, sPath.split("/").length - 1).join("/");
                    }
                    var sSourcePath = sPath.split("/").slice(0, sPath.split("/").length - 1).join("/");
                    var oSource = (sSourcePath && that.getModel().getProperty(sSourcePath));
                    var fChangeFunction = that.getChangeFunction(sPath);
                    that.callChangeFunction(fChangeFunction, oSource, oProperty);
                }, that);
            }
        },

        copyFieldsToObject: function (aFields) {
            return this.copyFields(this, {}, aFields);
        },

        copyFieldsToThis: function (oFrom, aFields) {
            return this.copyFields(oFrom, this, aFields);
        },

        copyFields: function (oFrom, oTo, aFields) {
            for (var prop in oFrom) {
                if (aFields.find(function (field) {
                        return field === prop;
                    })) {
                    oTo[prop] = oFrom[prop];
                }
            }
            return oTo;
        },

        initDirtyCheck: function () {
            this.isDirty = false;
            this.enableDirtyFlag();
            this.updateModel();
        },

        disableDirtyFlag: function () {
            this.setDirtyFlag(false);
        },

        enableDirtyFlag: function () {
            this.setDirtyFlag(this.isDirty);
        },

        setDirtyFlag: function (bIsDirty) {
            if (sap && sap.ushell && sap.ushell.Container) {
                sap.ushell.Container.setDirtyFlag(bIsDirty);
            }
        },

        getChangeFunction: function (sPath) {
            var that = this;
            sPath = sPath.substr(0, 1) === "/" ? sPath.substr(1) : sPath;
            return sPath.split("/").reduce(function (prev,
                curr,
                idx, array) {
                if (idx === array.length - 1) {
                    return prev[curr + "Changed"];
                }
                return curr && curr.length > 0 && prev ? prev[curr] : prev;
            }, that.data);
        },

        callChangeFunction: function (fChangeFunction, scope, args) {
            if (fChangeFunction) {
                fChangeFunction.apply(scope, args);
            }
        },

        copyValues: function (data) {
            if (data) {
                for (var field in data) {
                    switch (typeof (data[field])) {
                    case "object":
                        //For navigation objects
                        if (data[field] && data[field]["results"]!==undefined) {
                            this[field] = data[field]["results"];
                        }
                        //For Objects like Date Datatype
                        else
                        this[field] = data[field];
                        
                        break;
                    default:
                        this[field] = data[field];
                    }
                }
            }
        },
        getModel: function () {
            if (!this.model) {
                this.model = new JSONModel(this.data, true);
                //this.model.setData(this);
            }
            return this.model;
        },

        updateModel: function (bHardRefresh) {
            if (this.model) {
                this.model.refresh(bHardRefresh ? true : false);
            }
        },

        getData: function () {
            var req = jQuery.extend({}, this);
            delete req["model"];
            return req;
        },

        fnMap: function (oObject) {
            var obj = {};
            for (var prop in oObject) {
                if (oObject.hasOwnProperty(prop) && typeof (oObject[prop]) !== "object") {
                    obj[prop] = oObject[prop];
                }
            }
            return obj;
        }

    });
});