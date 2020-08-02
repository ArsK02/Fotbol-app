import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Match, ApiMatchesRespone } from '../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit, OnDestroy {
  matches: Match[] = [];
  matchDays = [];
  currentMatchday: number;
  selectedMachday: number;
  mSub: Subscription;
  selectedLegue = 'primeraDivision';
  alertText: string;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getLeagueMatches(this.selectedLegue);
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

  getLeagueMatches(league: string) {
    this.selectedLegue = league;
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
      this.matches = this.matches.filter(match => match.matchday === this.selectedMachday);
    });
  }
}
