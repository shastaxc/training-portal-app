import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorldmapComponent } from '../components/worldmap/worldmap.component';
import { CurrentOpsComponent } from '../pages/current-ops/current-ops.component';
import { ForceModernizationComponent } from '../pages/force-modernization/force-modernization.component';
import { KnowMgmtComponent } from '../pages/know-mgmt/know-mgmt.component';
import { ProgramDataComponent } from '../pages/program-data/program-data.component';
import { AccountComponent } from '../pages/account/account.component';
import { SettingsComponent } from '../pages/settings/settings.component';
import { AarComponent } from '../pages/know-mgmt/aar/aar.component';
import { SitrepComponent } from '../pages/know-mgmt/sitrep/sitrep.component';
import { LessonsLearnedComponent } from '../pages/know-mgmt/lessons-learned/lessons-learned.component';
import { FieldObservationsComponent } from '../pages/know-mgmt/field-observations/field-observations.component';
import { CourseHistoryComponent } from '../pages/know-mgmt/course-history/course-history.component';
import { SurveysComponent } from '../pages/know-mgmt/surveys/surveys.component';
import { TrainingFaqsComponent } from '../pages/know-mgmt/training-faqs/training-faqs.component';
import { SchedulerComponent } from '../pages/current-ops/scheduler/scheduler.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { TrainingReqComponent } from '../pages/force-modernization/training-req/training-req.component';
import { InstructorsComponent } from '../pages/force-modernization/instructors/instructors.component';
import { InstDetailComponent } from '../pages/force-modernization/instructors/inst-detail/inst-detail.component';
import { InstListComponent } from '../pages/force-modernization/instructors/inst-list/inst-list.component';
import { CalendarComponent } from '../pages/current-ops/calendar/calendar.component';
import { ChecklistComponent } from '../pages/current-ops/checklist/checklist.component';
import { CoursesComponent } from '../pages/force-modernization/courses/courses.component';
import { FacilitiesMaterialsComponent } from '../pages/force-modernization/facilities-materials/facilities-materials.component';
import { TrainingAssetsComponent } from '../pages/force-modernization/training-assets/training-assets.component';
import { CdrlComponent } from '../pages/program-data/cdrl/cdrl.component';
import { AqlMetricsComponent } from '../pages/program-data/aql-metrics/aql-metrics.component';
import { ConstantviewComponent } from '../pages/program-data/constantview/constantview.component';

const routes: Routes = [
  { path: '', component: WorldmapComponent, pathMatch: 'full' },
  { path: 'currentops', component: CurrentOpsComponent },
  { path: 'forcemod', component: ForceModernizationComponent },
  { path: 'knowmgmt', component: KnowMgmtComponent },
  { path: 'programdata', component: ProgramDataComponent },
  { path: 'account', component: AccountComponent },
  { path: 'settings', component: SettingsComponent },

  { path: 'calendar', component: CalendarComponent },
  { path: 'scheduler', component: SchedulerComponent },
  { path: 'checklist', component: ChecklistComponent },

  { path: 'trainingreq', component: TrainingReqComponent },
  { path: 'instructors', component: InstructorsComponent, children: [
    { path: '', component: InstListComponent },
    { path: ':id', component: InstDetailComponent }
  ]},
  { path: 'courses', component: CoursesComponent },
  { path: 'facilitiesmaterials', component: FacilitiesMaterialsComponent },
  { path: 'trainingassets', component: TrainingAssetsComponent },

  { path: 'aar', component: AarComponent },
  { path: 'sitrep', component: SitrepComponent },
  { path: 'll', component: LessonsLearnedComponent },
  { path: 'fieldobs', component: FieldObservationsComponent },
  { path: 'coursehist', component: CourseHistoryComponent },
  { path: 'surveys', component: SurveysComponent },
  { path: 'trainingfaqs', component: TrainingFaqsComponent },

  { path: 'cdrl', component: CdrlComponent },
  { path: 'aql', component: AqlMetricsComponent },
  { path: 'constantview', component: ConstantviewComponent },

  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

// Only use useHash to running a production build locally.
// Turn off useHash if running production build on web server.
@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
