import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  regionAffected: string;
  areaAffected = ['africa', 'europe', 'north america', 'south america', 'asia', 'oceania'];
  map: any = {}
  constructor(
              public navParams: NavParams,
              private dataService: DataProvider
              ) {
    this.regionAffected = this.navParams.data
  }

  ionViewDidLoad() {
    this.dataService.mapWithRegionAffected(this.regionAffected)
      .subscribe(
        data => {
          const mapWithData = data

          this.regionAffected.includes('all')
            ? this.map = {
              ...mapWithData,
              lat: 0,
              long: 0,
            }
             :this.areaAffected.includes(this.regionAffected.toLowerCase())
            ? this.map = {
              ...mapWithData,
              lat: mapWithData.continentInfo.lat,
              long: mapWithData.continentInfo.long,
            }
            : this.map = {
              ...mapWithData,
              lat: mapWithData.countryInfo.lat,
              long: mapWithData.countryInfo.long,
            }
        },
        err => console.log(err),      )
  }

}
