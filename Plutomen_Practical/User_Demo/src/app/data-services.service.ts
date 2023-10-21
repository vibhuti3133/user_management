import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {
  private dataUrl = 'data.json';
  constructor(private http: HttpClient) { }

  getStates(): Observable<any> {
    return this.http.get(this.dataUrl).pipe(
      map((data: any) => data.states)
    );
  }

  getCountries(): Observable<any> {
    return this.http.get(this.dataUrl).pipe(
      map((data: any) => data.countries)
    );
  }
}
