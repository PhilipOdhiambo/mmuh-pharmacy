import { Component, OnInit, inject } from '@angular/core';
import { TracerService } from '../../../tracer.service';
import { Inventory } from '../../../types';

@Component({
  selector: 'app-tracer-list',
  standalone: true,
  imports: [],
  templateUrl: './tracer-list.component.html',
  styleUrl: './tracer-list.component.css'
})
export class TracerListComponent implements OnInit {

  tracerService = inject(TracerService)
  tracerList:Inventory[] = []


  constructor(){}

  onButtonChange(e:Event){
    
    console.log('dd')

  }

  ngOnInit(): void {    
    this.tracerService.getAllTracerList().subscribe(res => this.tracerList = res)
  }


}
