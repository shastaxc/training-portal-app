import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorldmapComponent } from '../components/worldmap/worldmap.component';
import { CurrentOpsComponent } from '../pages/current-ops/current-ops.component';
import { TrainingReadinessComponent } from '../pages/training-readiness/training-readiness.component';
import { KnowMgmtComponent } from '../pages/know-mgmt/know-mgmt.component';
import { ProgramDataComponent } from '../pages/program-data/program-data.component';
import { AccountComponent } from '../pages/account/account.component';
import { SettingsComponent } from '../pages/settings/settings.component';

const routes: Routes = [
  { path: '', component: WorldmapComponent, pathMatch: 'full'},
  { path: 'currentops', component: CurrentOpsComponent},
  { path: 'readiness', component: TrainingReadinessComponent},
  { path: 'knowmgmt', component: KnowMgmtComponent},
  { path: 'programdata', component: ProgramDataComponent},
  { path: 'account', component: AccountComponent},
  { path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
