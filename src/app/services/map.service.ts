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
import {Subject} from "rxjs/Subject";


@Injectable()
export class MapService {

    map: Map;
    features: any;

    countryCode = new Subject<any>();
    countryCode$ = this.countryCode.asObservable();

    vectorSource = new VectorSource({
        format: new GeoJSON()
    });

    countriesLayer = new Vector({
        source: this.vectorSource
    });

    selectInteraction = new Select();


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
                })
            ],
            view: new View({
                center: [0, 0],
                zoom: 1.3,
                minZoom: 1
            })
        });

        let countriesBackground = new Vector({
            source : new VectorSource({
                format: new GeoJSON()
            }),
            style : new Style({
                fill : new Fill({
                    color : [189,189,189, .5]
                }),
                stroke : new Stroke({
                    color : [99,99,99, .8],
                    width : 0.4
                })
            })
        });

        this.map.addLayer(countriesBackground);

        this._indicatorService.getCountries()
            .subscribe((data) => {
                const source = countriesBackground.getSource();
                source.addFeatures((new GeoJSON()).readFeatures(data));
                source.refresh();
            });


        this.map.addLayer(this.countriesLayer);


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
                            color: [158, 154, 200],
                            width: 0.4
                        });

                        if (testValue <= 0.2) {
                            return [
                                new Style({
                                    stroke: defaultStroke,
                                    fill: new Fill({
                                        color: [153, 216, 201]
                                    })
                                })
                            ]
                        } else if (testValue > 0.2 && testValue <= 0.45) {
                            return [
                                new Style({
                                    stroke: defaultStroke,
                                    fill: new Fill({
                                        color: [102, 194, 164]
                                    })
                                })
                            ]
                        } else if (testValue > 0.45 && testValue <= 0.60) {
                            return [
                                new Style({
                                    stroke: defaultStroke,
                                    fill: new Fill({
                                        color: [65, 174, 118]
                                    })
                                })
                            ]
                        } else if (testValue > 0.60 && testValue <= 0.85) {
                            return [
                                new Style({
                                    stroke: defaultStroke,
                                    fill: new Fill({
                                        color: [35, 139, 69]
                                    })
                                })
                            ]
                        } else {
                            return [
                                new Style({
                                    stroke: defaultStroke,
                                    fill: new Fill({
                                        color: [0, 88, 36]
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


                    this.removeSelectInteraction();

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

                    let countryCode = this.countryCode;

                    this.selectInteraction.on('select', function (event) {
                        let feature = event.selected[0];

                        if(feature !== undefined) {
                            const code = feature.get('country_code');
                            const name = feature.get('country');
                            countryCode.next({"name" : name, "country_code" : code});
                        }

                    });

                },
                () => {
                    this.features = [];
                    this.countriesLayer.getSource().clear();
                    this.countriesLayer.getSource().refresh();
                }
            );

    }

    removeSelectInteraction(): Select {
        this.map.getInteractions().forEach((interaction) => {
            if(interaction instanceof Select) {
                this.map.removeInteraction(interaction);
            }
        });
    }

}
