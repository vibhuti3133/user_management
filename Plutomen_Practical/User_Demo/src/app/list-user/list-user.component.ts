import { Component } from '@angular/core';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {
  allUsers : any  = [];
  userId : any = [];
  filters : any ={ role : '', gender : ''};
  ngOnInit() {
    
    this.allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
  }
  onClone(user:any){
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    allUsers.unshift({
      ...user,
      id: Date.now()
    })
    this.allUsers = allUsers;
    localStorage.setItem('allUsers',JSON.stringify(allUsers));
  }
  onDelete(userId:number){
    let allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    allUsers = allUsers.filter((user:any)=> user.id !== userId);
    this.allUsers = allUsers;
    localStorage.setItem('allUsers',JSON.stringify(allUsers));
  }

  onFilter(event:any){
    const {name, value } = event.target;
    this.filters = {
      ...this.filters , 
      [name] :  value
    }
    let allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    allUsers = allUsers.filter((user:any) => {
      if(this.filters.role && this.filters.role !== user.role){
        return false;
      }
      if(this.filters.gender && this.filters.gender !== user.gender){
        return false;
      }
      return true;
    })
    this.allUsers = allUsers;
    // localStorage.setItem('allUsers',JSON.stringify(allUsers));
  }
}
