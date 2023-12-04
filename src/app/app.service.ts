import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url = 'https://script.google.com/macros/s/AKfycbwHLul95aulaj0YUsvE-BEfDqOg6lYgbM-r1RbrUvUrwzFgw9MjvO_st4o7Ex0gb1fV/exec?sheet=inventory'

  constructor(private http:HttpClient) { }
  fetchData():Observable<any> {
    return this.http.get(this.url)
  }
}
