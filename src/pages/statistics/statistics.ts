import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { Observable } from "rxjs";
import { CoronaCountError } from '../../models/coronaCountError';
import { RegionAffectedCases } from '../../models/regionAffectedCases';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {

  regionAffected: string;
  regionAffectedCases: RegionAffectedCases;

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

}
