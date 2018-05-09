import { Component } from '@angular/core';


import {IndicatorsService} from "./services/indicators.service";

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

  constructor(private _indicatorService: IndicatorsService) {}

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
              },
              () => {
                  console.log("Goals loaded");
              }

          );;
  }
}
