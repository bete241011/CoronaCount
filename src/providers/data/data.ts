import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { _throw as throwError } from 'rxjs/observable/throw';

import { RegionAffectedCases } from '../../models/regionAffectedCases';
import { CoronaCountError } from "../../models/coronaCountError";

@Injectable()
export class DataProvider {

  regionAffected = 'all';
  baseUrl = "https://disease.sh/v3/covid-19";

  constructor(private http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

  setRegionAffected(region: string): void {
    this.regionAffected = region;
  }

  fetchRegionAffectedActualData(): Observable<RegionAffectedCases | CoronaCountError>{
    const regionAffected = this.regionAffected.includes('Oceania')? "Australia%2FOceania" : this.regionAffected;
    const url = regionAffected.includes('all')
      ? `${this.baseUrl}/${regionAffected}`
      : `${this.baseUrl}/continents/${regionAffected}`
    return this.http.get<RegionAffectedCases>(`${url}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<CoronaCountError>{
    let dataError = new CoronaCountError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.'

    return throwError(dataError);
  }



}
