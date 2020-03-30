import { Component, OnInit } from '@angular/core';
import  {User} from  '../../models/user'
import {Router, ActivatedRoute } from "@angular/router"
import {UserService} from '../../services/user.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: any;
  
  constructor(private router:Router,private service:UserService,private actrouter: ActivatedRoute) {
    this.actrouter.queryParams.subscribe(
      params => {
        this.user = JSON.parse(params.special);
      }//params
    );//actrouter
   }

  ngOnInit() {
  }
  openSlider():void{
    this.router.navigate(['/slider']);
  }
}
