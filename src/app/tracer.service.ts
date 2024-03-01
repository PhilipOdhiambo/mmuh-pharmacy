import { Injectable, inject } from '@angular/core';
import { Inventory } from './types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class TracerService {
  tracerList: Inventory[] = []
  $tracerList = new BehaviorSubject<Inventory[]>([])

  protected url = 'https://script.google.com/macros/s/AKfycbyCXL4xA1YreJ4l9fGk0OVhKNs0hUrr305COhs7iD-zYRw4pvxrhwir7ftLvTNIxJgvrg/exec?'

  constructor(private http:HttpClient) {
    
   }

  getAllTracerList():Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.url + "collection=tracer")
  }

  editTracer(id:string,value:number):Observable<Inventory[]>{
    let data = {Id:id,value}
    return this.http.post<Inventory[]>(this.url + "collection=tracer&method=update",JSON.stringify(data))
  }
}
