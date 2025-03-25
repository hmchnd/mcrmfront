// eslint-disable-next-line no-undef
sap.ui.define(["sap/ui/base/Object"], function (Object, iconConstants) {
    return Object.extend("dominos.order.ordertracking.css.fioriMoment", {
        constructor: function (sType, sSize, sIcon) {
            this.type = sType; //sapIllus or tnt
            this.size = sSize; //Scene or Spot or Dialog
            this.icon = sIcon; //Icon name
            this.prefixImg = "<img src='";
        },
        getFioriMoments: function (x) {
            const root = sap.ui.require.toUrl("micro/crm/frontend/");
            const ext = x ? " x='.75' y='.75' width='100' height='100'" : "";
            const iconUrl =
            root + "css/" + this.type + "-Symbols.svg#" + this.type + "-" + this.size + "-" + this.icon;
            const figure =
                "<figure class='sapIllus sapIllus_" +
                (x ? "Dot" : this.size) +
                "'> <svg class='sapIllus_Image' role='img'> <use xlink:href='" +
                iconUrl +
                "'" +
                ext +
                "/> </svg>";
            return figure;
        },
        getHello: function () {
            const root = sap.ui.require.toUrl("dominos/order/ordertracking/");
            return this.prefixImg + root + "css/hello.svg'/>";
        },
        getUnauth: function () {
            const root = sap.ui.require.toUrl("dominos/order/ordertracking/");
            return "<img src='" + root + "assets/unauth.svg'/>";
        },
        getMaintenance: function () {
            const root = sap.ui.require.toUrl("dominos/order/ordertracking/");
            return "<img src='" + root + "assets/maintenance.svg'/>";
        },
        getGrafanaIcon: function () {
            const root = sap.ui.require.toUrl("dominos/order/ordertracking/");
            return "<img src='" + root + "assets/grafana.svg'/>";
        }
    });
});
