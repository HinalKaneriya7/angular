import { ApiService } from './../../services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public users:any = [];

  public Name : string = "";
  public Role : string = "";
  user: any = {};
  constructor(private auth:AuthService, private api:ApiService,private userStore: UserStoreService) {
    this.user = auth.decodeToken()
   }

  ngOnInit() {
    this.api.getUsers()
    .subscribe(res =>{
      this.users = res;
    });

    this.userStore.getNameFromStore()
    .subscribe(val => {
      const NameFromToken = this.auth.getNameFromToken();
      this.Name = val || NameFromToken
    })

    this.userStore.getRoleFromStore()
    .subscribe(val => {
      const RoleFromToken = this.auth.getRoleFromToken();
      console.log(RoleFromToken)
      this.Role = val || RoleFromToken
    })

  }

  logOut() {
    this.auth.signOut();
  }

}
