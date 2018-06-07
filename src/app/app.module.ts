import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { DataSelectionComponent } from './data-selection/data-selection.component';
import { PlotComponent } from './plot/plot.component';

import { IndicatorsService } from "./services/indicators.service";
import { MapService } from "./services/map.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    DataSelectionComponent,
    PlotComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule
  ],
  providers: [IndicatorsService, MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
