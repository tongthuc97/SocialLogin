import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { ParaSystemService } from '../para-system.service';
import { ParaSystem } from '../para-system';

@Component({
  selector: 'app-para-system-detail',
  templateUrl: './para-system-detail.component.html',
  styleUrls: ['./para-system-detail.component.css']
})
export class ParaSystemDetailComponent implements OnInit {

  paraSystemId: number;
  paraSystem: ParaSystem;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private paraSystemService: ParaSystemService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => params.getAll('id')).subscribe(id => {
        this.paraSystemId = +id;
        this.paraSystemService.findOne(this.paraSystemId)
                                  .then(response => {
                                    this.paraSystem = response;
                                  })
                                  .catch(error => console.log("errors: " +  error));
      });
  }

  goBack() {
    this.location.back();
  }
}

