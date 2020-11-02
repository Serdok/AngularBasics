import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UserSingleComponent } from './user-single/user-single.component';

const routes: Routes = [
  { path: ':username', component: UserSingleComponent },
  { path: '', pathMatch: 'full', component: UserListComponent }, // Default path
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class UserRoutingModule { }
