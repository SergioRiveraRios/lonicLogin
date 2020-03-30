import { Component, OnInit } from '@angular/core';
import {Router ,NavigationExtras} from '@angular/router'
import {User} from '../../models/user'
import {UserService} from '../../services/user.service'
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ToastController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  myForm: FormGroup;
  submitted = false;
  selectedDate;
  url;
  constructor(private service: UserService, private router: Router,private form:FormBuilder,public toastController: ToastController,public loadingController: LoadingController) { 
    
  }

  ngOnInit() {
    this.validations();
    
  }
  goLogin(): void {
    this.router.navigate(['../../home']);
  }
  
  validations(): void{
    this.myForm = this.form.group({
      firstNames:['', Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.pattern('[a-zA-z]+[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*'),
                    ])],
      lastNames:['',Validators.compose([
                      Validators.required,
                      Validators.maxLength(50),
                      Validators.pattern('[a-zA-z]+[ ]*[a-zA-Z]*'),
                      ])],      
      RFC:['',Validators.compose([Validators.required,
              Validators.minLength(10),
              Validators.maxLength(10),
              Validators.pattern('[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][0-9]+')])],
      email:['',Validators.compose([
                Validators.pattern('[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.]+[.][a-zA-Z0-9]+')])],      
      password:['',Validators.compose([
                  Validators.minLength(8),
                  Validators.maxLength(16),
                  Validators.pattern('[a-zA-Z0-9]+') 
      ])],
      image:['',Validators.compose([
                Validators.pattern('https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}')
                ])],
      birthday:[''],
      gender:[''],
      interest:[''],
      food:[''],
      sport:['']
    });
  }
  createUser() {
    this.submitted = true;
    if (this.myForm.valid) {
      this.service.createUser({
        firstNames: this.myForm.get('firstNames').value,
        lastNames: this.myForm.get('lastNames').value,
        RFC: this.myForm.get('RFC').value,
        email:this.myForm.get('email').value,
        gender:this.getGender(),
        birthday:this.myForm.get('birthday').value,
        password:this.myForm.get('password').value,
        interest:{food:this.myForm.get('food').value,sport:this.myForm.get('sport').value},
        image:this.myForm.get('image').value
        
      });
      this.LoadPag();
      this.createToast();
      this.redirectLogin();
    }
  }
  getGender(){
    if (this.myForm.get('gender').value==='Hombre') {
      return 'Hombre'
    } else{
      return 'Mujer'
    }
  }
  changePhoto(){
    this.url=this.myForm.get('image').value
  }
  redirectLogin(){
    const extras:NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.service.popUsers())  
      }
    };
    this.router.navigate(['/login'],extras); 
  }
  async createToast() {
    const toast = await this.toastController.create({
      message: 'Usuario creado',
      duration: 2000
    });
    toast.present();
  }
  async LoadPag() {
    const loading = await this.loadingController.create({
      message: 'Por favor,espera',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
