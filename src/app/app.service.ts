import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url = 'https://script.google.com/macros/s/AKfycbzPJ75D_tyT18zLgJP4oedBCY9AekwO1GkaztuODzpJJhx12hbopUFs1XrfwUAuR-iPJQ/exec?'

  constructor(private http: HttpClient) { }
  doGet(params: string): Observable<any> {
    return this.http.get(this.url + params)
  }

  doPost(sheetName:string, method: string, data: any) {
    return this.http.post(this.url + 'sheetName=' + sheetName + '&method=' + method, JSON.stringify(data))
  }

  getUtils() {
    const request$ = this.doGet('utils=true').pipe(take(1))
    return lastValueFrom(request$).then(data => {
      return data;
    })
  }

  getNextTally(param: string) {
    const $request = this.doGet(param).pipe(
      take(1),
      map(arr => arr.reduce((acc: any, curr: any) => {
        if (!acc.length || curr.Date > acc[0].Date) {
          return [curr];
        } else if (curr.Date == acc[0].Date) {
          acc.push(curr);
        }
        return acc;
      }, [])),
      map(data => data.reduce((prev: any, curr: any) => {
        return curr.tallyNo > prev.tallyNo ? curr : prev;
      })
      )
    )
    return lastValueFrom($request).then(obj => {
      const lastDate = new Date(obj.Date).getDate()
      const todayDate = new Date().getDate()

      if (lastDate < todayDate) {
        const tallyNo: number = 1
        return tallyNo
      }
      return parseInt(obj.tallyNo.replace(/\D/g, '')) + 1
    })
  }

  saveOutpatient(opdDoc:any) {
    this.doPost('outpatients','update',[opdDoc])
  }

}



