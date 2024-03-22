import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { EmergencyI, PrescriptionI } from '../types';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService extends UrlService {

  emergencies = new BehaviorSubject<EmergencyI[]>([])

  constructor() {
    super();
  }

  fetchAll() {
    this.http.get<EmergencyI[]>(this.url + "collection=emergency").subscribe(res => {
      this.emergencies.next(res)
    })
  }

  fetchOne(id: string) {

    return this.http.post<EmergencyI>(this.url + "collection=emergency&method=fetchOne", JSON.stringify(id))
      .pipe(take(1))

  }

  async create(presc: EmergencyI) {
    this.http.post<EmergencyI[]>(this.url + "collection=emergency&method=create", JSON.stringify(presc))
      .subscribe(res => this.emergencies.next(res))

  }

  async edit(presc: EmergencyI) {
    this.http.post<EmergencyI[]>(this.url + "collection=emergency&method=update", JSON.stringify(presc))
      .subscribe(res => this.emergencies.next(res))
  }

  async deleteOne(timestamp:string) {
    this.http.post(this.url + "collection=emergency&method=delete", JSON.stringify(timestamp))
      .subscribe(res => console.log(res))
  }

  deleteAll() {
    // To be implemented
  }
}
