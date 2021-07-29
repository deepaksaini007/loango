import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { UserData } from 'src/app/core/data-models/auth-response';
import { DashboardMenu } from 'src/app/core/data-models/dashboard-menu/dashbord-menu';
import { AuthorizationService } from 'src/app/core/services/Authorization/authorization-service.service';
import { StoreService } from 'src/app/core/services/store/store.service';
//import { AuthorizationService } from 'src/app/core/services/authorization/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 //currentTime :number;
  clickedIndex = -1;
  currentTime!:number;
  toggleMenu=false;
  loggedInUser$:Observable<UserData|undefined>|undefined;
  isAdminUser$:Observable<boolean>|undefined;
  assignedMenus$: Observable<DashboardMenu[]>|undefined

  constructor(public dialog:MatDialog,private authorizationService:AuthorizationService,private storeService:StoreService){
    setInterval(()=>{
      this.currentTime = Date.now()
    },1)
  }

  ngOnInit() {
    this.loggedInUser$ = this.storeService.getLoggedInUser$;
    this.isAdminUser$  =this.storeService.isAdmin$;
    this.assignedMenus$ = this.storeService.assignedMenus$;
  }

  openMenu(index:any){
    this.clickedIndex = index;
  }
  toggle() {
    this.toggleMenu = !this.toggleMenu
  }

  logout(){
    this.authorizationService.logoutUser()
  }



}
