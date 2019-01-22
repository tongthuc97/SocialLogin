import { MethodParameter } from './method-param';
export class ApiMethod {
    urlMappingId: string;
    httpMethod: string = '';
    urlPattern: string = '';
    throttlingTier: number = 0;
    checked: boolean = false;
    amApiMethodParameterses: MethodParameter[] = [];

    constructor(httpMethod: string, urlPattern: string, throttlingTier: number, checked: boolean, amApiMethodParameterses: MethodParameter[]) {
        this.httpMethod = httpMethod;
        this.urlPattern = urlPattern;
        this.throttlingTier = throttlingTier;
        this.checked = checked;
        this.amApiMethodParameterses = amApiMethodParameterses;
    }
}