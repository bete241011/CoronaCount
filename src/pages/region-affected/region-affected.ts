import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StatisticsPage } from '../statistics/statistics';
import { CountryListPage } from '../country-list/country-list';

/**
 * Generated class for the RegionAffectedPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-region-affected',
  templateUrl: 'region-affected.html'
})
export class RegionAffectedPage {

  statisticsRoot = StatisticsPage
  countryListRoot = CountryListPage
  regionAffected: string


  constructor(public navCtrl: NavController, private navParams:NavParams) {
    this.regionAffected = this.navParams.get('regionAffected') ? this.navParams.get('regionAffected') : "all"
  }

}
