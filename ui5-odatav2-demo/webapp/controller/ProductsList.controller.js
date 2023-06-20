sap.ui.define([
    "./base/BaseController"
], function (Controller) {
    "use strict";

    return Controller.extend("ui5odatav2demo.controller.ProductsList", {
        onInit: function () {
            Controller.prototype.onInit.apply(this);
        },

        onProductPress(oEvent) {
            const oRow = oEvent.getSource();
            const productId = oRow.getBindingContext().getObject().ID;
            this.navTo("SelectedProduct", { productId });
        }
    });
});
