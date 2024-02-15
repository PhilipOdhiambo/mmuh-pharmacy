import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {FormsModule} from '@angular/forms';
import { AppService } from '../../app.service';
import { CommonModule} from '@angular/common';
import { Inventory, WorkloadTransaction } from '../../types';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-prescriptions-new',
  standalone: true,
  imports: [
    FormsModule,CommonModule
  ],
  templateUrl: './prescriptions-new.component.html',
  styleUrl: './prescriptions-new.component.css'
})
export class PrescriptionsNewComponent implements OnInit {
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
  $inventorySubscription!:Subscription
  inventory: Inventory [] = []
  filteredInventory:Inventory[] = []
  invetoryFetching = true;

  searchInput!:HTMLInputElement
  
  @ViewChild('osDialog',{static:true}) osDialog!:ElementRef 

  @Output() onModalClose = new EventEmitter()

  constructor(private appService: AppService, private el:ElementRef){
    this.fetchInventory();
  }
  ngOnInit(): void {
    this.searchInput = document.getElementById("searchbox") as HTMLInputElement
  }

  fetchInventory() {
    this.invetoryFetching = true;
    this.appService.$inventory.subscribe(res => {
      this.inventory = res
      this.filteredInventory = res
      this.invetoryFetching = false
    })
  }

  filterInventory() {
    const search  = this.searchInput.value
    this.filteredInventory = this.inventory.filter(item => {
      const regex = new RegExp('^' + search + '| ' + search + '|\\(' + search, 'i')
        if (regex.test(item.Code) || regex.test(item.BrandName) || regex.test(item.GenericDescription)) {
          return true
        }
        return false
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

  onInventoryDropdownClick(item:Inventory) {
    this.osList.push(item)
    this.searchInput.value = ''
  }
  

  close() {
    this.onModalClose.emit(true)
  }

  

}
