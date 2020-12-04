import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { CoronaCountError } from '../../models/coronaCountError';
import { RegionAffectedCases } from '../../models/regionAffectedCases';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {

  // slideOptions = {

  // }

  regionAffected: string;
  regionAffectedCases: RegionAffectedCases;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private dataService: DataProvider,
              private callNumber: CallNumber
              ) {
    this.regionAffected = this.navParams.data
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: 'Loading cases...',
      // spinner: 'dots'
    });
    // Region Affected Cases initialization goes here
    loader.present().then(()=>{
      this.dataService.fetchRegionAffectedActualData()
        .subscribe(
          (data: RegionAffectedCases) => this.regionAffectedCases = data,
          (err: CoronaCountError) => console.log(err.friendlyMessage),
          () => loader.dismiss()
        )
      })
  }

  refreshRegionAffectedData(refresher){
    this.dataService.refreshCurrentRegionAffectedData().subscribe(()=>{
      refresher.complete();
      // Invoke ionViewDidLoad
      this.ionViewDidLoad();
    })
  }

  calling(){
    this.callNumber.callNumber("0914065530", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

}
