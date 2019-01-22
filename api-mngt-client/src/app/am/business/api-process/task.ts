import { TaskData } from "./task-data";
import { State } from "./state";


/**
 * the api process instance
 */
export class Task {
    /* the id of the api */
    id: number;
    priority: string;
    name: string;
    subject: string;
    description: string;
    taskdataunit: TaskData;
    listState: State[];
    checked: boolean;
}