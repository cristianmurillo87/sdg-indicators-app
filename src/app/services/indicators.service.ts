import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable()
export class IndicatorsService{

    serverUrl = 'http://localhost:3000/api';

  constructor(private _http: HttpClient) { }

  getGoals() {
      return this._http.get(`${this.serverUrl}/goals`);
  }

  getIndicatorsByGoal(goal) {
      return this._http.get(`${this.serverUrl}/indicators/${goal}`);
  }

  getSeriesByIndicator(indicator) {
      return this._http.get(`${this.serverUrl}/series/${indicator}`);
  }

  getYearsForSeries(series) {
      return this._http.get(`${this.serverUrl}/series/${series}/years`);
  }

  getAgeGroups(series, year) {
      return this._http.get(`${this.serverUrl}/series/${series}/${year}/age`);
  }

  getGenders(series, year, age) {
      return this._http.get(`${this.serverUrl}/series/${series}/${year}/${age}/genders`);
  }
}
