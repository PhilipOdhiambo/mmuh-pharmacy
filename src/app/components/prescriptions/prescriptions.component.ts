import { Component } from '@angular/core';
import { TimeEditModalComponent } from '../time-edit-modal/time-edit-modal.component';

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  imports: [
    TimeEditModalComponent
  ],
  templateUrl: './prescriptions.component.html',
  styleUrl: './prescriptions.component.css'
})
export class PrescriptionsComponent {
  timeModelTitle:string =''
  cartegory:string = 'outpatient'

}
