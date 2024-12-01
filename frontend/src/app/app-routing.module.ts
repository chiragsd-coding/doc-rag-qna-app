import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { DocumentUploadComponent } from './document/document-upload/document-upload.component';
import { IngestionStatusComponent } from './ingestion/ingestion-status/ingestion-status.component';
import { QaInputComponent } from './qna/qa-input/qa-input.component';
import { AuthGuard } from './auth/auth.guard'; // Implement AuthGuard for protection

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'document-upload', component: DocumentUploadComponent, canActivate: [AuthGuard] },
  { path: 'ingestion-status', component: IngestionStatusComponent, canActivate: [AuthGuard] },
  { path: 'qna', component: QaInputComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
