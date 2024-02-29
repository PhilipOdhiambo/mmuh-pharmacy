import { Component, OnInit } from '@angular/core';
import { TimeEditModalComponent } from '../time-edit-modal/time-edit-modal.component';
import { AppService } from '../../app.service';
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
  cartegory = 'prescription'
  tallyPrefix = 'P'
  activeRow!:ActiveRowI
  prescriptions:any = []
  showUpdateModal = false
  showCreateModal = false
  constructor(private dataService:AppService) {}

  ngOnInit() {
    this.fetchPrescriptions()
  }


  fetchPrescriptions() {
    // this.dataService.getWorkload("prescription").then(res => this.prescriptions = res)
  }


  activePresc(editField:string,presc:any){
  
    this.activeRow = {editField:editField,prescription:presc}
    this.showUpdateModal = true
  }

  async onDeletePresc(presc:any) {
    await this.dataService.doPost("outpatients","delete",[presc]).then(data => {
      this.fetchPrescriptions()
    })
  }

  onCreateModalClose() {
    this.fetchPrescriptions()
    this.showCreateModal = false
  }

  closeModal(event:Event) {
    this.showUpdateModal = false
  }


}




