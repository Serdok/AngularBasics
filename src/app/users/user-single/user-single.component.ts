import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.sass']
})
export class UserSingleComponent implements OnInit {
  user: object;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Fetching the :username part of the route
      const username = params.username;
      this.userService.getUser(username)
        .subscribe(user => this.user = user);
    });
  }

}
