import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsmapComponent } from '../components/usmap/usmap.component';
import { WorldmapComponent } from '../components/worldmap/worldmap.component';
import { AccountComponent } from '../pages/account/account.component';
import { SettingsComponent } from '../pages/settings/settings.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';

import { OperationsComponent } from '../pages/operations/operations.component';
import { CalendarComponent } from '../pages/operations/calendar/calendar.component';
import { PlanningComponent } from '../pages/operations/planning/planning.component';
import { ClosedOpsComponent} from '../pages/operations/closed-ops/closed-ops.component';

import { ResourcesComponent } from '../pages/resources/resources.component';
import { TrainingReqComponent } from '../pages/resources/training-req/training-req.component';
import { InstructorsComponent } from '../pages/resources/instructors/instructors.component';
import { InstDetailComponent } from '../pages/resources/instructors/inst-detail/inst-detail.component';
import { InstListComponent } from '../pages/resources/instructors/inst-list/inst-list.component';
import { CoursesComponent } from '../pages/resources/courses/courses.component';
import { MissionChecklistComponent } from '../pages/resources/mission-checklist/mission-checklist.component';

import { KnowMgmtComponent } from '../pages/know-mgmt/know-mgmt.component';
import { AarComponent } from '../pages/know-mgmt/aar/aar.component';
import { SitrepComponent } from '../pages/know-mgmt/sitrep/sitrep.component';
import { LessonsLearnedComponent } from '../pages/know-mgmt/lessons-learned/lessons-learned.component';
import { FieldObservationsComponent } from '../pages/know-mgmt/field-observations/field-observations.component';
import { CourseHistoryComponent } from '../pages/know-mgmt/course-history/course-history.component';
import { SurveysComponent } from '../pages/know-mgmt/surveys/surveys.component';
import { TrainingFaqsComponent } from '../pages/know-mgmt/training-faqs/training-faqs.component';

import { ContractMgmtComponent } from '../pages/contractmgmt/contractmgmt.component';
import { CdrlComponent } from '../pages/contractmgmt/cdrl/cdrl.component';
import { AqlMetricsComponent } from '../pages/contractmgmt/aql-metrics/aql-metrics.component';
import { ConstantviewComponent } from '../pages/contractmgmt/constantview/constantview.component';

const routes: Routes = [
  { path: '', component: UsmapComponent, pathMatch: 'full' },
  { path: 'operations', component: OperationsComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'knowmgmt', component: KnowMgmtComponent },
  { path: 'contractmgmt', component: ContractMgmtComponent },
  { path: 'account', component: AccountComponent },
  { path: 'settings', component: SettingsComponent },

  { path: 'calendar', component: CalendarComponent },
  { path: 'planning', component: PlanningComponent },
  { path: 'closedops', component: ClosedOpsComponent },

  { path: 'trainingreq', component: TrainingReqComponent },
  { path: 'instructors', component: InstructorsComponent, children: [
    { path: '', component: InstListComponent },
    { path: ':id', component: InstDetailComponent }
  ]},
  { path: 'courses', component: CoursesComponent },
  { path: 'missionchecklist', component: MissionChecklistComponent },

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
