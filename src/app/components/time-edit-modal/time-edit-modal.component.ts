import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-time-edit-modal',
  standalone: true,
  imports: [],
  templateUrl: './time-edit-modal.component.html',
  styleUrl: './time-edit-modal.component.css'
})
export class TimeEditModalComponent {
  @Input()
  title:string = 'dd';
  @Input()
  cartegory:string = '';

}
