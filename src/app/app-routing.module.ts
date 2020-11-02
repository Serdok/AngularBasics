import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: 'users', loadChildren: () => import('./users/users.module').then( (module) => module.UsersModule ) }, // Import another module
  { path: 'contact', component: ContactComponent },
  { path: '', pathMatch: 'full', component: HomeComponent }, // Default path
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
