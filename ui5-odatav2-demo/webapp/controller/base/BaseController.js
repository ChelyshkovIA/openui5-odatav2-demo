sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    return Controller.extend("ui5odatav2demo.controller.base.BaseController", {
        onInit() {},

        getControl(sId) {
            return this.getView().byId(sId);
        },

        getModel(sName) {
            return this.getView().getModel(sName);
        },

        getRouter() {
            return this.getOwnerComponent().getRouter();
        },

        setModel(oModel, sName) {
            this.getView().setModel(oModel, sName);
        },

        navTo(sAppName, oParams) {
            this.getRouter().navTo(sAppName, oParams);
        }
    });
});