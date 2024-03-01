import { Component, Input, inject } from '@angular/core';
import { Inventory } from '../../../types';
import { TracerService } from '../../../tracer.service';

@Component({
  selector: 'app-tracer-status',
  standalone: true,
  imports: [],
  templateUrl: './tracer-status.component.html',
  styleUrl: './tracer-status.component.css'
})
export class TracerStatusComponent {
  @Input() item!:Inventory
  loadingState = false;
  tracerService = inject(TracerService)

  statusChange() {
    this.loadingState = true
    let status =this.item.IsAvailable == 1? 0 : 1
    this.tracerService.editTracer(this.item.Id,status).subscribe(res=> {
      console.log(res)
      this.tracerService.$tracerList.next(res)
      this.loadingState = false
    })
  }

}
