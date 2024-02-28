import { Injectable, inject } from '@angular/core';
import { Inventory } from './types';
import { } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class TracerService {
  protected tracerList: Inventory[] = []

  protected url = 'https://script.google.com/macros/s/AKfycbzPJ75D_tyT18zLgJP4oedBCY9AekwO1GkaztuODzpJJhx12hbopUFs1XrfwUAuR-iPJQ/exec?'

  http = inject(HttpClient)
  constructor() {
    
   }

  getAllTracerList():Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.url + "sheetName=inventory").pipe(
      map(items=> items.filter(item => item.IsTracerItem == 1))
    )
  }
}
