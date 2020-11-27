import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CountryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-country-list',
  templateUrl: 'country-list.html',
})
export class CountryListPage {

  regionAffected: string;
  // countriesAffected: CountriesAffected[]

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              /*private country affected services here*/
              ) {
    this.regionAffected = this.navParams.data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CountryListPage', this.regionAffected);
    // console.warn('ionViewDidLoad CountryListPage', this.regionAffected);
    // Countries Affected initialization goes here
    // this.countriesAffected = this.services.method on the services

  }

}
