import { Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

import {FormsModule} from '@angular/forms';
import { AppService } from '../../app.service';
import { CommonModule} from '@angular/common';
import { Inventory, WorkloadTransaction } from '../../types';


@Component({
  selector: 'app-prescriptions-new',
  standalone: true,
  imports: [
    FormsModule,CommonModule
  ],
  templateUrl: './prescriptions-new.component.html',
  styleUrl: './prescriptions-new.component.css'
})
export class PrescriptionsNewComponent {

  osList:any[] = []
  @Input() cartegory!:string
  @Input() tallyPrefix!:string
  billStart = new Date()
  billEnd:any
  dispenseStart:any
  dispenseEnd:any
  user:any
  tallyNo:any
  itemsOrdered:any
  itemsUsubstitutable = 0
  saving = false;

  inventory: Inventory [] = []
  invetoryFetching = true;
  
  @ViewChild('osDialog',{static:true}) osDialog!:ElementRef 

  @Output() onModalClose = new EventEmitter()

  constructor(private appService: AppService, private el:ElementRef){
    this.fetchInventory()
  }

  fetchInventory() {
    this.invetoryFetching = true;

    this.appService.doGet("sheetName=inventory").subscribe((res:Inventory []) => {
      this.inventory = res    
      this.invetoryFetching = false
    })
  }

  async save(event:Event) {
    this.saving = true
    const utils = await this.appService.getUtils()
    const nextTally = this.tallyPrefix + await this.appService.getNextTally('sheetName=outpatients', this.cartegory)
    const data:WorkloadTransaction [] = [
      {
        id: utils.id,
        Date: utils.timestamp,
        Cartegory: this.cartegory,
        tallyNo: nextTally,
        itemsOrdered: this.itemsOrdered,
        itemsAvailable: this.itemsOrdered - this.itemsUsubstitutable,
        billStart:this.billStart,
        billEnd: new Date(),
      }
    ]
    await this.appService.doPost('outpatients','create',data)
    this.saving = false
    this.onModalClose.emit()
    
  }

  onSearchClick() {
    this.osDialog.nativeElement.show()
  }
  

  close() {
    this.onModalClose.emit(true)
  }

  

}
