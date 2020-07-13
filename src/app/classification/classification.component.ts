import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../shared/interfaces';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss']
})
export class ClassificationComponent implements OnInit {
  columnsToDisplay = [
    "position",
    "name",
    "points",
    "playedGames",
    "won",
    "draw",
    "lost",
    "goalsFor",
    "goalsAgainst"
  ]

  teams$: Observable<Team[]>

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getClassification()
    this.teams$ = this.dataService.teams
  }

}
