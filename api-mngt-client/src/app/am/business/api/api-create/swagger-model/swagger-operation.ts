import { ExternalDocs } from "./swagger-external-docs";
import { Parameter } from './swagger-parameter';

export class Operation{
    tags: string[];
    summary: string;
    description: string;
    operationId: string;
    schemes: string[];
    consumes: string[];
    produces: string[];
    parameters: Parameter[];
    externalDocs: ExternalDocs;

}