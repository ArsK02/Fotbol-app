import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Match, ApiMatchesRespone, ApiTeamsRespone } from '../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit, OnDestroy {
  matches: Match[] = [];
  teamsLogos: object;
  matchDays = [];
  currentMatchday: number;
  selectedMachday: number;
  selectedStage = 'GROUP_STAGE';
  mSub: Subscription;
  @ViewChild('selectLeague') selectLeague: ElementRef;
  selectedLegue = !!this.selectLeague ? this.selectLeague.nativeElement.value : 'primeraDivision';
  alertText: string;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getLeagueMatches();
  }

  ngOnDestroy(): void {
    if (this.mSub) {
      this.mSub.unsubscribe();
    }
  }

  filterByMatchday(event: any) {
    this.selectedMachday = event.value;
    this.dataService.getMatchesByMatchday(this.selectedLegue, this.selectedMachday).subscribe(response => {
      this.matches = response.matches;
    });
  }

  filterByStage(stage: any) {
    this.dataService.getMatchesByStage(stage).subscribe(response => {
      this.matches = response.matches;
    });
  }

  getLeagueMatches() {
    this.matches = [];
    this.mSub = this.dataService.getMatches(this.selectedLegue).subscribe((response: ApiMatchesRespone) => {
      if ( response.matches.length > 0) {
        this.matches = response.matches;
      } else {
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          this.alertText = '';
        }, 3000);
        this.alertText = 'No hay partidos pendientes';
      }
      this.currentMatchday = this.matches[0].season.currentMatchday;
      this.selectedMachday = this.currentMatchday;
      this.matchDays = [];
      for (let i = 1; i <= this.currentMatchday; i++) {
        this.matchDays.push(i);
      }
      if (this.selectedLegue !== 'championsLeague') {
        this.matches = this.matches.filter(match => match.matchday === this.selectedMachday);
      } else {
        this.matches = this.matches.filter(match => match.stage === this.selectedStage);
      }
    }),
    this.dataService.getTeams(this.selectedLegue).subscribe((response: ApiTeamsRespone) => {
      this.teamsLogos = {};
      response.teams.forEach(element => {
        this.teamsLogos[element.id] = element.crestUrl;
      });
    });
  }
}
