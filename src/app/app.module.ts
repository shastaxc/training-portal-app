import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { AppRoutingModule } from './modules/app-routing.module';
import { MaterialModule } from './modules/material.module';

import { CurrentOpsComponent } from './pages/current-ops/current-ops.component';
import { TrainingReadinessComponent } from './pages/training-readiness/training-readiness.component';
import { KnowMgmtComponent } from './pages/know-mgmt/know-mgmt.component';
import { ProgramDataComponent } from './pages/program-data/program-data.component';

import { WorldmapComponent } from './worldmap/worldmap.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CurrentOpsComponent,
    TrainingReadinessComponent,
    KnowMgmtComponent,
    ProgramDataComponent,
    WorldmapComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
