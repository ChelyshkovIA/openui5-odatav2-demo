sap.ui.define([
    "./base/BaseController",
    "sap/f/LayoutType"
], function (Controller, LayoutType) {
    "use strict";

    return Controller.extend("ui5odatav2demo.controller.ProductDetails", {
        onInit: function () {
            Controller.prototype.onInit.apply(this);
            this.getRouter().attachRoutePatternMatched(this._onPatternMatched.bind(this));
        },

        async _onPatternMatched(oEvent) {
            const sRoute = oEvent.getParameters().name;
            this.productId = oEvent.getParameters()?.arguments?.productId;
            await this._renderPageContent(sRoute);
        },

        async _renderPageContent(sRoute) {
            const fnRenderAction = this._getRenderAction(sRoute);
            await fnRenderAction();
        },

        async _showProductInfoFragment() {
            const oProductInfoText = new sap.m.Text({
                text: `Product[${this.productId}] info text!!!`
            });

            oProductInfoText.placeAt(this._getPage(), "only");
            this.getModel("fcl").setProperty("/layout", LayoutType.TwoColumnsMidExpanded);
        },

        async _showNoProductFragment() {
            if (!this.noProductFragment) {
                this.noProductFragment = await this.loadFragment({ name: "ui5odatav2demo.fragment.ProductDetails.NoProduct" });
            }

            this.noProductFragment.placeAt(this._getPage(), "only");
            this.getModel("fcl").setProperty("/layout", LayoutType.TwoColumnsBeginExpanded);
        },

        _getPage() {
            return this.getControl("productDetailsPage");
        },

        _getRenderAction(sRoute) {
            switch (sRoute) {
                case "RouteProductsList":
                    return this._showNoProductFragment.bind(this);
                case "SelectedProduct":
                    return this._showProductInfoFragment.bind(this);
                default:
                    return this._showNoProductFragment.bind(this);
            }
        },
    });
});
