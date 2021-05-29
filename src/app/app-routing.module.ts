import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {GeneratorComponent} from './generator/generator.component';
import {CredentialsComponent} from './credentials/credentials.component';
import {AuthGuard} from './auth.guard';
import {SecureNotesComponent} from './secure-notes/secure-notes.component';
import {GroupsComponent} from './groups/groups.component';
import {SingleGroupComponent} from './single-group/single-group.component';


const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'generator', component: GeneratorComponent},
  {path: 'secure-notes', component: SecureNotesComponent, canActivate: [AuthGuard]},
  {path: 'credentials', component: CredentialsComponent, canActivate: [AuthGuard]},
  {path: 'groups', component: GroupsComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'single-group', component: SingleGroupComponent, canActivate: [AuthGuard]}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
