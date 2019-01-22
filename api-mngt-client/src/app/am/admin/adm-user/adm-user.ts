import { AdmRole } from '../adm-role/adm-role';
/** 
 * the admUser class
*/
export class AdmUser {
    /** the id of the user */
    userId: number;
    /** the user type */
    loweredUsername: string;
    /** the user name */
    userName: string;
    /** the user name */
    surname: string;
    /** the user name */
    givenName: string;
    /** the user name */
    displayName: string;
    /** the user key */
    mobileAlias: string;
    /** the view order */
    isAnonymous: number;
    /** the view order */
    lastActivityDate: Date;
    /** the view order */
    userType: number;
    /** the view order */
    applicationId: number;
}

export class AdmUserRes extends AdmUser {
    admUserRoles: AdmUserRole[] = [];

    checked: boolean;
}

export class AdmUserReq extends AdmUser {
    roleIds: number[] = [];

    checked: boolean;
}

export class AdmUserRole {
    id: number;
    admRole: AdmRole;
    admUser: AdmUser;
    /** check mark*/
    checked: boolean;
}