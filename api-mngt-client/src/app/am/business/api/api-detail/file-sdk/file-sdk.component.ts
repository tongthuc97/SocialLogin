import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AppConfig } from '../../../../../app.config';

const UPLOAD_FILE_URL = AppConfig.settings.baseUrl + 'apidocuments/upload';

@Component({
  selector: 'app-file-sdk',
  templateUrl: './file-sdk.component.html',
})
export class FileSdk implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
