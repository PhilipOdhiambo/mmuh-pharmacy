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
  osList:Inventory[] = []
  @Input() cartegory!:string
  @Input() tallyPrefix!:string
  billStart = new Date()
  billEnd:any
  dispenseStart:any
  dispenseEnd:any
  user:any
  tallyNo:any
  itemsOrdered:any
  itemsSubstituted = 0
  numberOfDocs?:number
  saving = false;

  inventory: Inventory [] = []
  invetoryFetching = true;
  
  @ViewChild('osDialog',{static:true}) osDialog!:ElementRef 

  @Output() onModalClose = new EventEmitter()

  constructor(private appService: AppService, private el:ElementRef){
    this.fetchInventory();
  }

  fetchInventory() {
    this.invetoryFetching = true;

    this.appService.doGet("sheetName=inventory").subscribe((res:Inventory []) => {
      this.inventory = res    
      this.invetoryFetching = false
    })
  }

  updateSubstitute(event:Event) {
    if((event.target as HTMLInputElement).checked) {
      this.itemsSubstituted += 1
    } else {
      this.itemsSubstituted -= 1
    }
    
    }

  async save(event:Event) {
    this.saving = true
    const utils = await this.appService.getUtils()
    const nextTally = this.tallyPrefix + await this.appService.getNextTally('sheetName=outpatients', this.cartegory)
    let itemsIssued = this.itemsOrdered - this.osList.length + this.itemsSubstituted
    let fillRatePercent = (itemsIssued/this.itemsOrdered) * 100;
    const data:WorkloadTransaction [] = [
      {
        id: utils.id,
        Date: utils.timestamp,
        Cartegory: this.cartegory,
        tallyNo: nextTally,
        noOfDocs: this.numberOfDocs,
        itemsOrdered: this.itemsOrdered,
        itemsOs:this.osList.length || 0,
        osSubstituted: this.itemsSubstituted,
        itemsIssued,
        fillRatePercent,
        billStart:this.billStart,
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
