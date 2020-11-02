import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { UserListComponent } from './user-list/user-list.component';
import { UserSingleComponent } from './user-single/user-single.component';



@NgModule({
  declarations: [UserListComponent, UserSingleComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
  ]
})
export class UsersModule { }
