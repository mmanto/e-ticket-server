import { LoginTicket, Wsfev1 } from "afip-apis";

const DEFAULT_URLWSAAWSDL: string = "https://wsaahomo.afip.gov.ar/ws/services/LoginCms?WSDL";
const DEFAULT_SERVICIO: string = "wsfe";
const DEFAULT_CERTIFICATE: string = "cert.pem";
const DEFAULT_CERTIFICATE_KEY: string = "MiClavePrivada";

interface ILoginTicket {
  source: string;
  destination: string;
  uniqueId: string;
  generationTime: string;
  expirationTime: string;
}

  export default class Afip{

    private loginTicket: LoginTicket = new LoginTicket();

    obLoginTicket(){
      this.loginTicket.wsaaLogin(DEFAULT_SERVICIO, DEFAULT_URLWSAAWSDL, DEFAULT_CERTIFICATE, DEFAULT_CERTIFICATE_KEY)
      .then(r => {
        console.log(r.header);
        const wsfev1: Wsfev1 = new Wsfev1("https://wswhomo.afip.gov.ar/wsfev1/service.asmx?WSDL");
        return wsfev1.FEDummy({})
          .then(d => {
            console.log(d);
          });
      })
      .catch(e => console.error(e));
    }
    
    
    obTiposComprobantes() {

      const wsfev1: Wsfev1 = new Wsfev1("https://wswhomo.afip.gov.ar/wsfev1/service.asmx?WSDL");
      const d = wsfev1.FEDummy({}).then( d => {
        console.log(d);
      });
       
    }

  }

  var afip = new Afip();
  afip.obTiposComprobantes();

  
  

