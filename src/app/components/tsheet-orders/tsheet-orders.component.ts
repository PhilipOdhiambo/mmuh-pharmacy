import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { ActiveRowI } from '../prescriptions/prescriptions.component';
import { PrescriptionsNewComponent } from "../prescriptions-new/prescriptions-new.component";
import { TimeEditModalComponent } from "../time-edit-modal/time-edit-modal.component";
import { DatePipe, NgIf } from '@angular/common';
import { WorkloadTransaction } from '../../types';

@Component({
    selector: 'app-tsheet-orders',
    standalone: true,
    templateUrl: './tsheet-orders.component.html',
    styleUrl: './tsheet-orders.component.css',
    imports: [PrescriptionsNewComponent, TimeEditModalComponent,
    DatePipe,NgIf
    ]
})
export class TsheetOrdersComponent {
  cartegory = 'tsheet'
  tallyPrefix = 'T'
  cartegoryList:WorkloadTransaction[] = []
  activeRow!:ActiveRowI
  showUpdateModal = false
  showCreateModal = false
  constructor(private dataService:AppService) {}

  ngOnInit() {
    this.fetchTWorkloadList()
  }


  fetchTWorkloadList() {
    // this.dataService.getWorkload("tsheet").then(res => this.cartegoryList = res)
  }


  activePresc(editField:string,presc:any){
  
    this.activeRow = {editField:editField,prescription:presc}
    this.showUpdateModal = true
  }

  async onDeletePresc(presc:any) {
    await this.dataService.doPost("outpatients","delete",[presc]).then(data => {
      this.fetchTWorkloadList()
    })
  }

  onCreateModalClose() {
    this.fetchTWorkloadList()
    this.showCreateModal = false
  }

  closeModal(event:Event) {
    this.showUpdateModal = false
  }

}
