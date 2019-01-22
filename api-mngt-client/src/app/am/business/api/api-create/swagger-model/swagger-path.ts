import { Parameter } from './swagger-parameter';
import { Operation } from './swagger-operation';

/** 
 * the swagger class
*/
export class Path {
    key: string;
    get: Operation;
    put: Operation;
    post: Operation;
    head: Operation;
    delete: Operation;
    patch: Operation;
    options: Operation;
    parameters: Parameter[];
}