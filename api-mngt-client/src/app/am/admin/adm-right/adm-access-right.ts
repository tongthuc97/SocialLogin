import { AdmAccess } from '../adm-access/adm-access';
import { AdmRight } from './adm-right';
/** 
 * the admAccess class
*/
export class AdmAccessRight {
    /** the id of the access */
    id: number;
    /** the access list */
    admAccessList: AdmAccess;
    /** the right */
    admRight: AdmRight;
    /** check mark*/
    checked: boolean;
}