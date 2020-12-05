import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { CountriesAffected } from '../../models/countriesAffected';
@Injectable()
export class SqlStorageProvider {

  private db: SQLiteObject;

  constructor(private sqlite: SQLite) {  }

  getAll(){
    return this.db.executeSql('SELECT key, value FROM favorites', []).then(data=>{
      let results: CountriesAffected[] = [];
      for (let i = 0; i < data.rows.length; i++) {

        results.push(JSON.parse(data.rows.item(i).value))
      }
      return results;
    })
  }

  get(key:string){
    return this.db.executeSql('select key, value from favorites where key = ? limit 1', [key])
      .then(data => {
        if(data.rows.length > 0){
          return JSON.parse(data.rows.item(0).value);
        }
      })
  }

  remove(key: string){
    return this.db.executeSql('delete from favorites where key = ? ', [key]);
  }

  set(key: string, value: string){
    return this.db.executeSql('insert or replace into favorites(key, value) values(?, ?)', [key, value])
      .then(data=> {
        if(data.rows.length > 0){
          return JSON.parse(data.rows.item(0).value);
        }
      })
  }

  // should be called after the device ready event is fired
  initializeDatabase(){
    return this.sqlite.create({name: 'data.db',location: 'default'}).then(db => {
      this.db = db;
      return this.db.executeSql('CREATE TABLE IF NOT EXISTS favorites (key text primary key, value text)',[])
      .then(data => {
        console.log('after create table check', data);
      })
    })
  }

}
