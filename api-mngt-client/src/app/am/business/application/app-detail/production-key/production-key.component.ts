import { Component, OnInit } from '@angular/core';
import { Application } from '../../application';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../application.service';

@Component({
  selector: 'app-production-key',
  templateUrl: './production-key.component.html',
})
export class ProductionKey implements OnInit {

  private sub: any;
  public application: Application;
  public applicationId: number;
  public isHideKeys: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
  ) { }

  ngOnInit() {
    this.applicationId = this.route.snapshot.parent.params['applicationId'];
    this.applicationService.findOne(this.applicationId)
      .then(response => {
        this.application = response;
        console.log(response);
      })
      .catch(error => console.log("errors: " + error));
  }

  showKeys() {
    this.isHideKeys = false;
  }

  hideKeys() {
    this.isHideKeys = true;
  }

}