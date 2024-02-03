import { Component, OnInit } from '@angular/core';
import { TimeEditModalComponent } from '../time-edit-modal/time-edit-modal.component';
import { AppService } from '../../app.service';
import {map} from 'rxjs/operators';
import { DatePipe, NgIf } from '@angular/common';
import { PrescriptionsNewComponent } from '../prescriptions-new/prescriptions-new.component';

export interface ActiveRowI {
  prescription:any,
  editField:any
}

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  imports: [
    TimeEditModalComponent,
    DatePipe,PrescriptionsNewComponent,NgIf
  ],
  templateUrl: './prescriptions.component.html',
  styleUrl: './prescriptions.component.css'
})
export class PrescriptionsComponent implements OnInit{

  activeRow!:ActiveRowI
  prescriptions:any = []
  showUpdateModal = false
  showCreateModal = false
  constructor(private dataService:AppService) {}

  ngOnInit() {
    this.dataService.doGet("sheetName=outpatients")
    .pipe(
      map(oupatients => oupatients.filter((p:any) => p.Cartegory == 'prescription'))
    )
    .subscribe(pres => this.prescriptions= pres)
  }

  activePresc(editField:string,presc:any){
  
    this.activeRow = {editField:editField,prescription:presc}
    this.showUpdateModal = true
  }

  onDeletePresc(presc:any) {
    this.dataService.doPost("outpatients","delete",[presc]).subscribe(res => window.location.reload())
  }

  onCreateModalClose() {
    this.showCreateModal = false
  }

  closeModal(event:Event) {
    this.showUpdateModal = false
  }


}




