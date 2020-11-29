import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, ToastController } from 'ionic-angular';
import { CountryCases } from '../../models/countryCases';
import { DataProvider } from '../../providers/data/data';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings';

@Component({
  selector: 'page-country-detail',
  templateUrl: 'country-detail.html',
})
export class CountryDetailPage {

  country: CountryCases;
  isFavorite = false;
  forceRefresh = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private userSettingService: UserSettingsProvider,
              private dataService: DataProvider
              ) {
    this.country = this.navParams.data.country
  }

  ionViewDidLoad() {
    // if(this.forceRefresh){
    //   this.country = this.dataService.refreshCountryCases(this.country.country)
    // }
    this.userSettingService.isFavoriteCountry(this.country.countryInfo.iso3.toString())
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
              this.userSettingService.unfavoriteCountry(this.country);

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
      this.userSettingService.favoriteCountry(this.country);
    }
  }

  refreshData(refresher, country){
    this.dataService.refreshCountryCases(country).subscribe(()=>{
      refresher.complete();
      // Invoke ionViewDidLoad
      this.ionViewDidLoad();
    })
  }

}
