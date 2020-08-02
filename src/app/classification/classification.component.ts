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
    'position',
    'name',
    'points',
    'playedGames',
    'won',
    'draw',
    'lost',
    'goalsFor',
    'goalsAgainst'
  ];

  teams$: Observable<Team[]>;
  leagueTitle = {
    bundesliga: 'Bundesliga',
    premierLeague: 'Premier Luague',
    serieA: 'Serie A',
    primeraDivision: 'LaLiga Santander'
  };
  selectedLegue = 'primeraDivision';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getClassification('primeraDivision');
    this.teams$ = this.dataService.teams;
  }

  getStandings(league: any) {
    this.dataService.getClassification(league);
  }
}
