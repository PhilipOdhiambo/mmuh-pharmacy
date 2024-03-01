import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inventory } from '../types';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService extends UrlService {

  $tracerList = new BehaviorSubject<Inventory[]>([])

  constructor() { 
    super()
  }

  getAllTracerList():Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.url + "collection=tracer")
  }
  
}
