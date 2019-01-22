import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Location } from '@angular/common';
import { ParaSystemService } from '../para-system.service';
import { ParaSystemForm } from '../para-system-form';
import { ParaSystem } from '../para-system';

@Component({
  selector: 'app-para-system-business',
  templateUrl: './para-system-business.component.html',
  styleUrls: ['./para-system-business.component.css']
})
export class ParaSystemBusinessComponent implements OnInit {

  businessParam: string;
  paraSystemId: number;
  paraSystemForm: FormGroup;
  isUpdatingBusiness: boolean = true;
  paraSystem: ParaSystem;

  isHideErrorFormControl: boolean = true;
  paraSystemWithCode: ParaSystem;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private paraSystemService: ParaSystemService
  ) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.initializeParaSystemCreatingForm();

    this.route.params.subscribe(params => {
      this.businessParam = params['business'];

      if (this.businessParam == 'create') {
        this.isUpdatingBusiness = false;
      }
      if (this.businessParam == 'update') {
        this.isUpdatingBusiness = true;
        this.paraSystemId = +params['id'];
        this.initializeParaSystemUpdatingForm();
      }
    });
  }

  initializeParaSystemCreatingForm(){
    this.paraSystemForm = ParaSystemForm.getParaSystemForm(this.fb);
    this.paraSystemForm.patchValue({
      status: 1
    });
  }

  initializeParaSystemUpdatingForm(){
    this.paraSystemService.findOne(this.paraSystemId)
        .then(response => {
          this.paraSystem = response;
          ParaSystemForm.bindingParaSystemToParaSystemForm(this.paraSystemForm, this.paraSystem);
        })
        .catch(error => console.log(error));
  }

  submitParaSystemForm(paraSystem: ParaSystem){
    if(this.isUpdatingBusiness){
      this.paraSystemService.update(paraSystem)
          .then(response => {
            this.goBack();
          })
          .catch(error => {
            this.toastr.error('Fail to update ParaSystem', 'Error!');
            this.isHideErrorFormControl = false;
          });
    } else {
      this.paraSystemService.create(paraSystem)
          .then(response => {
            this.goBack();
          })
          .catch(error => {
            this.toastr.error('Fail to create ParaSystem', 'Error!');
            this.isHideErrorFormControl = false;
          })
    }
  }

  goBack(){
    this.location.back();
  }

  // hasParaSystemWithCode(paraSystemCode: string){
  //   this.paraSystemService.hasParaSystemWithCode(paraSystemCode)
  //       .then(response => {
  //         this.paraSystemWithCode = response;
  //         if(this.isUpdatingBusiness && this.paraSystemWithCode.paraSystemId == this.paraSystem.paraSystemId){
  //           this.paraSystemWithCode = null;
  //         }
  //       })
  //       .catch(error => {
  //         this.paraSystemWithCode = null;
  //       });
  // }

}
