import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SideBarDirection} from './side-bar-direction';
import {SidebarService} from '../_services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  showSideNav: Observable<boolean>;

  @Input() sidenavtemplateRef: any;
  @Input() duration = 0.25;
  @Input() navWidth: number = window.innerWidth;
  @Input() direction: SideBarDirection = SideBarDirection.Right;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.showSideNav = this.sidebarService.getShowBar();
  }

  onSidebarClose(): void {
    this.sidebarService.setShowNav(false);
  }

  getSideBarStyle(showNav: boolean): any {
    const sideBarStyle: any = {};
    sideBarStyle.transition = this.direction + '' + this.duration + 's, visibility ' + this.duration + 's';
    sideBarStyle.width = this.navWidth + 'px';
    sideBarStyle[this.direction] = (showNav ? 0 : (this.navWidth * -1)) + 'px';
    return sideBarStyle;
  }

}
