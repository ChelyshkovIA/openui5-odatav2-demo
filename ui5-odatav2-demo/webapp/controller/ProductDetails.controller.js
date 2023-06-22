sap.ui.define([
    "./base/BaseController",
    "sap/f/LayoutType",
    "sap/ui/model/json/JSONModel"
], function (Controller, LayoutType, JSONModel) {
    "use strict";

    return Controller.extend("ui5odatav2demo.controller.ProductDetails", {
        onInit: function () {
            Controller.prototype.onInit.apply(this);
            this.getRouter().attachRoutePatternMatched(this._onPatternMatched.bind(this));
            this._initAppModel();
        },

        onProductEditPress() {
            this._enableEditMode("product");
        },

        onProductSavePress() {
            this._disableEditMode("product");
        },

        onProductCancelPress() {
            this._disableEditMode("product");
        },
        
        onCategoryEditPress() {
            this._enableEditMode("category");
        },

        onCategorySavePress() {
            this._disableEditMode("category");
        },

        onCategoryCancelPress() {
            this._disableEditMode("category");
        },
        
        onSupplierEditPress() {
            this._enableEditMode("supplier");
        },

        onSupplierSavePress() {
            this._disableEditMode("supplier");
        },
        
        onSupplierCancelPress() {
            this._disableEditMode("supplier");
        },
        
        onAddressEditPress() {
            this._enableEditMode("address");
        },
        
        onAddressSavePress() {
            this._disableEditMode("address");
        },
        
        onAddressCancelPress() {
            this._disableEditMode("address");
        },

        async _onPatternMatched(oEvent) {
            const sRoute = oEvent.getParameters().name;
            this.productId = oEvent.getParameters()?.arguments?.productId;
            await this._renderPageContent(sRoute);
            this._rebindObjectPage();
        },

        _initAppModel() {
            const oModel = new JSONModel({
                product: {
                    isEditMode: false
                },
                category: {
                    isEditMode: false
                },
                supplier: {
                    isEditMode: false
                },
                address: {
                    isEditMode: false
                }
            });

            this.setModel(oModel, "app");
        },

        _getAppModel() {
            return this.getModel("app");
        },

        _enableEditMode(sEntityPath) {
            this._getAppModel().setProperty(`/${sEntityPath}/isEditMode`, true);
        },

        _disableEditMode(sEntityPath) {
            this._getAppModel().setProperty(`/${sEntityPath}/isEditMode`, false);
        },

        _rebindObjectPage() {
            if (!this.productId) return;

            this.getControl("productInfoObjectPage").bindElement(`/Products(${this.productId})`);
        },

        async _renderPageContent(sRoute) {
            const fnRenderAction = this._getRenderAction(sRoute);
            await fnRenderAction();
        },

        async _showProductInfoFragment() {
            if (!this.productInfoFragment) {
                this.productInfoFragment = await this.loadFragment({ name: "ui5odatav2demo.fragment.ProductDetails.ProductInfo" });
            }

            this.productInfoFragment.placeAt(this._getPage(), "only");
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
