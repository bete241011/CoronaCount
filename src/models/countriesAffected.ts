import { CountryOrContinentInfo } from "./countryOrContinentInfo";

export interface CountriesAffected {
  updated: number,
  country: string,
  countryInfo: CountryOrContinentInfo,
  cases: number,
  continent: string
}
