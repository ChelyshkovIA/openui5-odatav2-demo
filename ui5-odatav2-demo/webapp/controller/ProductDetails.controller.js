sap.ui.define([
    "./base/BaseController"
], function (Controller) {
    "use strict";

    return Controller.extend("ui5odatav2demo.controller.ProductDetails", {
        onInit: function () {
            Controller.prototype.onInit.apply(this);
            this.getRouter().attachRoutePatternMatched(this._onPatternMatched.bind(this));
        },

        _onPatternMatched() {
            
        }
    });
});
