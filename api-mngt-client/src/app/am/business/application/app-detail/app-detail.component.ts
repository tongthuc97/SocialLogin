import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscriber } from '../../subscriber/subscriber';
import { Application } from '../application';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-app-detail',
  templateUrl: './app-detail.component.html',
  styleUrls: ['./app-detail.component.css'],
  providers: [ApplicationService]
})
export class AppDetailComponent implements OnInit {
  private sub: any;
  public applicationId: number;
  public application = new Application();  
  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.applicationId = params['applicationId'];
    });

    this.applicationService.findOne(this.applicationId)
      .then(response => {
        this.application = response;
      })
      .catch(error => console.log("errors: " + error));
  }

}
