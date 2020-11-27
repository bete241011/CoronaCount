import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from "rxjs";
import { CoronaCountError } from '../../models/coronaCountError';
import { RegionAffectedCases } from '../../models/regionAffectedCases';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the StatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {

  regionAffected: string;
  regionAffectedCases: RegionAffectedCases;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dataSevice: DataProvider
              ) {
    this.regionAffected = this.navParams.data
    // Region Affected Cases initialization goes here
  }

  ionViewDidLoad() {
    this.dataSevice.fetchRegionAffectedActualData()
      .subscribe(
        (data: RegionAffectedCases) => this.regionAffectedCases = data,
        (err: CoronaCountError) => console.log(err.friendlyMessage),
        () => console.log(`${this.regionAffected} Cases`, this.regionAffectedCases)
      )
    // console.log('ionViewDidLoad StatisticsPage:', this.regionAffectedCases);

  }

}
