import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { CountriesAffected } from '../../models/countriesAffected';

@Injectable()
export class UserSettingsProvider {

  constructor(private storage: Storage) {
    // console.log('Hello UserSettingsProvider Provider');
  }

  favoriteCountry(country){
    // let item = {country: country}
    this.storage.set(country.countryInfo.iso3.toString(), JSON.stringify(country));
  }

  unfavoriteCountry(country){
    this.storage.remove(country.countryInfo.iso3.toString());
  }

  isFavoriteCountry(countryISO: string): Promise<boolean>{
    return this.storage.get(countryISO).then(value => value ? true : false);
  }

  getAllFavorites(): CountriesAffected[]{
    let favorites: CountriesAffected[] = [];
    this.storage.forEach(data => {
      // console.log('*****forEach', data);
      favorites.push(JSON.parse(data));
    });
    return favorites;
  }

}
