"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const afip_apis_1 = require("afip-apis");
const DEFAULT_URLWSAAWSDL = "https://wsaahomo.afip.gov.ar/ws/services/LoginCms?WSDL";
const DEFAULT_SERVICIO = "wsfe";
const DEFAULT_CERTIFICATE = "cert.pem";
const DEFAULT_CERTIFICATE_KEY = "MiClavePrivada";
class Afip {
    constructor() {
        this.loginTicket = new afip_apis_1.LoginTicket();
    }
    obLoginTicket() {
        this.loginTicket.wsaaLogin(DEFAULT_SERVICIO, DEFAULT_URLWSAAWSDL, DEFAULT_CERTIFICATE, DEFAULT_CERTIFICATE_KEY)
            .then(r => {
            console.log(r.header);
            const wsfev1 = new afip_apis_1.Wsfev1("https://wswhomo.afip.gov.ar/wsfev1/service.asmx?WSDL");
            return wsfev1.FEDummy({})
                .then(d => {
                console.log(d);
            });
        })
            .catch(e => console.error(e));
    }
    obTiposComprobantes() {
        const wsfev1 = new afip_apis_1.Wsfev1("https://wswhomo.afip.gov.ar/wsfev1/service.asmx?WSDL");
        const d = wsfev1.FEDummy({}).then(d => {
            console.log(d);
        });
    }
}
exports.default = Afip;
var afip = new Afip();
afip.obTiposComprobantes();
