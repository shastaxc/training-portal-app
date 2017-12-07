import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorldmapComponent } from '../components/worldmap/worldmap.component';
import { CurrentOpsComponent } from '../pages/current-ops/current-ops.component';
import { TrainingReadinessComponent } from '../pages/training-readiness/training-readiness.component';
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

const routes: Routes = [
  { path: '', component: WorldmapComponent, pathMatch: 'full' },
  { path: 'currentops', component: CurrentOpsComponent },
  { path: 'readiness', component: TrainingReadinessComponent },
  { path: 'knowmgmt', component: KnowMgmtComponent },
  { path: 'programdata', component: ProgramDataComponent },
  { path: 'account', component: AccountComponent },
  { path: 'settings', component: SettingsComponent },

  { path: 'aar', component: AarComponent },
  { path: 'sitrep', component: SitrepComponent },
  { path: 'll', component: LessonsLearnedComponent },
  { path: 'fieldobs', component: FieldObservationsComponent },
  { path: 'coursehist', component: CourseHistoryComponent },
  { path: 'surveys', component: SurveysComponent },
  { path: 'trainingfaqs', component: TrainingFaqsComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
