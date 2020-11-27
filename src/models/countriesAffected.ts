import { CountryInfo } from "./countryInfo";

export interface CountriesAffected {
  country: string,
  countryInfo: CountryInfo,
  cases: number,
  continent: string
}
