import { Component } from '@angular/core';
import { FormsModule,FormGroup,FormBuilder, FormArray, FormControl, Validators }   from '@angular/forms';
import { DataServicesService } from '../data-services.service';
import { state } from '@angular/animations';
import { ActivatedRoute ,Router } from '@angular/router';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  createForm!: FormGroup;
  countries!: any[];
  states!: any[];
  userId : any
  addresses: any[] = [{ countryId: '', stateId: '', street: '', city: '', postalCode: '' }];
  total_addresses: number = 1;
  FormBuilder: any;
  router: any;
  editUser : any;
  constructor(private dataService: DataServicesService,private route: ActivatedRoute,private _router: Router ) {}


  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.editUser = null;

    if(this.userId && this.userId !== 'add'){
      const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");
      this.editUser = allUsers.find((user:any)=> user.id == this.userId);

    }
    this.createForm = new FormGroup({
      name: new FormControl(this.editUser?.name || ""),
      email: new FormControl(this.editUser?.email || ""),
      number : new FormControl(this.editUser?.number || ""),
      gender:new FormControl(this.editUser?.gender || ""),
      role:new FormControl(this.editUser?.role ||""),
      address :  new FormArray(this.editUser?.addresses?.length ? this.editUser?.addresses.map((address:any) => new FormGroup({
        street: new FormControl(address.street || ''),
        zip : new FormControl(address.zip || ''),
        city: new FormControl(address.city || ''),
        state: new FormControl(address.state || '')
      })) : [
        new FormGroup({
          street: new FormControl(''),
          zip : new FormControl(''),
          city: new FormControl(''),
          state: new FormControl('')
        })
      ])
  })
  }

  onSubmit() {
   
    let data = {
      id: this.editUser?.id ||  Date.now(),
      name : this.createForm.value['name'],
      email : this.createForm.value["email"],
      number : this.createForm.value["number"],
      gender : this.createForm.value["gender"],
      role : this.createForm.value["role"],
      addresses: this.createForm.controls['address'].value,
    }

   const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");
   if(this.editUser){
    const editUserIndex = allUsers.findIndex((user:any)=>user.id === this.editUser.id)
    allUsers[editUserIndex] = data;
   }else{
    allUsers.unshift(data)
   }
   localStorage.setItem('allUsers',JSON.stringify(allUsers));
   this.createForm.reset();
   this._router.navigate(['/users'])
   }
  totalAddressNumber(){
    const control = <FormArray>this.createForm.controls['address'];
    
    control.push(
      new FormGroup({
        street: new FormControl(''),
        zip : new FormControl(''),
        city: new FormControl(''),
        state: new FormControl('')
      })
    )
    this.total_addresses += 1;
  }
  numberOnly(event :any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
         return false;
      }
      return true;
  
  }
}
