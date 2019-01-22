export class MethodParameter {
    methodParameterId: number;
    httpMethod: string;
    name: string;
    description: string;
    parameterType: number;
    dataType: string;
    required: number;

    constructor(methodParameterId: number, httpMethod: string, name: string, description: string, parameterType: number, dataType: string, required: number) {
        this.methodParameterId = methodParameterId;
        this.httpMethod = httpMethod;
        this.name = name;
        this.description = description;
        this.parameterType = parameterType;
        this.dataType = dataType;
        this.required = required;
    }
}