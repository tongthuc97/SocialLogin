/**
 * @description every api when starting a publish process will create a process instance
 * the class contains infomation of the process instance
 */
export class ProcessInstance {
    /* the id of the api */
    apiVersionId: number;
    /* the id of the process instance */
    processInstanceId: string;
    /* the id of the deployment */
    deploymentId: string;
    /* the id of the process definition */
    processDefinitionId: string;
}