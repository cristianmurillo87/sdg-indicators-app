import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import {Subject} from "rxjs/Subject";

@Injectable()
export class IndicatorsService{

    _serverUrl = 'http://localhost:3000/api';
    _series : string;
    _age : string;
    _gender : string;
    _countryName : string;
    _countryCode  : string;
    _statistics = new Subject();

    statistics$ = this._statistics.asObservable();


    constructor(private _http: HttpClient) { }

    series(value: string) {
        this._series = value;
    }

    age(value: string) {
        this._age = value;
    }

    gender(value: string) {
        this._gender = value;
    }

    countryName(value : string) {
        this._countryName = value;
    }

    countryCode(value : string) {
        this._countryCode = value;
    }


    getGoals() {
      return this._http.get(`${this._serverUrl}/goals`);
    }

    getIndicatorsByGoal(goal) {
        return this._http.get(`${this._serverUrl}/indicators/${goal}`);
    }

    getSeriesByIndicator(indicator) {
        return this._http.get(`${this._serverUrl}/series/${indicator}`);
    }

    getYearsForSeries(series) {
        return this._http.get(`${this._serverUrl}/series/${series}/years`);
    }

    getAgeGroups(series, year) {
        return this._http.get(`${this._serverUrl}/series/${series}/${year}/age`);
    }

    getGenders(series, year, age) {
        return this._http.get(`${this._serverUrl}/series/${series}/${year}/${age}/genders`);
    }

    getFeatures(series, year, age, gender) {

        const urlParams = new HttpParams()
            .set('age_group', age)
            .set('gender', gender);

        return this._http.get(`${this._serverUrl}/mapdata/${series}/${year}`, { params : urlParams });
    }

    getStatisticData() {

        const urlParams = new HttpParams()
            .set('age_group', this._age)
            .set('gender', this._gender);


        return this._http.get(`${this._serverUrl}/seriesdata/${this._series}/${this._countryCode}`,
            { params : urlParams})
            .subscribe((data) => {
                this._statistics.next(data);
            });

    }
}
