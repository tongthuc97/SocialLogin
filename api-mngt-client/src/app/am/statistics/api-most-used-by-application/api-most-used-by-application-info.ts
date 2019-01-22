import { ApiUsedByApplication } from './api-most-used-by-application';
import { PageInfo } from '../../common/util/page-info';

export class ApiUsedByApplicationInfo extends PageInfo{
    content: ApiUsedByApplication[];
}