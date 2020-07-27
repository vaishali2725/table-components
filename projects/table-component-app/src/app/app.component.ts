import { Component } from '@angular/core';
import { UsersService } from './_services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  users = [];
  columns = ['userId', 'firstName', 'lastName', 'phoneNumber', 'emailAddress'];
  dtoptions : {};
  btnOptions: {};
  constructor(private api: UsersService) {}

  ngOnInit(){
    this.dtoptions = {
      paging:true,
      pageLength: 2,
      searching:true
    };
    this.btnOptions = ['exportToExcel', 'exportToCsv', 'print', 'copyToClipboard']
    this.getUserData();
  }

  getUserData(){
    this.api.getUsersData().subscribe(
      response => {
        this.users = response.users;
      }
    );
  }

}
