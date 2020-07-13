import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { MatchesComponent } from './matches/matches.component';
import { ClassificationComponent } from './classification/classification.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/partidos', pathMatch: 'full'},
      {path: 'partidos', component: MatchesComponent},
      {path: 'clasificacion', component: ClassificationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
