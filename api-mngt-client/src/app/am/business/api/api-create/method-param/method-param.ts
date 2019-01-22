export class MethodParameter {
    methodParameterId: string;
    httpMethod: string;
    name: string;
    description: string;
    parameterType: number;
    dataType: string;
    required: string;

    constructor(methodParameterId: string, httpMethod: string, name: string, description: string, parameterType: number, dataType: string, required: string) {
        this.methodParameterId = methodParameterId;
        this.httpMethod = httpMethod;
        this.name = name;
        this.description = description;
        this.parameterType = parameterType;
        this.dataType = dataType;
        this.required = required;
    }
}