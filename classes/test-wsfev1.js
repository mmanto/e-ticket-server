"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cache_login_1 = require("cache-login");
const afip_apis_1 = require("../afip-apis");
const path = __importStar(require("path"));
const moment_1 = __importDefault(require("moment"));
const DEFAULT_CERTIFICATE = path.resolve("cert.pem");
const DEFAULT_CERTIFICATE_KEY = "MiClavePrivada";
const DEFAULT_URLWSAAWSDL = "https://wsaahomo.afip.gov.ar/ws/services/LoginCms?WSDL";
const cacheLogin = cache_login_1.CacheLogin.Instance;
cacheLogin.certificateKey = DEFAULT_CERTIFICATE_KEY;
cacheLogin.certificatePath = DEFAULT_CERTIFICATE;
cacheLogin.wsaawsdl = DEFAULT_URLWSAAWSDL;
const fecha = moment_1.default(new Date()).format("YYYYMMDD");
const periodo = +moment_1.default(new Date()).format("YYYYMM");
const wsfev1 = new afip_apis_1.Wsfev1(afip_apis_1.Wsfev1.testWSDL);
const feCAEARegInfReq = {
    FeCabReq: {
        CantReg: 1,
        PtoVta: 9800,
        CbteTipo: 1
    },
    FeDetReq: {
        FECAEADetRequest: [{
                Concepto: 1,
                DocTipo: 80,
                DocNro: 30000000007,
                CbteDesde: 33,
                CbteHasta: 33,
                CbteFch: fecha,
                ImpTotal: 100.00,
                ImpTotConc: 100.00,
                ImpNeto: 0,
                ImpOpEx: 0.00,
                ImpIva: 0,
                ImpTrib: 0,
                MonId: "PES",
                MonCotiz: 1,
                CAEA: "21064126523746",
            }]
    }
};
const comprobante = {
    FeCabReq: {
        CantReg: 1,
        PtoVta: 1,
        CbteTipo: 6
    },
    FeDetReq: {
        FECAEDetRequest: [{
                Concepto: 1,
                DocTipo: 80,
                DocNro: 27223856964,
                CbteDesde: 1,
                CbteHasta: 1,
                CbteFch: fecha,
                ImpTotal: 184.05,
                ImpTotConc: 0,
                ImpNeto: 150,
                ImpOpEx: 0,
                ImpTrib: 7.8,
                ImpIVA: 26.25,
                FchServDesde: "",
                FchServHasta: "",
                FchVtoPago: "",
                MonId: "PES",
                MonCotiz: 1,
                Tributos: {
                    Tributo: [
                        {
                            Id: 99,
                            Desc: "Impuesto Municipal Matanza",
                            BaseImp: 150,
                            Alic: 5.2,
                            Importe: 7.8
                        }
                    ]
                },
                Iva: {
                    AlicIva: [
                        {
                            Id: 5,
                            BaseImp: 100,
                            Importe: 21
                        },
                        {
                            Id: 4,
                            BaseImp: 50,
                            Importe: 5.25
                        }
                    ]
                },
            }]
    }
};
wsfev1.FEDummy()
    .then(r => {
    console.log(`===FEDummy===\n${JSON.stringify(r)}`);
    if (r && r.FEDummyResult
        && r.FEDummyResult.AppServer === "OK"
        && r.FEDummyResult.DbServer === "OK"
        && r.FEDummyResult.AuthServer === "OK") {
        return cacheLogin.getTicket(afip_apis_1.Wsfev1.serviceId)
            .then(ticket => {
            console.log("=== ticket ===");
            console.log(JSON.stringify(ticket));
            const auth = {
                Token: ticket.credentials.token,
                Sign: ticket.credentials.sign,
                Cuit: 20220536999
            };
            return wsfev1.FEParamGetPtosVenta({ Auth: auth })
                .then(r => {
                console.log(`===FEParamGetPtosVenta===\n${JSON.stringify(r)}`);
                return wsfev1.FEParamGetTiposDoc({ Auth: auth });
            })
                .then(r => {
                console.log(`===FEParamGetTiposDoc===\n${JSON.stringify(r)}`);
                return wsfev1.FEParamGetTiposCbte({ Auth: auth });
            })
                .then(r => {
                console.log(`===FEParamGetTiposCbte===\n${JSON.stringify(r)}`);
                return wsfev1.FEParamGetTiposConcepto({ Auth: auth });
            })
                .then(r => {
                console.log(`===FEParamGetTiposConcepto===\n${JSON.stringify(r)}`);
                return wsfev1.FEParamGetTiposIva({ Auth: auth });
            })
                .then(r => {
                console.log(`===FEParamGetTiposIva===\n${JSON.stringify(r)}`);
                return wsfev1.FEParamGetTiposPaises({ Auth: auth });
            })
                .then(r => {
                console.log(`===FEParamGetTiposPaises===\n${JSON.stringify(r)}`);
                return wsfev1.FEParamGetTiposMonedas({ Auth: auth });
            })
                .then(r => {
                console.log(`===FEParamGetTiposMonedas===\n${JSON.stringify(r)}`);
                const monId = (r
                    && r.FEParamGetTiposMonedasResult
                    && r.FEParamGetTiposMonedasResult.ResultGet
                    && r.FEParamGetTiposMonedasResult.ResultGet.Moneda) ? r.FEParamGetTiposMonedasResult.ResultGet.Moneda[0].Id : "PES";
                return wsfev1.FEParamGetCotizacion({ Auth: auth, MonId: monId });
            })
                .then(r => {
                console.log(`===FEParamGetCotizacion===\n${JSON.stringify(r)}`);
                return wsfev1.FEParamGetTiposTributos({ Auth: auth });
            })
                .then(r => {
                console.log(`===FEParamGetTiposTributos===\n${JSON.stringify(r)}`);
                return wsfev1.FEParamGetTiposOpcional({ Auth: auth });
            })
                .then(r => {
                console.log(`===FEParamGetTiposOpcional===\n${JSON.stringify(r)}`);
                return wsfev1.FECAEAConsultar({ Auth: auth, Periodo: periodo, Orden: 1 });
            })
                .then(r => {
                console.log(`===FECAEAConsultar===\n${JSON.stringify(r)}`);
                return wsfev1.FECAEARegInformativo({
                    Auth: auth,
                    FeCAEARegInfReq: feCAEARegInfReq
                });
            })
                .then(r => {
                console.log(`===FECAEARegInformativo===\n${JSON.stringify(r)}`);
                return wsfev1.FECAEASinMovimientoConsultar({ Auth: auth, CAEA: "", PtoVta: 1 });
            })
                .then(r => {
                console.log(`===FECAEASinMovimientoConsultar===\n${JSON.stringify(r)}`);
                return wsfev1.FECAEASinMovimientoInformar({ Auth: auth, CAEA: "", PtoVta: 1 });
            })
                .then(r => {
                console.log(`===FECAEASinMovimientoInformar===\n${JSON.stringify(r)}`);
                return wsfev1.FECompUltimoAutorizado({
                    Auth: auth,
                    PtoVta: comprobante.FeCabReq.PtoVta,
                    CbteTipo: comprobante.FeCabReq.CbteTipo
                })
                    .then(r => {
                    console.log(`===FECompUltimoAutorizado===\n${JSON.stringify(r)}`);
                    comprobante.FeDetReq.FECAEDetRequest[0].CbteDesde = +r.FECompUltimoAutorizadoResult.CbteNro + 1;
                    comprobante.FeDetReq.FECAEDetRequest[0].CbteHasta = +comprobante.FeDetReq.FECAEDetRequest[0].CbteDesde;
                    return wsfev1.FECAEASolicitar({ Auth: auth, Periodo: periodo, Orden: 1 });
                })
                    .then(r => {
                    console.log(`===FECAEASolicitar===\n${JSON.stringify(r)}`);
                    return wsfev1.FECAESolicitar({ Auth: auth, FeCAEReq: comprobante });
                })
                    .then(r => {
                    console.log(`===FECAESolicitar===\n${JSON.stringify(r)}`);
                    return wsfev1.FECompConsultar({
                        Auth: auth, FeCompConsReq: {
                            CbteTipo: comprobante.FeCabReq.CbteTipo,
                            CbteNro: comprobante.FeDetReq.FECAEDetRequest[0].CbteDesde,
                            PtoVta: comprobante.FeCabReq.PtoVta
                        }
                    });
                })
                    .then(r => {
                    console.log(`===FECompConsultar===\n${JSON.stringify(r)}`);
                    return wsfev1.FECompTotXRequest({ Auth: auth });
                })
                    .then(r => {
                    console.log(`===FECompTotXRequest===\n${JSON.stringify(r)}`);
                    return;
                });
            });
        });
    }
    console.error("Ocurrió algun error en la verificación del estado de los servicios");
    return;
})
    .catch(err => {
    console.error(JSON.stringify(err));
});
