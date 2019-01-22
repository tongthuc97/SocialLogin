
/**
 * the api process instance
 */
export class TaskData {
    /* the id of the api */
    status: string;
    previousStatus: string;
    actualowner: string;
    createdby: string;
    createdon: Date;
    activationtime: Date;
    expirationtime: Date;
    skipable: boolean;
    workitemid: number;
    processinstanceid: number;
    documenttype: string;
    documentaccesstype: string;
    documentcontentid: number;
    outputtype: string;
    outputaccesstype: string;
    outputcontentid: number;
    faultcontentid: number;
    parentid: number;
    processdefinitionid: string;
    processsessionid: number;
    deploymentid: string;
}