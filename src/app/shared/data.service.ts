import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Team, ApiStandingsRespone, ApiTeamsRespone, TeamStandings } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  headers = new HttpHeaders({
    'X-Auth-Token': '3c25023a9b924adbbe90793469260ad8'
  });

  private _teams: Subject<Array<TeamStandings>> = new BehaviorSubject<Array<TeamStandings>>([]);

  public readonly teams: Observable<Array<TeamStandings>> = this._teams.asObservable();

  private readonly leagues = {
    bundesliga: 'BL1',
    premierLeague: 'PL',
    serieA: 'SA',
    primeraDivision: 'PD',
    championsLeague: 'CL'
  };

  constructor(
    private http: HttpClient) { }

  getClassification(league: string) {
    return this.http.get(`${environment.footballDataUrl}/competitions/${this.leagues[league]}/standings`, { headers: this.headers })
      .subscribe((response: ApiStandingsRespone) => {
        this._teams.next(response.standings[0].table);
      });
  }

  getMatches(league: string): Observable<any> {
    return this.http.get(`${environment.footballDataUrl}/competitions/${this.leagues[league]}/matches`, { headers: this.headers });
  }

  getMatchesByMatchday(league: string, matchday: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${environment.footballDataUrl}/competitions/${this.leagues[league]}/matches?matchday=${matchday}`, { headers: this.headers });
  }

  getMatchesByStage(stage: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${environment.footballDataUrl}/competitions/CL/matches?stage=${stage}`, { headers: this.headers });
  }

  getTeams(league: string): Observable<any> {
    return this.http.get(`${environment.footballDataUrl}/competitions/${this.leagues[league]}/teams`, { headers: this.headers });
  }
}
