import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {

  userDetails:any;
  userName:string;
  constructor(private router: Router) { }

  ngOnInit() {   
    this.userName=localStorage.getItem('currentUserName');

  }

  Logout()
  {  
      this.router.navigateByUrl('');
  }



}
