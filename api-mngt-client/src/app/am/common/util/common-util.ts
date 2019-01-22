
export class CommonUtil {

    static LIST_API_STATE = [
        { id: 0, value: 'Drafts', vi: 'Nháp' },
        { id: 1, value: 'Created', vi: 'Tạo mới' },
        { id: 2, value: 'Published', vi: 'Phát hành' },
        { id: 3, value: 'Blocked', vi: 'Bị chặn' },
        { id: 4, value: 'Deprecated', vi: 'Không chấp thuận', },
        { id: 5, value: 'Retired', vi: 'Hết hạn', }
    ];

    static LIST_STATUS = [
        { id: 1, value: 'Active', vi: 'Hoạt động' },
        { id: 0, value: 'Deactivated', vi: 'Ngừng hoạt động' }
    ];

    static LIST_DOCUMENT_TYPE = [
        { id: 1, value: 'How to' },
        { id: 2, value: 'Samples & SDK' },
        { id: 3, value: 'Public Forum' },
        { id: 4, value: 'Support Forum' },
        { id: 5, value: 'Other' },
    ];

    static LIST_SOURCE_TYPE = [
        { id: 1, value: 'Url' },
        { id: 2, value: 'File' }
    ];

    static LIST_GRANT_TYPE = [
        { id: 1, value: 'Authorization Code' },
        { id: 2, value: 'Implicit' },
        { id: 3, value: 'Password Credentials' },
        { id: 4, value: 'Client Credentials' }
    ];

    static BLOCK_CONDITION_TYPE = [
        { value: 'API' },
        { value: 'Application' },
        { value: 'IP' }
    ];

    static LIST_POLICY_TYPE = [
        { id: 1, value: 'System' },
        { id: 2, value: 'Api' },
        { id: 3, value: 'Application' },
        { id: 4, value: 'Subscription' },
        { id: 5, value: 'Method' }
    ];

    static LIST_QUOTA_TYPE = [
        { id: 1, value: 'Request Bandwidth' },
        { id: 2, value: 'Request Count' }
    ];

    static LIST_IP_CONDITION_TYPE = [
        { id: 1, value: 'Specific IP' },
        { id: 2, value: 'IP Range' }
    ];

    static LIST_DIRECTIONAL = [
        { id: 1, value: 'ACCESS' },
        { id: 2, value: 'BLOCK' }
    ];

    static LIST_API_METHOD = [
        { id: 'GET', value: 'GET' },
        { id: 'POST', value: 'POST' },
        { id: 'PUT', value: 'PUT' },
        { id: 'DELETE', value: 'DELETE' }
    ]

    static getListApiState(): any {
        if (localStorage.getItem('keyLanguage') == undefined || localStorage.getItem('keyLanguage') == '' || localStorage.getItem('keyLanguage') == 'vi') {
            this.LIST_API_STATE.forEach(element => {
                element.value = element.vi;
            });
        }
        return this.LIST_API_STATE;
    }

    static getListStatus(): any {
        if (localStorage.getItem('keyLanguage') == undefined || localStorage.getItem('keyLanguage') == '' || localStorage.getItem('keyLanguage') == 'vi') {
            this.LIST_STATUS.forEach(element => {
                element.value = element.vi;
            });
        }
        return this.LIST_STATUS;
    }

    static getListDocumentType() {
        return this.LIST_DOCUMENT_TYPE;
    }

    static getListSourceType() {
        return this.LIST_SOURCE_TYPE;
    }

    static getListGrantType() {
        return this.LIST_GRANT_TYPE;
    }

    static getListBlockConditionType() {
        return this.BLOCK_CONDITION_TYPE;
    }

    static getListPolicyType() {
        return this.LIST_POLICY_TYPE;
    }

    static getListQuotaType() {
        return this.LIST_QUOTA_TYPE;
    }

    static getListIpConditionType() {
        return this.LIST_IP_CONDITION_TYPE;
    }

    static getListDirectional() {
        return this.LIST_DIRECTIONAL;
    }

    static getListApiMethod() {
        return this.LIST_API_METHOD;
    }

    static getApiStateById(id: number): string {
        let stateStr = "";
        this.LIST_API_STATE.forEach(element => {
            if (id == element.id) {
                stateStr = element.value;
            }
        });
        return stateStr;
    }

    static getStatusById(id: number): string {
        let statusStr = "";
        this.LIST_STATUS.forEach(element => {
            if (id == element.id) {
                statusStr = element.value;
            }

        });
        return statusStr;
    }

    static getDocumentTypeById(id: number) {
        let documentTypeStr = "";
        this.LIST_DOCUMENT_TYPE.forEach(element => {
            if (id == element.id) {
                documentTypeStr = element.value;
            }
        });
        return documentTypeStr;
    }

    static getSourceTypeById(id: number) {
        let sourceTypeStr = "";
        this.LIST_SOURCE_TYPE.forEach(element => {
            if (id == element.id) {
                sourceTypeStr = element.value;
            }
        });
        return sourceTypeStr;
    }

    static getGrantTypeById(id: number) {
        let grantTypeStr = "";
        this.LIST_GRANT_TYPE.forEach(element => {
            if (id == element.id) {
                grantTypeStr = element.value;
            }
        });
        return grantTypeStr;
    }

    static getPolicyTypeById(id: number) {
        let policyTypeStr = "";
        this.LIST_POLICY_TYPE.forEach(element => {
            if (id == element.id) {
                policyTypeStr = element.value;
            }
        });
        return policyTypeStr;
    }

    static getQuotaTypeById(id: number) {
        let quotaTypeStr = "";
        this.LIST_QUOTA_TYPE.forEach(element => {
            if (id == element.id) {
                quotaTypeStr = element.value;
            }
        });
        return quotaTypeStr;
    }

    static getIpconDitionTypeById(id: number) {
        let ipconDitionTypeStr = "";
        this.LIST_IP_CONDITION_TYPE.forEach(element => {
            if (id == element.id) {
                ipconDitionTypeStr = element.value;
            }
        });
        return ipconDitionTypeStr;
    }

    static getDirectionalById(id: number) {
        let directionalStr = "";
        this.LIST_DIRECTIONAL.forEach(element => {
            if (id == element.id) {
                directionalStr = element.value;
            }
        });
        return directionalStr;
    }
}