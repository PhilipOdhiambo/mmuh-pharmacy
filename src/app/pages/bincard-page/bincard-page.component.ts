import { Component } from '@angular/core';
import { TracerListComponent } from '../../components/tracer/tracer-list.component';


@Component({
  selector: 'app-bincard-page',
  standalone: true,
  imports: [TracerListComponent],
  templateUrl: './bincard-page.component.html',
  styleUrl: './bincard-page.component.css'
})
export class BincardPageComponent {

}
