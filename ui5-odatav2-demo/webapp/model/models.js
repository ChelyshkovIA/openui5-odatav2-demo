sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "sap/f/LayoutType"
], function (JSONModel, Device, LayoutType) {
    "use strict";

    return {
        createDeviceModel() {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        },

        createLayoutModel() {
            const oModel = new JSONModel({
                layout: LayoutType.TwoColumnsBeginExpanded
            });
            return oModel;
        }
    };
});