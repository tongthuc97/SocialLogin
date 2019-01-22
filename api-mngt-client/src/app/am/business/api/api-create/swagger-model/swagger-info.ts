import { Contact } from './swagger-contact';
import { License } from './swagger-license';
/** 
 * the swagger class
*/
export class Info {
    title: string;
    description: string;
    termsOfService: string;
    version: string;
    contact: Contact;
    license: License;
}