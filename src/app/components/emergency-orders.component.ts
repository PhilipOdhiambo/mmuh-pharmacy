import { Component, OnInit, inject } from '@angular/core';
import { WorkloadTransaction } from '../types';
import { AppService } from '../services/app.service';
import { DatePipe, NgIf } from '@angular/common';
@Component({
  selector: 'app-emergency-orders',
  standalone: true,
  imports: [
    DatePipe
  ],
  styles:`

  `,
  template: `
  <div>
    <table class="table">
        <thead>
            <tr>
                <th colspan="2">
                    <button class="btn btn-primary">Add new</button>
                </th>
                <th></th>
                <th></th>
                <th colspan="2">Billing Turnaround</th>
                <th colspan="2">Dispensing Turnaround</th>

            </tr>
            <tr>
                <th>Doc. No</th>
                <th>No. Items Ordered</th>
                <th>No. Items Availabe</th>
                <th>Billing Start</th>
                <th>Billing End</th>
                <th>Dispense Start</th>
                <th>Dispense End</th>
                <th></th>

            </tr>
        </thead>
        <tbody>
            @for (item of emergencyOrders; track $index) {

                <tr>
                    <td>{{item.tallyNo}}</td>
                    <td>{{item.itemsOrdered}}</td>
                    <td>{{item.itemsIssued}}</td>
                    <td><button class="btn" title="click to Edit">{{item.billStart|date:'h:mm'}}</button></td>
                    <td title="Click to Edit"><button class="btn" title="click to Edit">{{item.billEnd|date:'h:mm'}}</button></td>
                    <td><button class="btn" title="click to Edit">{{item.dispenseStart|date:'h:mm'}}</button></td>
                    <td><button class="btn" title="click to Edit">{{item.dispenseEnd|date:'h:mm'}}</button></td>
                    <td><a href="#" class="bi bi-trash"></a></td>
                </tr>
            }
        </tbody>
    </table>
</div>
  `
})
export class EmergencyOrdersComponent implements OnInit {
  emergencyOrders:WorkloadTransaction[] = []
  appService = inject(AppService)

  constructor() {
    this.appService.$workloadTransactions.subscribe(res => {
      this.emergencyOrders =  (res as WorkloadTransaction[]).filter(e => {
        return (e.Cartegory == 'emergency')
      })
    })
    
  }

  ngOnInit(): void {
    
    
  }
}
