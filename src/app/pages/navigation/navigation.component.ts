import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  checkToken() {
    let userStorage = localStorage.getItem('userObj');
    if (!userStorage) {
      userStorage = "[]";
    }
    return userStorage != "[]" ? true : false;
  }
}
