import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { AppRoutingModule } from './modules/app-routing.module';
import { MaterialModule } from './modules/material.module';

import { OperationsComponent } from './pages/operations/operations.component';
import { CalendarComponent } from './pages/operations/calendar/calendar.component';

import { SchedulerComponent } from './pages/scheduler/scheduler.component';
import { ResAvailComponent } from './pages/scheduler/res-avail/res-avail.component';
import { FacilitiesMaterialsComponent } from './pages/scheduler/res-avail/facilities-materials/facilities-materials.component';
import { TrainingReqComponent } from './pages/scheduler/training-req/training-req.component';
import { InstructorsComponent } from './pages/scheduler/instructors/instructors.component';
import { InstListComponent } from './pages/scheduler/instructors/inst-list/inst-list.component';
import { InstDetailComponent } from './pages/scheduler/instructors/inst-detail/inst-detail.component';
import { CoursesComponent } from './pages/scheduler/courses/courses.component';

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

import { WorldmapComponent } from './components/worldmap/worldmap.component';
import { AccountComponent } from './pages/account/account.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { MatDialogModule } from '@angular/material';
import { MapDialogComponent } from './components/map-dialog/map-dialog.component';
import { LoginMenuComponent } from './components/login-menu/login-menu.component';

import { AuthService } from './services/auth.service';
import { MissionChecklistComponent } from './pages/scheduler/mission-checklist/mission-checklist.component';

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
    ResAvailComponent,
    FacilitiesMaterialsComponent,
    TrainingFaqsComponent,
    SchedulerComponent,
    NotFoundComponent,
    InstructorsComponent,
    InstListComponent,
    InstDetailComponent,
    CalendarComponent,
    CoursesComponent,
    CdrlComponent,
    AqlMetricsComponent,
    ConstantviewComponent,
    TrainingReqComponent,
    MapDialogComponent,
    LoginMenuComponent,
    MissionChecklistComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    MaterialModule,
    MatDialogModule,
    BrowserAnimationsModule
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
