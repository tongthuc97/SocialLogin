import { AdmRight } from '../adm-right/adm-right';
import { AdmAccessRight } from '../adm-right/adm-access-right';
/** 
 * the admRole class
*/
export class AdmRole {
    /** the id of the role */
    roleId: number;
    /** the role type */
    loweredRoleName: string;
    /** the role name */
    roleName: string;
    /** the role key */
    roleCode: string;
    /** the role key */
    description: string;
    /** the role key */
    enableDelete: number;
    /** the view order */
    status: number;
    /** the view order */
    applicationId: number;
    /** the view order */
    creator: number;
    /** the view order */
    created: Date;
    /** the view order */
    modifier: number;
    /** the view order */
    modified: Date;

}

/** 
 * the admRole class
*/
export class AdmRoleRes extends AdmRole {

    admRoleRights: AdmRoleRight[] = [];

    admAccessRightRoles: AdmAccessRightRole[] = [];
    /** check mark*/
    checked: boolean;
}

/** 
 * the admRole class
*/
export class AdmRoleReq extends AdmRole {

    admRightIds: number[] = [];

    admAccessRightIds: number[] = [];

}

/** 
 * the admRole class
*/
export class AdmRoleRight {

    id: number;

    admRight: AdmRight;

    admRole: AdmRole;
    /** check mark*/
    checked: boolean;
}

/** 
 * the admRole class
*/
export class AdmAccessRightRole {

    id: number;

    admAccessRight: AdmAccessRight;

    admRole: AdmRole;
    /** check mark*/
    checked: boolean;
}