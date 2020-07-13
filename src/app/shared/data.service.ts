import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Team, ApiStandingsRespone } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  headers = new HttpHeaders({
    'X-Auth-Token': '3c25023a9b924adbbe90793469260ad8'
  })

  private _teams: Subject<Array<Team>> = new BehaviorSubject<Array<Team>>([])

  public readonly teams: Observable<Array<Team>> = this._teams.asObservable()

  private _matches: Subject<Array<Math>> = new BehaviorSubject<Array<Math>>([])

  constructor(private http: HttpClient) { }

  getClassification() {
    return this.http.get(`${environment.footballDataUrl}/competitions/2014/standings`, { headers: this.headers })
      .subscribe((response: ApiStandingsRespone) => {
        this._teams.next(response.standings[0].table)
      })
  }

  getMatches() {
    return this.http.get(`${environment.footballDataUrl}/competitions/2014/matches?status=SCHEDULED`, { headers: this.headers })
  }
}
