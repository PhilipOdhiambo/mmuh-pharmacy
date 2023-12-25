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
  billStart = new Date()
  billEnd:any
  dispenseStart:any
  dispenseEnd:any
  user:any
  tallyNo:any
  itemsOrdered:any
  itemsUsubstitutable = 0

  constructor(private appService: AppService){}

  async save() {
    const utils = await this.appService.getUtils()
    const nextTally = 'P' + await this.appService.getNextTally('sheetName=outpatients')
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
    
  }

  

}
