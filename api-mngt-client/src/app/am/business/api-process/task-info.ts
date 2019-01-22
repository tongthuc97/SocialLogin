import { PageInfo } from '../../common/util/page-info';
import { Task } from './task';
export class TaskInfo extends PageInfo {
    content: Task[];

    public choosePage(numberPage: number){
        this.choosePage(numberPage);
    }
}