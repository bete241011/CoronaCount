import { CountryOrContinentInfo } from "./countryOrContinentInfo";

export interface CountryCases {
  updated: number,
  country: string,
  countryInfo?: CountryOrContinentInfo,
  cases: number,
  todayCases: number,
  deaths: number,
  todayDeaths: number,
  recovered: number,
  todayRecovered: number,
  active: number,
  critical: number,
  tests: number
}
