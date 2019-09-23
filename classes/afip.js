"use strict";
exports.__esModule = true;
var afip_apis_1 = require("afip-apis");
var DEFAULT_URLWSAAWSDL = "https://wsaahomo.afip.gov.ar/ws/services/LoginCms?WSDL";
var DEFAULT_SERVICIO = "wsfe";
var DEFAULT_CERTIFICATE = "cert.pem";
var DEFAULT_CERTIFICATE_KEY = "MiClavePrivada";
var Afip = /** @class */ (function () {
    function Afip() {
        this.loginTicket = new afip_apis_1.LoginTicket();
    }
    Afip.prototype.obLoginTicket = function () {
        this.loginTicket.wsaaLogin(DEFAULT_SERVICIO, DEFAULT_URLWSAAWSDL, DEFAULT_CERTIFICATE, DEFAULT_CERTIFICATE_KEY)
            .then(function (r) {
            console.log(r.header);
            var wsfev1 = new afip_apis_1.Wsfev1("https://wswhomo.afip.gov.ar/wsfev1/service.asmx?WSDL");
            return wsfev1.FEDummy({})
                .then(function (d) {
                console.log(d);
            });
        })["catch"](function (e) { return console.error(e); });
    };
    Afip.prototype.obTiposComprobantes = function () {
        var wsfev1 = new afip_apis_1.Wsfev1("https://wswhomo.afip.gov.ar/wsfev1/service.asmx?WSDL");
        var d = wsfev1.FEDummy({}).then(function (d) {
            console.log(d);
        });
    };
    return Afip;
}());
exports["default"] = Afip;
var afip = new Afip();
afip.obTiposComprobantes();
