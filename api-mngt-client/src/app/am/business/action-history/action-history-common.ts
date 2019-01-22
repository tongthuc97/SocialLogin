export class ActionHistoryCommon {
    private static actionHistoryActionField = [
        {id: 'Created', value: 'Created'},
        {id: 'Updated', value: 'Updated'},
        {id: 'Deleted', value: 'Deleted'},
        {id: 'Login', value: 'Login'},
        {id: 'Logout', value: 'Logout'}
    ];

    private static actionHistoryModuleField = [
        {id: 'Login', value: 'Login', disabledStatus:'false'},
        {id: 'Logout', value: 'Logout', disabledStatus:'false'},
        //{id: 'API', value: 'API', disabledStatus:'true'},
        {id: 'API', value: 'API', disabledStatus:'false'},
        {id: 'API Document', value: 'API Document', disabledStatus:'false'},
        {id: 'API Endpoint', value: 'API Endpoint', disabledStatus:'false'},
        {id: 'API Lc Event', value: 'API Lc Event', disabledStatus:'false'},
        {id: 'API Method Parameter', value: 'API Method Parameter', disabledStatus:'false'},
        {id: 'API Url Mapping', value: 'API Url Mapping', disabledStatus:'false'},
        {id: 'API Version', value: 'API Version', disabledStatus:'false'},
        //{id: 'APPLICATION', value: 'APPLICATION', disabledStatus:'true'},
        {id: 'Application', value: 'Application', disabledStatus:'false'},
        {id: 'Application Token', value: 'Application Token', disabledStatus:'false'},
        //{id: 'CONDITION', value: 'CONDITION', disabledStatus:'true'},
        {id: 'Condition Group', value: 'Condition Group', disabledStatus:'false'},
        {id: 'Block Condition', value: 'Block Condition', disabledStatus:'false'},
        {id: 'Header Field Condition', value: 'Header Field Condition', disabledStatus:'false'},
        {id: 'IP Condition', value: 'IP Condition', disabledStatus:'false'},
        {id: 'JWT Claim Condition', value: 'JWT Claim Condition', disabledStatus:'false'},
        {id: 'Query Parameter Condition', value: 'Query Parameter Condition', disabledStatus:'false'},
        //{id: 'CATEGORY', value: 'CATEGORY', disabledStatus:'true'},
        {id: 'Province', value: 'Province', disabledStatus:'false'},
        {id: 'District', value: 'District', disabledStatus:'false'},
        {id: 'Ward', value: 'Ward', disabledStatus:'false'},
        {id: 'Ministry', value: 'Ministry', disabledStatus:'false'},
        {id: 'Department', value: 'Department', disabledStatus:'false'},
        {id: 'Subscriber', value: 'Subscriber', disabledStatus:'false'},
        {id: 'Subscription', value: 'Subscription', disabledStatus:'false'},
        {id: 'Policy', value: 'Policy', disabledStatus:'false'}
    ];

    public static getActionHistoryActionField(){
        return JSON.parse(JSON.stringify(this.actionHistoryActionField));
    }

    public static getActionHistoryModuleField(){
        return JSON.parse(JSON.stringify(this.actionHistoryModuleField));
    }
}