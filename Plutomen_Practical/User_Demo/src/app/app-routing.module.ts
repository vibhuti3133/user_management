import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserComponent } from './list-user/list-user.component';



const routes: Routes = [
  { path: '', component: ListUserComponent },
  { path: 'users', component: ListUserComponent },
  { path: 'users/:userId', component: CreateUserComponent },
  { path: 'users/add', component: CreateUserComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
