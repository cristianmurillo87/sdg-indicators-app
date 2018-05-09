import { Component, OnInit, Input } from '@angular/core';

import {Indicator} from "../models/goal";

@Component({
  selector: 'app-data-selection',
  templateUrl: './data-selection.component.html',
  styleUrls: ['./data-selection.component.css']
})
export class DataSelectionComponent implements OnInit {

    @Input('title') windowTitle: string;
    @Input('sdg') sdgId: string;
    @Input('indicators') validIndicators : Indicator[];

  constructor() { }

  ngOnInit() {
  }


}
