import {Component, OnInit } from '@angular/core';
import { IndicatorsService } from "../services/indicators.service";

import { Chart } from 'chart.js';



@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {

    _chart : Chart;
    _labels = [];
    _data = [];

  constructor(private _indicatorsService : IndicatorsService) {
      this._indicatorsService.statistics$
          .subscribe((res) => {

              this._labels = res['data'].map(item => item['_year']);
              this._data = res['data'].map(item =>  item['_value']);

              this.updateChart();

          });
  }

  ngOnInit() {

      this._chart = new Chart('chart-area', {
          type: 'bar',
          data: {
              labels: this._labels,
              datasets: [{
                  label : "Value ",
                  data: this._data,
                  backgroundColor : 'rgba(102, 194, 164, .8)',
                  borderColor : 'rgba(65, 174, 118, .8)',
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              }
          }
      });
  }

  updateChart() {
      this._chart.data.datasets[0].data = this._data;
      this._chart.data.labels = this._labels;
      this._chart.update();
  }


}
