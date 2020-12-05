import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from "@agm/core";

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from "@ionic/storage";
import { SQLite } from "@ionic-native/sqlite";
import { CallNumber } from '@ionic-native/call-number';
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
import { DateConvertorPipe } from '../pipes/date-convertor/date-convertor';
import { SqlStorageProvider } from '../providers/sql-storage/sql-storage';
import { PrefixPipe } from '../pipes/prefix/prefix';
@NgModule({
  declarations: [
    MyApp,
    RegionAffectedPage,
    StatisticsPage,
    CountryListPage,
    FavoritesPage,
    CountryDetailPage,
    MapPage,
    DateConvertorPipe,
    PrefixPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyALn_eWbny1GkKjrCqcfg9ZX9L2ieBR83w'})
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
    SQLite,
    CallNumber,
    SqlStorageProvider
  ]
})
export class AppModule {}
