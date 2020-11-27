import { CountryInfo } from "./countryInfo";

export interface CountryCases {
  updated: number,
  country: string,
  countryInfo: CountryInfo,
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
