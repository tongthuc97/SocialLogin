import { Info } from "./swagger-info";
import { Tag } from './swagger-tag';
import { SecurityRequirement } from './swagger-security-requirement';
import { ExternalDocs } from './swagger-external-docs';
import { Path } from './swagger-path';

/** 
 * the swagger class
*/
export class Swagger {
    swagger: string;
    info: Info;
    host: string;
    tags: Tag[];
    schemes: string[];
    consumes: string[];
    produces: string[];
    security: SecurityRequirement[];
    paths: string[];
    securityDefinitions: string[];
    definitions: string[];
    parameters: string[];
    responses: string[];
    externalDocs: ExternalDocs;

}