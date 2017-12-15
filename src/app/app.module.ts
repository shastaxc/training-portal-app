import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { AppRoutingModule } from './modules/app-routing.module';
import { MaterialModule } from './modules/material.module';

import { CurrentOpsComponent } from './pages/current-ops/current-ops.component';
import { CalendarComponent } from './pages/current-ops/calendar/calendar.component';
import { SchedulerComponent } from './pages/current-ops/scheduler/scheduler.component';
import { ChecklistComponent } from './pages/current-ops/checklist/checklist.component';

import { TrainingReadinessComponent } from './pages/training-readiness/training-readiness.component';
import { InstructorsComponent } from './pages/training-readiness/instructors/instructors.component';
import { InstListComponent } from './pages/training-readiness/instructors/inst-list/inst-list.component';
import { InstDetailComponent } from './pages/training-readiness/instructors/inst-detail/inst-detail.component';
import { CoursesComponent } from './pages/training-readiness/courses/courses.component';
import { FacilitiesMaterialsComponent } from './pages/training-readiness/facilities-materials/facilities-materials.component';
import { TrainingAssetsComponent } from './pages/training-readiness/training-assets/training-assets.component';

import { KnowMgmtComponent } from './pages/know-mgmt/know-mgmt.component';
import { AarComponent } from './pages/know-mgmt/aar/aar.component';
import { SitrepComponent } from './pages/know-mgmt/sitrep/sitrep.component';
import { LessonsLearnedComponent } from './pages/know-mgmt/lessons-learned/lessons-learned.component';
import { FieldObservationsComponent } from './pages/know-mgmt/field-observations/field-observations.component';
import { CourseHistoryComponent } from './pages/know-mgmt/course-history/course-history.component';
import { SurveysComponent } from './pages/know-mgmt/surveys/surveys.component';
import { TrainingFaqsComponent } from './pages/know-mgmt/training-faqs/training-faqs.component';

import { ProgramDataComponent } from './pages/program-data/program-data.component';
import { CdrlComponent } from './pages/program-data/cdrl/cdrl.component';
import { AqlMetricsComponent } from './pages/program-data/aql-metrics/aql-metrics.component';
import { ConstantviewComponent } from './pages/program-data/constantview/constantview.component';

import { WorldmapComponent } from './components/worldmap/worldmap.component';
import { AccountComponent } from './pages/account/account.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CurrentOpsComponent,
    TrainingReadinessComponent,
    KnowMgmtComponent,
    ProgramDataComponent,
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
    SchedulerComponent,
    NotFoundComponent,
    InstructorsComponent,
    InstListComponent,
    InstDetailComponent,
    CalendarComponent,
    ChecklistComponent,
    CoursesComponent,
    FacilitiesMaterialsComponent,
    TrainingAssetsComponent,
    CdrlComponent,
    AqlMetricsComponent,
    ConstantviewComponent
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
