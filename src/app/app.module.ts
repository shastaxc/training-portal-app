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

import { ForceModernizationComponent } from './pages/force-modernization/force-modernization.component';
import { TrainingReqComponent } from './pages/force-modernization/training-req/training-req.component';
import { InstructorsComponent } from './pages/force-modernization/instructors/instructors.component';
import { InstListComponent } from './pages/force-modernization/instructors/inst-list/inst-list.component';
import { InstDetailComponent } from './pages/force-modernization/instructors/inst-detail/inst-detail.component';
import { CoursesComponent } from './pages/force-modernization/courses/courses.component';
import { FacilitiesMaterialsComponent } from './pages/force-modernization/facilities-materials/facilities-materials.component';
import { TrainingAssetsComponent } from './pages/force-modernization/training-assets/training-assets.component';
import { DevTrackerComponent } from './pages/force-modernization/dev-tracker/dev-tracker.component';

import { KnowMgmtComponent } from './pages/know-mgmt/know-mgmt.component';
import { AarComponent } from './pages/know-mgmt/aar/aar.component';
import { SitrepComponent } from './pages/know-mgmt/sitrep/sitrep.component';
import { LessonsLearnedComponent } from './pages/know-mgmt/lessons-learned/lessons-learned.component';
import { FieldObservationsComponent } from './pages/know-mgmt/field-observations/field-observations.component';
import { CourseHistoryComponent } from './pages/know-mgmt/course-history/course-history.component';
import { SurveysComponent } from './pages/know-mgmt/surveys/surveys.component';
import { TrainingFaqsComponent } from './pages/know-mgmt/training-faqs/training-faqs.component';
import { TotalPkgFieldDocComponent } from './pages/know-mgmt/total-pkg-field-doc/total-pkg-field-doc.component';
import { PoiListComponent } from './pages/know-mgmt/poi-list/poi-list.component';

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
    ForceModernizationComponent,
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
    ConstantviewComponent,
    TrainingReqComponent,
    TotalPkgFieldDocComponent,
    DevTrackerComponent,
    PoiListComponent
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
