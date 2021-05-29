import { Component, OnInit } from '@angular/core';
import {GroupsService} from '../_services/groups.service';
import {SidebarService} from '../_services/sidebar.service';
import {GroupsInteractionService} from '../_services/groups-interaction.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groupForm: any = {
    name: null,
  };

  joinForm: any = {
    code: null,
  };
  ifCreate = false;
  groups = [];
  errorMessage = '';
  message = {
    id: null,
    name: null
  };

  isJoinFailed = false;

  constructor(private groupService: GroupsService, private sideBarService: SidebarService,
              private groupsInteractioService: GroupsInteractionService, private router: Router) { }

  ngOnInit(): void {
    this.groupService.getAllGroups().subscribe(data => {
      this.groups = data.listResponse;
      console.log(data.listResponse);
    });
  }

  onClick(group: any): void {
    this.groupsInteractioService.saveGroup(group.name, group.id);
    this.router.navigateByUrl('single-group');
  }


  toggleAddSideBar(): void {
    this.ifCreate = true;
    this.sideBarService.setShowNav(true);
  }

  toggleJoinSideBar(): void {
    this.ifCreate = false;
    this.sideBarService.setShowNav(true);
  }

  onCreate(): void {
    const {name} = this.groupForm;
    this.groupService.createGroup(name).subscribe(data => {
      window.location.reload();
    },
      err => {
        this.errorMessage = err.error.message;
      });
  }

  onJoin(): void {
    const {code} = this.joinForm;
    this.groupService.join(code).subscribe(data => {
      window.location.reload();
    },
      err => {
        this.errorMessage = err.error.message;
        if (err.status === 400){
          this.isJoinFailed = true;
        }
      });
  }

}
