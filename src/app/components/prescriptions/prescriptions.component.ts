import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TimeEditModalComponent } from '../time-edit-modal/time-edit-modal.component';
import { AppService } from '../../services/app.service';
import { DatePipe, NgIf } from '@angular/common';
import { PrescriptionsNewComponent } from './prescriptions-new.component';
import { PrescriptionService } from '../../services/prescription.service';
import { Subscription } from 'rxjs';
import { PrescriptionI } from '../../types';

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
  styles: ``,
  template: `
  <div>
    <table class="table">
        <thead>
            <tr>
                <th colspan="2">
                    <button class="btn btn-primary" (click)="showCreateModal=true" >Add
                        new</button>
                </th>
                <th></th>
                <th></th>
                <th colspan="2">Billing Turnaround</th>
                <th colspan="2">Dispensing Turnaround</th>

            </tr>
            <tr>
                <th>Presc. No</th>
                <th>No. Items Ordered</th>
                <th>No. Items Availabe</th>
                <th>Time-in</th>
                <th>Time-out</th>
                <th>time-in</th>
                <th>time-out</th>
                <th></th>

            </tr>
        </thead>
        <tbody>
            @for (presc of prescriptions; track $index) {
            <tr>
                <td>{{presc.tallyNo}}</td>
                <td>{{presc.itemsOrdered}}</td>
                <td>{{presc.itemsIssued}}</td>
                <td>
                    @if(!presc.billStart) {
                    <button class="btn btn-outline-primary" (click)="activePresc('billTimein',presc)">Add</button>
                    } @else {}
                    <button class="btn" title="click to Edit"
                        (click)="activePresc('billTimein',presc)">{{presc.billStart | date:'h:mm'}}</button>
                </td>

                <td>
                    @if(!presc.billEnd) {
                    <button class="btn btn-outline-primary" (click)="activePresc('billTimeout',presc)">Add</button>
                    } @else {
                    <button class="btn" title="click to Edit" (click)="activePresc('billTimeout',presc)">{{presc.billEnd
                        | date:'h:mm'}}</button>
                    }
                </td>

                <td>
                    @if(!presc.dispenseStart) {
                    <button class="btn btn-outline-primary" (click)="activePresc('dispenseTimein',presc)">Add</button>
                    } @else {

                    <button class="btn" title="click to Edit"
                        (click)="activePresc('dispenseTimein',presc)">{{presc.dispenseStart | date:'h:mm'}}</button>
                    }
                </td>

                <td>
                    @if(!presc.dispenseEnd) {
                    <button class="btn btn-outline-primary" (click)="activePresc('dispenseTimeout',presc)">Add</button>
                    } @else {
                    <button class="btn" title="click to Edit"
                        (click)="activePresc('dispenseTimeout',presc)">{{presc.dispenseEnd| date:'h:mm'}}</button>
                    }
                </td>
                <td> <button title="Delete Row" class="bi bi-trash btn text-danger" (click)="onDeletePresc(presc.id)"> </button></td>
            </tr>
            }
        </tbody>
    </table>

    <!-- Add New Modal -->    
    <ng-template [ngIf]="showCreateModal">
        <app-prescriptions-new
        [cartegory]="cartegory"
        [tallyPrefix]="tallyPrefix"
        (onModalClose)="onCreateModalClose()" />
    
    </ng-template>

    <!-- update Modal -->
    <ng-template [ngIf]="showUpdateModal">
        <app-time-edit-modal [activeRow]="activeRow" (onModalClose)="closeModal($event)"></app-time-edit-modal>
    </ng-template>

</div>  
  `
})
export class PrescriptionsComponent implements OnInit, OnDestroy{
  cartegory = 'prescription'
  tallyPrefix = 'P'
  activeRow!:ActiveRowI
  // prescriptions:any = []
  showUpdateModal = false
  showCreateModal = false

  prescriptionService = inject(PrescriptionService)
  prescriptions$:Subscription
  prescriptions:PrescriptionI[] = []
  constructor() {
    this.prescriptions$ = this.prescriptionService.prescriptions.subscribe(res=> this.prescriptions = res)
  }

  ngOnInit() {
    this.fetchPrescriptions()
  }
  ngOnDestroy(): void {
      this.prescriptions$.unsubscribe()
  }


  fetchPrescriptions() {
    // this.dataService.getWorkload("prescription").then(res => this.prescriptions = res)
  }


  activePresc(editField:string,presc:any){
  
    this.activeRow = {editField:editField,prescription:presc}
    this.showUpdateModal = true
  }

  async onDeletePresc(prescId:string) {
 
    this.prescriptionService.deleteOne("")
  }

  onCreateModalClose() {
    this.fetchPrescriptions()
    this.showCreateModal = false
  }

  closeModal(event:Event) {
    this.showUpdateModal = false
  }

}




