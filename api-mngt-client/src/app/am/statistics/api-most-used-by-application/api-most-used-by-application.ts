 /**
  * @description: Các thuộc tính của danh mục Sử dụng dịch vụ theo ứng dụng .
  */
export class ApiUsedByApplication {
    applicationId: number;
    applicationName: string;
    apiVersionId: number;
    apiName: string;
    apiVersion: string;
    requestCount: number;
    checked: boolean;
}