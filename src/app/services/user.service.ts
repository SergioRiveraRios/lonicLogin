import { Injectable } from '@angular/core';
import { User } from '../models/user'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = new Array();
  constructor() {
    this.users.push({
      firstNames: 'Sergio',
      lastNames: 'Rivera',
      gender: 'M',
      RFC: 'asdasdsad',
      birthday: '1994-12-15',
      email: 'sdssdsd@asd.com',
      password: 'dsdsdsddsd',
      image: 'https://i.picsum.photos/id/866/300/300.jpg',
      interest: ['asdasds', 'sds']
    });
  }
  createUser(user: User): void {
    this.users.push(user);
  }
  getUsers(): User[] {
    return this.users;
  }
  popUsers(): User {
    return this.users.pop();
  }
}
