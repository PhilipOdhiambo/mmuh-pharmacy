import { Component, Input, inject } from '@angular/core';
import { Inventory } from '../../types';
import { TracerService } from '../../services/tracer.service';

@Component({
  selector: 'app-tracer-status',
  standalone: true,
  imports: [],
  styles: ``,
  template:`
  @if (loadingState) {
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  

} @else {
    <div class="form-check form-switch">
        <input id="availability" [checked]="item.IsAvailable==1" (click)="statusChange()" class="form-check-input" type="checkbox" >
    </div>               
} 
  `
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
