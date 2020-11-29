import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from "@agm/core";

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from "@ionic/storage";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { RegionAffectedPage } from '../pages/region-affected/region-affected';
import { StatisticsPage } from '../pages/statistics/statistics';
import { CountryListPage } from '../pages/country-list/country-list';
import { DataProvider } from '../providers/data/data';
import { CountryDetailPage } from '../pages/country-detail/country-detail';
import { FavoritesPage } from '../pages/favorites/favorites';
import { UserSettingsProvider } from '../providers/user-settings/user-settings';
import { MapPage } from '../pages/map/map';

@NgModule({
  declarations: [
    MyApp,
    RegionAffectedPage,
    StatisticsPage,
    CountryListPage,
    FavoritesPage,
    CountryDetailPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    // AgmCoreModule.forRoot({apiKey: 'AIzaSyALn_eWbny1GkKjrCqcfg9ZX9L2ieBR83w'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegionAffectedPage,
    StatisticsPage,
    CountryListPage,
    FavoritesPage,
    CountryDetailPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    UserSettingsProvider,
  ]
})
export class AppModule {}
