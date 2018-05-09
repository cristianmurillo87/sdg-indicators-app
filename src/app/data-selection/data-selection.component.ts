import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';

import { IndicatorsService } from "../services/indicators.service";

import {Indicator, Series} from "../models/goal";

@Component({
  selector: 'app-data-selection',
  templateUrl: './data-selection.component.html',
  styleUrls: ['./data-selection.component.css']
})
export class DataSelectionComponent implements OnInit {

    @Input('title') windowTitle: string;
    @Input('sdg') sdgId: string;
    @Input('indicators') validIndicators : Indicator[];
    validSeries : Series[];
    availableYears : number[];
    ageGroups : {id:number, age_group:string} [];
    genders : {id:string, gender: string} [];

    @ViewChild('seriesSelect') selectSeries : ElementRef;
    @ViewChild('yearSelect') selectYear : ElementRef;
    @ViewChild('ageGroupSelect') selectAgeGroup : ElementRef;
    @ViewChild('genderSelect') selectGender : ElementRef;

  constructor(private  _indicatorService:IndicatorsService) { }

  ngOnInit() {
  }

  onIndicatorSelected(indicatorValue: HTMLSelectElement) {

      this._indicatorService.getSeriesByIndicator(indicatorValue.value)
          .subscribe(
              (data) => {

                  this.validSeries = data['data'].series;

                  this.selectYear.nativeElement.value = '';
                  this.selectAgeGroup.nativeElement.value = '';
                  this.selectGender.nativeElement.value = '';
              },
              (err) => {
                  console.error(err);
              },
              () => {
                  console.log("Series loaded");
              }

          );
  }

  onSeriesSelected(series: HTMLSelectElement) {

      this._indicatorService.getYearsForSeries(series.value)
          .subscribe(
              (data) => {
                  this.availableYears = data['data'].years;

                  this.selectYear.nativeElement.value = '';
                  this.selectAgeGroup.nativeElement.value = '';
                  this.selectGender.nativeElement.value = '';

              },
              (err) => {
                  console.error(err);
              },
              () => {
                  console.log("Years loaded");
              }

          );
  }

  onYearSelected(series: HTMLSelectElement, year: HTMLSelectElement) {

      this._indicatorService.getAgeGroups(series.value, year.value)
          .subscribe(
              (data) => {
                  this.ageGroups = data['data'].age_groups;

                  this.selectGender.nativeElement.value = '';
              },
              (err) => {
                  console.error(err);
              },
              () => {
                  console.log("Age groups loaded");
              }

          );
  }

  onAgeGroupSelected(series: HTMLSelectElement, year: HTMLSelectElement, age: HTMLSelectElement) {

      this._indicatorService.getGenders(series.value, year.value, age.value)
          .subscribe(
              (data) => {
                  this.genders = data['data'].genders;
              },
              (err) => {
                  console.error(err);
              },
              () => {
                  console.log("Genders loaded");
              }

          );
  }


}
