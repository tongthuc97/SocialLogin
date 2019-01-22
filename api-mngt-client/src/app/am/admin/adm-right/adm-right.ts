import { AdmApi } from '../adm-api/adm-api';
import { AdmAccess } from '../adm-access/adm-access';
import { AdmAccessRight } from './adm-access-right';
/** 
 * the admRight class
*/
export class AdmRight {
    /** the id of the right */
    rightId: number;
    /** the right code */
    rightCode: string;
    /** the right name */
    rightName: string;
    /** the parent right id */
    parentRightId: number;
    /** the status */
    status: number;
    /** the view order */
    rightOrder: number;
    /** is has child */
    hasChild: number;
    /** the url rewrite */
    urlRewrite: string;
    /** the icon url */
    iconUrl: string;
    /** the desciption */
    description: string;
    /** the application id */
    applicationId: number;

    admApiIds: number[] = [];

    listAdmAccess: AdmAccess[] = [];

    admAccessRights: AdmAccessRight[] = [];

    /** check mark*/
    checked: boolean;
}