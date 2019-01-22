import { AdmApi } from '../adm-api/adm-api';
/** 
 * the admAccess class
*/
export class AdmAccess {
    /** the id of the access */
    accessId: number;
    /** the access type */
    accessType: string;
    /** the access name */
    accessName: string;
    /** the access key */
    accessKey: string;
    /** the view order */
    viewOrder: number;

    admApiIds: number[] = [];

    listAdmApi: AdmApi[] = [];
    /** check mark*/
    checked: boolean;

    /** check mark*/
    choosed: boolean;
}