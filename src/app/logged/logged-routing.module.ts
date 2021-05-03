import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const loggedRoutes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(loggedRoutes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule { }
