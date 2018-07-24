import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  FormsModule,
  ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { CalUtilsModule } from './components/calendar/cal-utils/cal-utils.module';

import { AppRoutingModule } from './modules/app-routing.module';
import { MaterialModule } from './modules/material.module';

import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarListComponent } from './components/calendar-list/calendar-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginMenuComponent } from './components/login-menu/login-menu.component';
import { MapDialogComponent } from './components/map-dialog/map-dialog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlanningSelectComponent } from './components/planning-select/planning-select.component';
import { UsmapComponent } from './components/usmap/usmap.component';
import { WorldmapComponent } from './components/worldmap/worldmap.component';

import { OperationsComponent } from './pages/operations/operations.component';
import { PlanningOpsComponent } from './pages/operations/planning-ops/planning-ops.component';
import { CurrentOpsComponent } from './pages/operations/current-ops/current-ops.component';
import { ClosedOpsComponent } from './pages/operations/closed-ops/closed-ops.component';

import { ResourcesComponent } from './pages/resources/resources.component';
import { TrainingReqComponent } from './pages/resources/training-req/training-req.component';
import { InstructorsComponent } from './pages/resources/instructors/instructors.component';
import { InstListComponent } from './pages/resources/instructors/inst-list/inst-list.component';
import { InstDetailComponent } from './pages/resources/instructors/inst-detail/inst-detail.component';
import { CoursesComponent } from './pages/resources/courses/courses.component';
import { MissionChecklistComponent } from './pages/resources/mission-checklist/mission-checklist.component';

import { KnowMgmtComponent } from './pages/know-mgmt/know-mgmt.component';
import { AarComponent } from './pages/know-mgmt/aar/aar.component';
import { SitrepComponent } from './pages/know-mgmt/sitrep/sitrep.component';
import { LessonsLearnedComponent } from './pages/know-mgmt/lessons-learned/lessons-learned.component';
import { FieldObservationsComponent } from './pages/know-mgmt/field-observations/field-observations.component';
import { CourseHistoryComponent } from './pages/know-mgmt/course-history/course-history.component';
import { SurveysComponent } from './pages/know-mgmt/surveys/surveys.component';
import { TrainingFaqsComponent } from './pages/know-mgmt/training-faqs/training-faqs.component';

import { ContractMgmtComponent } from './pages/contractmgmt/contractmgmt.component';
import { CdrlComponent } from './pages/contractmgmt/cdrl/cdrl.component';
import { AqlMetricsComponent } from './pages/contractmgmt/aql-metrics/aql-metrics.component';
import { ConstantviewComponent } from './pages/contractmgmt/constantview/constantview.component';

import { AccountComponent } from './pages/account/account.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    OperationsComponent,
    KnowMgmtComponent,
    ContractMgmtComponent,
    WorldmapComponent,
    AccountComponent,
    SettingsComponent,
    AarComponent,
    SitrepComponent,
    LessonsLearnedComponent,
    FieldObservationsComponent,
    CourseHistoryComponent,
    SurveysComponent,
    TrainingFaqsComponent,
    ResourcesComponent,
    NotFoundComponent,
    InstructorsComponent,
    InstListComponent,
    InstDetailComponent,
    CoursesComponent,
    CdrlComponent,
    AqlMetricsComponent,
    ConstantviewComponent,
    TrainingReqComponent,
    MapDialogComponent,
    LoginMenuComponent,
    MissionChecklistComponent,
    PlanningOpsComponent,
    PlanningSelectComponent,
    CurrentOpsComponent,
    UsmapComponent,
    ClosedOpsComponent,
    CalendarListComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule.forRoot(),
    CommonModule,
    CalUtilsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MapDialogComponent
  ]
})
export class AppModule { }
