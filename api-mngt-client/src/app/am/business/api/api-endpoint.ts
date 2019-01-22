import { ApiVersion } from './api-detail/api-version/api-version';
export class ApiEndpoint {
  endpointId: number;
  customHeader: string;
  endpointType: number;
  isSecured: number;
  url: string;
  amApiVersion: ApiVersion;
}
