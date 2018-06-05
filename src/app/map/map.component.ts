import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MapService } from '../services/map.service';
import { IndicatorsService } from '../services/indicators.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    @Output() countrySelected = new EventEmitter<{name : string, country_code : string}>();

  constructor(private _mapService: MapService) {
      this._mapService.countryCode$
          .subscribe((country) => {
              this.countrySelected.emit(country);
          });
  }

  ngOnInit() {
        this._mapService.createMap();
  }

}
