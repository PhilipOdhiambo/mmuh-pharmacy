import { Component } from '@angular/core';
import { AppService } from '../services/app.service';
import { ActiveRowI } from './prescriptions/prescriptions.component';
import { PrescriptionsNewComponent } from "./prescriptions/prescriptions-new.component";
import { TimeEditModalComponent } from "./time-edit-modal/time-edit-modal.component";
import { DatePipe, NgIf } from '@angular/common';
import { WorkloadTransaction } from '../types';

@Component({
    selector: 'app-tsheet-orders',
    standalone: true,
    styles: ``,
    imports: [PrescriptionsNewComponent, TimeEditModalComponent,
    DatePipe,NgIf
    ],
    template:`
    <div>
    <table class="table">
        <thead>
            <tr>
                <th colspan="2">
                    <button (click)="showCreateModal=true" class="btn btn-primary">Add new</button>
                </th>
                <th></th>
                <th></th>
                <th colspan="2">Turnaround time</th>
                <th></th>

            </tr>
            <tr>
                <th>Order. No</th>
                <th>No. T.Sheets</th>
                <th>No. Items Ordered</th>
                <th>No. Items Availabe</th>
                <th>time started</th>
                <th>time finished</th>
                <th></th>

            </tr>
        </thead>
        <tbody>
            @for (item of cartegoryList; track $index) {
                <tr>
                    <td>{{item.tallyNo}}</td>
                    <td>{{item.noOfDocs}}</td>
                    <td>{{item.itemsOrdered}}</td>
                    <td>{{item.itemsIssued}}</td>
                    <td>
                        @if(!item.dispenseStart) {
                        <button class="btn btn-outline-primary" (click)="activePresc('dispenseTimein',item)">Add</button>
                        } @else {
    
                        <button class="btn" title="click to Edit"
                            (click)="activePresc('dispenseTimein',item)">{{item.dispenseStart | date:'h:mm'}}</button>
                        }
                    </td>
                    <td><button class="btn" title="click to Edit">{{item.dispenseEnd}}</button></td>
                    <td><a href="#" class="bi bi-trash"></a></td>
                </tr>
            }
        </tbody>
    </table>

        <!-- Add New Modal -->    
        <ng-template [ngIf]="showCreateModal">
            <app-prescriptions-new [cartegory]="cartegory" 
            [tallyPrefix]="tallyPrefix"
            (onModalClose)="onCreateModalClose()" />
        
        </ng-template>
    
    
        <!-- update Modal -->
        <ng-template [ngIf]="showUpdateModal">
            <app-time-edit-modal 
            [activeRow]="activeRow"
            (onModalClose)="closeModal($event)"></app-time-edit-modal>
        </ng-template>
</div>

    `
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
