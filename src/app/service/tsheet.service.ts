import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrescriptionI } from '../types';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class TsheetService extends UrlService {

  constructor() {
    super();
  }
  fetchAll(): Observable<PrescriptionI[]> {
    return this.http.get<PrescriptionI[]>(this.url + "collection=tsheet")
  }

  create(presc: PrescriptionI) {
    
    return this.http.post<PrescriptionI[]>(this.url + "collection=tsheet&method=create", JSON.stringify(presc))

  }

  edit(presc: PrescriptionI): Observable<PrescriptionI[]> {
    let data = presc
    return this.http.post<PrescriptionI[]>(this.url + "collection=tsheet&method=update", JSON.stringify(data))
  }

}
