import { Injectable } from '@angular/core';

import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';
import Vector from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import GeoJSON from 'ol/format/geojson';

import { IndicatorsService } from "./indicators.service";

@Injectable()
export class MapService {

    map: Map;

    features: any;


    vectorSource = new VectorSource({
        format : new GeoJSON()
    });

    countriesLayer = new Vector({
        source : this.vectorSource
    });

    constructor(private _indicatorService : IndicatorsService) { }

  createMap() {

      this.map = new Map({
          target : 'map',
          layers : [
              new TileLayer({
                  source: new XYZ({
                      url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  })
              }),
              this.countriesLayer
          ],
          view: new View({
             //
              //center: [-1050081.8849485717, 2190775.567433091],
              //projection : 'EPSG: 4326',
              center : [0, 0],
              zoom: 2,
              minZoom : 2
          })
      });

  }

  getFeatures(series, year, age?, gender?) {

        let response;

        if (age && gender) {
            response = this._indicatorService.getFeatures(series, year, age, gender);
        } else if ((!age) && gender) {
            response = this._indicatorService.getFeatures(series, year, null, gender);
        } else if (age && (!gender)){
            response = this._indicatorService.getFeatures(series, year, age, null);
        } else {
            response = this._indicatorService.getFeatures(series, year);
        }

        response.subscribe(
            (data) => {
                this.features = data['data'];

                this.vectorSource.clear();

                this.countriesLayer.getSource().addFeatures((new GeoJSON()).readFeatures(
                    this.features,
                    { dataProjection: 'EPSG: 3857'})
                );

                this.vectorSource.refresh();

            },
            () => {
                this.features = [];
                this.countriesLayer.getSource().clear();
            },
            () => {
                console.log("Features modified");
            }
        );

  }




}
