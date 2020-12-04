import { CountryOrContinentInfo } from "./countryOrContinentInfo";

export interface RegionAffectedCases{
  updated: number,
  cases: number,
  todayCases: number,
  deaths: number,
  todayDeaths: number,
  recovered: number,
  todayRecovered: number,
  active: number,
  critical: number,
  affectedCountries?: number,
  continentInfo?: CountryOrContinentInfo,
  continent?: string,
  countries?: any[]
}
