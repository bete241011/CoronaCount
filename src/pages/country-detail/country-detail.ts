import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { CoronaCountError } from '../../models/coronaCountError';
import { CountryCases } from '../../models/countryCases';
import { DataProvider } from '../../providers/data/data';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings';
import { MapPage } from '../map/map';

@Component({
  selector: 'page-country-detail',
  templateUrl: 'country-detail.html',
})
export class CountryDetailPage {

  countryCase: CountryCases;
  isFavorite = false;
  forceRefresh = false;
  countryCaseByDate = "today"

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadingCtrl:LoadingController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private userSettingService: UserSettingsProvider,
              private dataService: DataProvider
              ) {
    this.countryCase = this.navParams.data.country
  }

  ionViewDidLoad() {
    this.userSettingService.isFavoriteCountry(this.countryCase.countryInfo.iso3.toString())
      .then(value => this.isFavorite = value);
  }

  toggleFavorites(){
    if(this.isFavorite){
      let confirm = this.alertCtrl.create({
        title: "Dislike?",
        message: "Are you sure you want to remove from favorite",
        buttons: [
          {
            text: "Yes",
            handler: () => {
              this.isFavorite = false;
              // Persist updated data to storage --- remove from storage
              this.userSettingService.unfavoriteCountry(this.countryCase);

              let toast = this.toastCtrl.create({
                message: 'You have dislike this country',
                duration: 2000,
                position:'bottom'
              });

              toast.present();
            }
          },
          {
            text: "No"
          }
        ]
      });
      confirm.present();
    } else {
      this.isFavorite = true;
      // Persist update data to storage --- adding to the storage
      this.userSettingService.favoriteCountry(this.countryCase);

      let toast = this.toastCtrl.create({
        message: 'You add this country to favorites',
        duration: 2000,
        position:'bottom',
        cssClass: 'toastClass'
      });

      toast.present();
    }
  }

  refreshData(refresher, country){
    this.dataService.refreshCountryCases(country).subscribe(()=>{
      refresher.complete();
      // Invoke ionViewDidLoad
      this.countryCaseByDate = "today"
      this.ionViewDidLoad();
    })
  }

  gotoMap($event, country){
    this.navCtrl.push(MapPage, country)
  }

  fetchCountryCaseByDate(){

    if(this.countryCaseByDate === 'today'){
      this.countryCase = this.navParams.data.country
    }else{
      let loader = this.loadingCtrl.create({
        content: 'Loading yesterday cases...',
      });

      loader.present().then(()=>{
        this.dataService.fetchCountryYesterdayData(this.countryCase.country)
          .subscribe(
            (data: CountryCases)=> this.countryCase = data,
            ((err: CoronaCountError)=> console.log(err.friendlyMessage)),
            ()=> loader.dismiss()
        )
      })
    }
  }

}
