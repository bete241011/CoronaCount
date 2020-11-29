import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { CoronaCountError } from '../../models/coronaCountError';
import { CountriesAffected } from '../../models/countriesAffected';
import { DataProvider } from '../../providers/data/data';
import { CountryDetailPage } from '../country-detail/country-detail';

// import moment from "moment";

@Component({
  selector: 'page-country-list',
  templateUrl: 'country-list.html',
})
export class CountryListPage {

  regionAffected: string;
  countriesAffected: CountriesAffected[]
  _countryFilter: string;
  filteredCountries: CountriesAffected[]
  // updated: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private dataService: DataProvider
              ) {
    this.regionAffected = this.navParams.data
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CountryListPage', this.regionAffected);
    // Countries Affected initialization goes here
    let loader = this.loadingCtrl.create({
      content: 'Loading countries...',
      // spinner: 'dots'
    });

    loader.present().then(()=>{
      this.dataService.fetchCountriesAffected()
      .subscribe(
        (data: CountriesAffected[]) => {
          this.countriesAffected = this.regionAffected.includes('all') ? data
            : data.filter(({
              continent
            }) =>
            this.regionAffected === "Oceania" ?
            continent === "Australia/Oceania" :
            continent === this.regionAffected
          )
        },
        (err: CoronaCountError) => console.log(err.friendlyMessage),
        () => {
          this.filteredCountries = this.countriesAffected
          loader.dismiss()
        }
      )
    })
  }

  onClick($event, country){
    this.navCtrl.push(CountryDetailPage, {country})
  }

  performFilter(): void{
    let filterBy = this._countryFilter.toLowerCase();
    this.filteredCountries = this.countriesAffected.filter((country) =>
      country.country.toLowerCase().indexOf(filterBy) !== -1
    )
  }

}
