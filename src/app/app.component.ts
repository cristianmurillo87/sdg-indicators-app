import { Component } from '@angular/core';


import {IndicatorsService} from "./services/indicators.service";
import { MapService } from "./services/map.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _indicatorService: IndicatorsService, private _mapService: MapService) {}

  formSubmitted(e) {
      let seriesCode = e.params.series;
      let year = e.params.year;
      let ageGroup = (e.params.age == "-1") ? '45' : e.params.age;
      let gender = (e.params.gender == "-1") ? 'B' : e.params.gender;
      this._mapService.getFeatures(seriesCode, year, ageGroup, gender);
      this._indicatorService.series(seriesCode);
      this._indicatorService.age(ageGroup);
      this._indicatorService.gender(gender);
  }

  onCountrySelected(event) {
      this._indicatorService.countryCode(event.country_code);
      this._indicatorService.countryName(event.name);
      this._indicatorService.getStatisticData();
  }

}
