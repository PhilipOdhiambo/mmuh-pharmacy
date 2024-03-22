import { Component, OnInit, inject } from '@angular/core';
import { TracerService } from '../../services/tracer.service';
import { Inventory } from '../../types';
import { TracerStatusComponent } from './tracer-status.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-tracer-list',
  standalone: true,
  imports: [TracerStatusComponent,AsyncPipe],
  styles: ``,
  template:`
  <table class="table table-sm table-hover">
    <thead >
        <tr class="row">
            <th scope="col" class="col-1">Code</th>
            <th scope="col" class="col-4" >Name</th>
            <th scope="col" class="col-1">Status</th>
            <th scope="col" class="col-1"></th>
        </tr>

    </thead>
    <tbody>
        @for (item of tracerService.$tracerList|async; track $index) {
        <tr class="row">
            <td class="col-1">
                {{item.Code}}
            </td>
            <td class="col-4">
                {{item.GenericDescription}}
            </td>
            <td class="col-1">
               <app-tracer-status [item]="item"></app-tracer-status>          
            </td>
            
            <td class="col-1">
                {{item.IsAvailable==1?'Available':'Out of stock'}}
         
            </td>
        </tr>
        }

    </tbody>
</table>
  `
})
export class TracerListComponent implements OnInit {

  tracerService = inject(TracerService)

  constructor(){
  }



  ngOnInit(): void {    
    this.tracerService.getAllTracerList().subscribe(res => this.tracerService.$tracerList.next(res))
  }


}
