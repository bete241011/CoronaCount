import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StatisticsPage } from '../statistics/statistics';
import { CountryListPage } from '../country-list/country-list';
import { FavoritesPage } from '../favorites/favorites';
import { MapPage } from '../map/map';

@Component({
  selector: 'page-region-affected',
  templateUrl: 'region-affected.html'
})
export class RegionAffectedPage {

  statisticsRoot = StatisticsPage
  countryListRoot = CountryListPage
  favoritesRoot = FavoritesPage
  mapRoot = MapPage
  regionAffected: string


  constructor(public navCtrl: NavController, private navParams:NavParams) {
    this.regionAffected = this.navParams.get('regionAffected') ? this.navParams.get('regionAffected') : "all"
   }

}
