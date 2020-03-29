import { Injectable } from '@angular/core';
import {User} from '../models/user' 
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = new Array();
  constructor() {
    this.users.push({
      firstNames:'Sergio',
      lastNames:'Rivera',
      gender:'M',
      RFC:'asdasdsad',
      birthday:'1994-12-15',
      email:'sdssdsd@asd.com',
      password:'dsdsdsddsd',
      image:'https://i.picsum.photos/id/101/2621/1747.jpg',
      interest:{food:'pizza',sport:'baseball'}
    });
    this.users.push({
      firstNames:'Sergio',
      lastNames:'Rivera',
      gender:'M',
      RFC:'asdasdsad',
      birthday:'1994-12-15',
      email:'asd@asd.com',
      password:'123456789',
      image:'https://i.picsum.photos/id/101/2621/1747.jpg',
      interest:{food:'pizza',sport:'baseball'}
    });
   }
  createUser(user: User): void {
    this.users.push(user);
  }
  getUsers(): User[] {
    return this.users;
  }
  getUser(pos:number){
    return this.users[pos]
  }
  printUser(){
    console.log(this.users)
  }
}
