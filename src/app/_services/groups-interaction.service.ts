import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

const GROUP_ID = 'group_id';
const GROUP_NAME = 'group_name';
const ETAG = 'etag';

@Injectable({
  providedIn: 'root'
})
export class GroupsInteractionService {

  saveGroup(groupName: string, groupId: string): void {
    window.sessionStorage.removeItem(GROUP_ID);
    window.sessionStorage.setItem(GROUP_ID, groupId);
    window.sessionStorage.removeItem(GROUP_NAME);
    window.sessionStorage.setItem(GROUP_NAME, groupName);
  }

  getGroup(): string[] | null {
    return [window.sessionStorage.getItem(GROUP_ID), window.sessionStorage.getItem(GROUP_NAME)];
  }

  saveETag(eTag: string): void {
    window.sessionStorage.removeItem(ETAG);
    window.sessionStorage.setItem(ETAG, eTag);
  }

  getETag(): string {
    return window.sessionStorage.getItem(ETAG);
  }

  clearEtag(): void {
    window.sessionStorage.removeItem(ETAG);
  }
}
