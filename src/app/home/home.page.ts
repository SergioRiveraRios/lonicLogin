import { Component, Input } from '@angular/core';
import {Router, NavigationExtras } from "@angular/router"
import {User} from '../models/user'
import {UserService} from '../services/user.service'
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular'; 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myForm: FormGroup;
  submitted = false;
  users: User[] = [];
  constructor(private router:Router,private service:UserService,private form:FormBuilder,public alerta: AlertController) {}
  ngOnInit(){
    this.formValidations();
  }
  createUser(): void {
    this.router.navigate(['/create']);
  }
  successfulLogin():void{
    this.router.navigate(['/login']);
  }
  
  formValidations(){
    this.myForm = this.form.group({
      email:['',Validators.compose([
                Validators.pattern('[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.]+[.][a-zA-Z0-9]+')])],
      password:['',Validators.compose([
                  Validators.minLength(8),
                  Validators.maxLength(16),
                  Validators.pattern('[a-zA-Z0-9]+')])]
    })
  }
  validateUser(){ 
    this.submitted = true;
    if(this.myForm.valid){
      this.users = this.service.getUsers();
      for (let i = 0; i < this.users.length; i++) {
        if(this.users[i].email===this.myForm.get('email').value){
          if(this.users[i].password===this.myForm.get('password').value){
            const extras:NavigationExtras = {
              queryParams: {
                special: JSON.stringify(this.users[i])  
              }
            };
            this.router.navigate(['/login'],extras); 
            break;
          }
          }
      }
      
    }this.wrongPass();
    
  }
  
  async wrongPass() {
    const alert = await this.alerta.create({
      header: 'Incorrecto',
      message: 'Datos Incorrectos',
      buttons: ['OK']
    });

    await alert.present();
  }
}

