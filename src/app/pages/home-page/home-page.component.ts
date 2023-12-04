import { Component } from '@angular/core';
import { PrescriptionsComponent } from '../../components/prescriptions/prescriptions.component';
import { TsheetOrdersComponent } from '../../components/tsheet-orders/tsheet-orders.component';
import { EmergencyOrdersComponent } from '../../components/emergency-orders/emergency-orders.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [PrescriptionsComponent,TsheetOrdersComponent,EmergencyOrdersComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
