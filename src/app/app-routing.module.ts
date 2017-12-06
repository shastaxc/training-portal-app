import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { WorldmapComponent } from './worldmap/worldmap.component';
import { CurrentOpsComponent } from './current-ops/current-ops.component';

const routes: Routes = [
  { path: '', component: WorldmapComponent, pathMatch: 'full'},
  { path: 'currentops', component: CurrentOpsComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
