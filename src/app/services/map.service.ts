import {Injectable} from '@angular/core';

import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';
import Vector from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import GeoJSON from 'ol/format/geojson';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import Fill from 'ol/style/fill';
import Select from 'ol/interaction/select'

import { IndicatorsService } from "./indicators.service";


@Injectable()
export class MapService {

    map: Map;
    features: any;

    vectorSource = new VectorSource({
        format: new GeoJSON()
    });

    countriesLayer = new Vector({
        source: this.vectorSource
    });

    selectInteraction = new Select();
    countryCode: string;

    constructor(private _indicatorService: IndicatorsService) {
    }

    createMap() {

        this.map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    })
                }),
                this.countriesLayer
            ],
            view: new View({
                center: [0, 0],
                zoom: 2,
                minZoom: 2
            }),
            interactions: [
                this.selectInteraction
            ]
        });

    }

    getFeatures(series, year, age, gender) {

        this._indicatorService.getFeatures(series, year, age, gender)
            .subscribe(
                (data) => {
                    this.features = data['data'];

                    let max = 0;

                    this.features.features.forEach((feature) => {

                        if (feature.properties._value > max) {
                            max = feature.properties._value;
                        }

                    });


                    let styleFunction = function (feature, resolution) {
                        let testValue = feature.get('_value') / max;

                        let defaultStroke = new Stroke({
                            color: [158, 154, 200, .8],
                            width: 0.4
                        });

                        if (testValue <= 0.2) {
                            return [
                                new Style({
                                    stroke: defaultStroke,
                                    fill: new Fill({
                                        color: [153, 216, 201, .8]
                                    })
                                })
                            ]
                        } else if (testValue > 0.2 && testValue <= 0.45) {
                            return [
                                new Style({
                                    stroke: defaultStroke,
                                    fill: new Fill({
                                        color: [102, 194, 164, .8]
                                    })
                                })
                            ]
                        } else if (testValue > 0.45 && testValue <= 0.60) {
                            return [
                                new Style({
                                    stroke: defaultStroke,
                                    fill: new Fill({
                                        color: [65, 174, 118, .8]
                                    })
                                })
                            ]
                        } else if (testValue > 0.60 && testValue <= 0.85) {
                            return [
                                new Style({
                                    stroke: defaultStroke,
                                    fill: new Fill({
                                        color: [35, 139, 69, .8]
                                    })
                                })
                            ]
                        } else {
                            return [
                                new Style({
                                    stroke: defaultStroke,
                                    fill: new Fill({
                                        color: [0, 88, 36, .8]
                                    })
                                })
                            ]
                        }
                    };


                    this.countriesLayer.getSource().clear();

                    this.countriesLayer.getSource().addFeatures((new GeoJSON()).readFeatures(
                        this.features, { dataProjection: 'EPSG: 3857'})
                    );

                    this.countriesLayer.setStyle(styleFunction);

                    this.map.removeInteraction(this.selectInteraction);

                    this.selectInteraction = new Select({
                        style: new Style({
                            fill: new Fill({
                                color: [66, 146, 198, .6]
                            }),
                            stroke: new Stroke({
                                color: [33, 113, 181, .6],
                                width: 1.5
                            })
                        })
                    });

                    this.map.addInteraction(this.selectInteraction);

                    this.vectorSource.refresh();

                    this.selectInteraction.on('select', function (event) {
                        let feature = event.selected[0];
                        const self = this;
                        self.countryCode = feature.get('country_code');
                    });

                },
                () => {
                    this.features = [];
                    this.countriesLayer.getSource().clear();
                }
            );

    }

}
