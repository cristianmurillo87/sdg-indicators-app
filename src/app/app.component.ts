import { Component } from '@angular/core';


import {IndicatorsService} from "./services/indicators.service";
import { MapService } from "./services/map.service";

import { Indicator } from "./models/goal";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  formWindowTitle = 'Indicators and Series';
  sdg: string;

  validIndicators : Indicator[];

  constructor(private _indicatorService: IndicatorsService, private _mapService: MapService) {}

  goalSelected(e) {
      this.formWindowTitle = 'Indicators and Series for SDG: ' + e.title;
      this.sdg = e.id;

      this._indicatorService.getIndicatorsByGoal(this.sdg)
          .subscribe(
              (data) => {
                  this.validIndicators = data['data'].indicators;

              },
              (err) => {
                  console.error(err);
              }
          );

  }

  formSubmitted(e) {
      let seriesCode = e.params.series;
      let year = e.params.year;
      let ageGroup = (e.params.age == "-1") ? '45' : e.params.age;
      let gender = (e.params.gender == "-1") ? 'B' : e.params.gender;
      this._mapService.getFeatures(seriesCode, year, ageGroup, gender);
  }
}
