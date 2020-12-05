import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegionAffectedPage } from '../pages/region-affected/region-affected';
import { DataProvider } from '../providers/data/data';
import { UserSettingsProvider } from '../providers/user-settings/user-settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = RegionAffectedPage;
  activePage: string;

  pages: Array<{regionAffected: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private dataService: DataProvider,
              private userSettingService: UserSettingsProvider,
              ) {
    this.initializeApp();

    this.pages = [
      { regionAffected: 'Worldwide', component: RegionAffectedPage },
      { regionAffected: 'Africa', component: RegionAffectedPage },
      { regionAffected: 'Asia', component: RegionAffectedPage },
      { regionAffected: 'Europe', component: RegionAffectedPage },
      { regionAffected: 'North America', component: RegionAffectedPage },
      { regionAffected: 'Oceania', component: RegionAffectedPage },
      { regionAffected: 'South America', component: RegionAffectedPage }
    ];

    this.activePage = this.pages[0].regionAffected;

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.userSettingService.initStorage().then(() => this.rootPage = RegionAffectedPage);
    });
  }

  openPage({component, regionAffected}) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.dataService.setRegionAffected(regionAffected === 'Worldwide' ? 'all' : regionAffected)
    this.nav.setRoot(component, {regionAffected: this.dataService.regionAffected});
    this.activePage = regionAffected;
  }

  checkActive({regionAffected}){
    return regionAffected == this.activePage
  }
}
