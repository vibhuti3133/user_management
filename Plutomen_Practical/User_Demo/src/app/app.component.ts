import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'User_Demo';
  router: any;

  btnClicked(value:any):void {
      this.router.navigateByUrl('dashboard');
  }
}
