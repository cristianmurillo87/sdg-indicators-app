import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { IndicatorsService} from "../services/indicators.service";
import { Goal} from "../models/goal";

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

    goals : any;
    @Output() onGoalSelected = new EventEmitter<Goal>();

  constructor(private _indicatorsService: IndicatorsService) { }

  ngOnInit() {
        this.getGoals();
  }

  getGoals() {
      this._indicatorsService.getGoals()
          .subscribe(
              (data) => {
                  this.goals = data['data'];
              },
              (err) => {
                  console.error(err);
              },
              () => {
                  console.log("Goals loaded");
              }

          );
  }

  onClick(goal: Goal) {
      this.onGoalSelected.emit(goal);
      console.log("Emitted!")
  }

}
