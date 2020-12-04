import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { CountriesAffected } from '../../models/countriesAffected';
import { SqlStorageProvider } from '../sql-storage/sql-storage';

const win: any = window;
@Injectable()
export class UserSettingsProvider {
  // default use local storage
  private sqlMode = false;

  constructor(private storage: Storage, private sqlStorage: SqlStorageProvider) {
    if(win.sqlitePlugin){
      this.sqlMode = true;
    }else{
      console.log('SQLite plugin not insta  lled, Falling back to regular ionic storage')
    }
  }

  favoriteCountry(country){
    // let item = {country: country}
    /** Local Storage */
    // this.storage.set(country.countryInfo.iso3.toString(), JSON.stringify(country));

    if(this.sqlMode){
      this.sqlStorage.set(country.countryInfo.iso3.toString(), JSON.stringify(country));
    } else{
      this.storage.set(country.countryInfo.iso3.toString(), JSON.stringify(country));
    }
  }

  unfavoriteCountry(country){
     /** Local Storage */
    // this.storage.remove(country.countryInfo.iso3.toString());

    if(this.sqlMode){
      this.sqlStorage.remove(country.countryInfo.iso3.toString());
    } else{
      this.storage.remove(country.countryInfo.iso3.toString());
    }
  }

  isFavoriteCountry(countryISO: string): Promise<boolean>{
    /** Local Storage */
    // return this.storage.get(countryISO).then(value => value ? true : false);

    if(this.sqlMode){
      return this.sqlStorage.get(countryISO).then(value => value ? true : false);
    } else{
      return new Promise(resolve => resolve(this.storage.get(countryISO).then(value => value ? true : false)));
    }
  }

  // getAllFavorites(): CountriesAffected[]{
  getAllFavorites(): Promise<CountriesAffected[]>{
    /** Local Storage */

    // let favorites: CountriesAffected[] = [];
    // this.storage.forEach(data => {
    //   // console.log('*****forEach', data);
    //   favorites.push(JSON.parse(data));
    // });
    // return favorites;

    if(this.sqlMode){
      return this.sqlStorage.getAll();
    } else{
      return new Promise(resolve => {
        let favorites: CountriesAffected[] = [];
        this.storage.forEach(data => {
      // console.log('*****forEach', data);
          favorites.push(JSON.parse(data));
        });
        return resolve(favorites);
      });
    }
  }

  initStorage(): Promise<any>{
    if(this.sqlMode){
      return this.sqlStorage.initializeDatabase();
    } else {
      return new Promise(resolve => resolve());
    }
  }

}
