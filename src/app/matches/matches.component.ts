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
  matches: Match[] = []
  mSub: Subscription

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.mSub = this.dataService.getMatches().subscribe((response: ApiMatchesRespone) => {
      this.matches=response["matches"]
    })
  }

  ngOnDestroy(): void {
    if(this.mSub) {
      this.mSub.unsubscribe()
    }
  }

}
