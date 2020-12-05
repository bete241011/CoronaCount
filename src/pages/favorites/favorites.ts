import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CountriesAffected } from '../../models/countriesAffected';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings';
import { CountryDetailPage } from '../country-detail/country-detail';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  favorites: CountriesAffected[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userSettingService: UserSettingsProvider
              ) {
  }

  ionViewDidEnter() {
    this.userSettingService.getAllFavorites().then(favs => this.favorites = favs);
  }

  onClick($event, country){
    this.navCtrl.push(CountryDetailPage, {country})
  }

}
