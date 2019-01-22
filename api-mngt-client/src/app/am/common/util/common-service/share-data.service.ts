import {Injectable} from '@angular/core';
import { Swagger } from '../../../business/api/api-create/swagger-model/swagger';

@Injectable()
export class SharedDataService{
  swaggerData : Swagger;
  wsdlData: any;
  wsdlUrl: string;

    setSwaggerData(swaggerData: Swagger) {    
        this.swaggerData= swaggerData;        
    }
    getSwaggerData() {
        return this.swaggerData;
    }

    setWsdlData(wsdlData: any) {    
        this.wsdlData= wsdlData;        
    }
    getWsdlData() {
        return this.wsdlData;
    }

    setWsdlUrl(wsdlUrl: string) {    
        this.wsdlUrl= wsdlUrl;        
    }
    getWsdlUrl() {
        return this.wsdlUrl;
    }

}