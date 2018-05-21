import {Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';

import { IndicatorsService } from "../services/indicators.service";

import {Indicator, Series} from "../models/goal";

@Component({
  selector: 'app-data-selection',
  templateUrl: './data-selection.component.html',
  styleUrls: ['./data-selection.component.css']
})
export class DataSelectionComponent implements OnInit {

    defaultIndicator = "-1";
    defaultSeries = "-1";
    defaultYear = "-1";
    defaultAgeGroup = "-1";
    defaultGender = "-1";


    @Input('title') windowTitle: string;
    @Input('sdg') sdgId: string;
    @Input('indicators') validIndicators : Indicator[];
    validSeries : Series[];
    availableYears : number[];
    ageGroups = [];
    genders = [];

    @ViewChild('dataForm') form : NgForm;

    @Output() onFormSubmitted = new EventEmitter<any>();

  constructor(private  _indicatorService:IndicatorsService) { }

  ngOnInit() {
  }

  onIndicatorSelected() {

      this._indicatorService.getSeriesByIndicator(this.defaultIndicator)
          .subscribe(
              (data) => {

                  this.validSeries = data['data'].series;
              },
              () => {
                  this.validSeries = [];
                  this.availableYears = [];
                  this.ageGroups = [];
                  this.genders = [];
              },
              () => {
                  this.defaultSeries = "-1";
                  this.defaultYear = "-1";
                  this.defaultAgeGroup = "-1";
                  this.defaultGender = "-1";
              }

          );


  }

  onSeriesSelected() {

      this._indicatorService.getYearsForSeries(this.defaultSeries)
          .subscribe(
              (data) => {
                  this.availableYears = data['data'].years;

              },
              () => {
                  this.availableYears = [];
                  this.ageGroups = [];
                  this.genders = [];
              },
              () => {
                  this.defaultYear = "-1";
                  this.defaultAgeGroup = "-1";
                  this.defaultGender = "-1";
              }

          );


  }

  onYearSelected() {

      this._indicatorService.getAgeGroups(this.defaultSeries, this.defaultYear)
          .subscribe(
              (data) => {
                  this.ageGroups = data['data'].age_groups;
              },
              () => {
                  this.ageGroups = [];
                  this.genders = [];
              },
              () => {
                  this.defaultAgeGroup = "-1";
                  this.defaultGender = "-1";
              }

          );
  }

  onAgeGroupSelected() {

      this._indicatorService.getGenders(this.defaultSeries, this.defaultYear, this.defaultAgeGroup)
          .subscribe(
              (data) => {
                  this.genders = data['data'].genders;
              },
              () => {
                  this.genders = [];
              },
              () => {
                  this.defaultGender = "-1";
              }

          );
  }

  onSubmit() {
      this.onFormSubmitted.emit({
          title: this.windowTitle,
          sdgId: this.sdgId,
          params: this.form.value
      });
  }


}
