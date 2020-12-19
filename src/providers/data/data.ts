import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { _throw as throwError } from 'rxjs/observable/throw';

import { RegionAffectedCases } from '../../models/regionAffectedCases';
import { CoronaCountError } from "../../models/coronaCountError";
import { CountriesAffected } from '../../models/countriesAffected';
import { CountryCases } from '../../models/countryCases';

@Injectable()
export class DataProvider {

  regionAffected = 'all';
  baseUrl = "https://disease.sh/v3/covid-19";

  constructor(private http: HttpClient) {
  }

  setRegionAffected(region: string): void {
    this.regionAffected = region;
  }

  private handleError(error: HttpErrorResponse): Observable<CoronaCountError>{
    let dataError = new CoronaCountError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.'

    return throwError(dataError);
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

  refreshCurrentRegionAffectedData(){
    return this.fetchRegionAffectedActualData();
  }

  fetchCountriesAffected(): Observable<CountriesAffected[] | CoronaCountError>{
    const countriesAffected = this.http.get<CountriesAffected[]>(`${this.baseUrl}/countries?sort=cases`)
      .pipe(
        catchError(this.handleError)
      );

    return countriesAffected;
  }

  fetchCountryActualData(country): Observable<CountryCases | CoronaCountError>{
    const countryCases = this.http.get<CountryCases>(`${this.baseUrl}/countries/${country}?strict=true`)
      .pipe(
        catchError(this.handleError)
      );

    return countryCases;
  }

  fetchCountryYesterdayData(country): Observable<CountryCases | CoronaCountError>{
    const countryCases = this.http.get<CountryCases>(`${this.baseUrl}/countries/${country}?yesterday=true&strict=true`)
      .pipe(
        catchError(this.handleError)
      );

    return countryCases;
  }

  mapWithRegionAffected(region): any{
    const areaAffected = ['africa', 'europe', 'north america', 'south america', 'asia', 'oceania'];
    const url = region.includes('all')
      ? `${this.baseUrl}/${region}`
      : areaAffected.includes(region.toLowerCase())
      ? `${this.baseUrl}/continents/${region.includes('Oceania') ? 'Australia%2FOceania' : region}`
      : `${this.baseUrl}/countries/${region}`
    return this.http.get(`${url}`);
  }

  refreshCountryCases(country): Observable<CountryCases | CoronaCountError>{
    return this.fetchCountryActualData(country);
  }

}
