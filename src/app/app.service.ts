import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take, lastValueFrom} from 'rxjs';
import { map} from 'rxjs/operators'
import { WorkloadTransaction } from './types';

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


  getNextTally(param: string,cartegory:string) {
    const $request = this.doGet(param).pipe(
      map(arr => arr.reduce((acc:any,next:any)=>{
        let curr = next as WorkloadTransaction;
       if (((new Date(curr.Date)) == (new Date())) &&  curr.Cartegory == cartegory) {
         let currTallyNo = parseInt(curr.tallyNo.replace(/\D/g, ''))
         return currTallyNo > acc ? currTallyNo : acc
       }
       return acc;
     }, 0))
    )
    return lastValueFrom($request).then(res => res + 1)
  }


  saveOutpatient(opdDoc:any) {
    this.doPost('outpatients','update',[opdDoc])
  }

}



