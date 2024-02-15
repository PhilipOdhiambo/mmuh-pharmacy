import { Component, OnInit } from '@angular/core';
import { WorkloadTransaction } from '../../types';
import { AppService } from '../../app.service';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-emergency-orders',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './emergency-orders.component.html',
  styleUrl: './emergency-orders.component.css'
})
export class EmergencyOrdersComponent implements OnInit {
  emergencyOrders:WorkloadTransaction[] = []

  constructor
  (private appService:AppService,

    ) {
    this.appService.$workloadTransactions.subscribe(res => {
      this.emergencyOrders =  (res as WorkloadTransaction[]).filter(e => {
        return (e.Cartegory == 'emergency')
      })
    })
    
  }

  ngOnInit(): void {
    
    
  }
}
