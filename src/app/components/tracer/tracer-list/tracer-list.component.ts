import { Component, OnInit, inject } from '@angular/core';
import { TracerService } from '../../../tracer.service';
import { Inventory } from '../../../types';
import { TracerStatusComponent } from '../tracer-status/tracer-status.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-tracer-list',
  standalone: true,
  imports: [TracerStatusComponent,AsyncPipe],
  templateUrl: './tracer-list.component.html',
  styleUrl: './tracer-list.component.css'
})
export class TracerListComponent implements OnInit {

  tracerService = inject(TracerService)

  constructor(){
  }



  ngOnInit(): void {    
    this.tracerService.getAllTracerList().subscribe(res => this.tracerService.$tracerList.next(res))
  }


}
