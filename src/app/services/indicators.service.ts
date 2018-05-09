import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

import { Goal } from '../models/goal';


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


}
