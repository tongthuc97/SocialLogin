import { TokenInfo } from './token-info';
export class UserInfo {
    userName: string;
    surname: string;
	givenName: string;
	displayName: string;
    mobileAlias: string;
    isAnonymous: number;
    userType: number;
    accessTokenInfo: TokenInfo;
    rights: any;
}