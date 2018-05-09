import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GoalsComponent } from './goals/goals.component';
import { MapComponent } from './map/map.component';
import { DataSelectionComponent } from './data-selection/data-selection.component';
import { PlotComponent } from './plot/plot.component';

import { IndicatorsService } from "./services/indicators.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GoalsComponent,
    MapComponent,
    DataSelectionComponent,
    PlotComponent
  ],
  imports: [
    BrowserModule,
      HttpClientModule
  ],
  providers: [IndicatorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
