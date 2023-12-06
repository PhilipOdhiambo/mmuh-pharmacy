import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppService } from '../../app.service';


@Component({
  selector: 'app-prescriptions-new',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './prescriptions-new.component.html',
  styleUrl: './prescriptions-new.component.css'
})
export class PrescriptionsNewComponent {

  osList = []

  cartegory = 'prescription'
  date:any
  billStart:any
  billEnd:any
  dispenseStart:any
  dispenseEnd:any
  user:any
  Id:any
  tallyNo:any
  itemsOrdered = null
  itemsAvailable:any
  itemsSubstituted:any

  constructor(private appService: AppService){}

  async save() {
    const utils = await this.appService.getUtils()
    const nextTally = 'P' + await this.appService.getNextTally('sheetName=outpatients')
    const data = [
      {
        Id: utils.id,
        Date: utils.timestamp,
        Cartegory: this.cartegory,
        tallyNo: nextTally,
        itemsOrdered: this.itemsOrdered,
        itemsAvailable: this.itemsAvailable,
        billStart:this.billStart
      }
    ]
    this.appService.doPost('sheetName=outpatients','method=create',data)
    
  }

  

}
