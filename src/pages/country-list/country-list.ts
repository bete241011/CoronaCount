import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { CoronaCountError } from '../../models/coronaCountError';
import { CountriesAffected } from '../../models/countriesAffected';
import { DataProvider } from '../../providers/data/data';
import { CountryDetailPage } from '../country-detail/country-detail';

@Component({
  selector: 'page-country-list',
  templateUrl: 'country-list.html',
})
export class CountryListPage {

  regionAffected: string;
  countriesAffected: CountriesAffected[]
  _countryFilter: string;
  filteredCountries: CountriesAffected[]

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private dataService: DataProvider
              ) {
    this.regionAffected = this.navParams.data
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: 'Loading countries...',
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

  onClick(country){
    this.navCtrl.push(CountryDetailPage, {country})
  }

  performFilter(): void{
    let filterBy = this._countryFilter.toLowerCase();
    this.filteredCountries = this.countriesAffected.filter((country) =>
      country.country.toLowerCase().indexOf(filterBy) !== -1
    )
  }

}
