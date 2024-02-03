import { Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

import {FormsModule} from '@angular/forms';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs';
import { CommonModule} from '@angular/common';


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

  cartegory = 'prescription'
  billStart = new Date()
  billEnd:any
  dispenseStart:any
  dispenseEnd:any
  user:any
  tallyNo:any
  itemsOrdered:any
  itemsUsubstitutable = 0
  inventory$:Observable<any>
  
  @ViewChild('osDialog',{static:true}) osDialog!:ElementRef 

  @Output() onModalClose = new EventEmitter()

  constructor(private appService: AppService, private el:ElementRef){
    this.inventory$ =  this.appService.doGet("sheetName=inventory")
  }

  async save(event:Event) {
    const utils = await this.appService.getUtils()
    const nextTally = 'P' + await this.appService.getNextTally('sheetName=outpatients', 'prescriptions')
    const data = [
      {
        id: utils.id,
        Date: utils.timestamp,
        Cartegory: this.cartegory,
        tallyNo: nextTally,
        itemsOrdered: this.itemsOrdered,
        itemsAvailable: this.itemsOrdered - this.itemsUsubstitutable,
        billStart:this.billStart,
        billEnd: new Date()
      }
    ]
    this.appService.doPost('outpatients','create',data)
    this.el.nativeElement.close()
    
  }

  onSearchClick() {
    this.osDialog.nativeElement.show()
  }
  

  close() {
    this.onModalClose.emit(true)
  }

  

}
