/**
 * the state of the api a publish process
 */
export class ApiState {
    /* the id of the apiVersion*/
	apiVersionId: number;
	/* the id of the apiVersion*/
	taskId: number;
	/* the state of the apiVersion */
	state: number;
	/* the process content */
	processContent: string;
}