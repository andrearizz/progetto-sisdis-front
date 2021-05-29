import {Component, OnInit} from '@angular/core';
import {GroupsInteractionService} from '../_services/groups-interaction.service';
import {GroupsService} from '../_services/groups.service';
import {SidebarService} from '../_services/sidebar.service';
import {TokenStorageService} from '../_services/token-storage.service';


@Component({
  selector: 'app-single-group',
  templateUrl: './single-group.component.html',
  styleUrls: ['./single-group.component.css']
})
export class SingleGroupComponent implements OnInit {

  name = '';
  id = '';
  role = '';
  isCredentials = false;
  isNotes = false;
  credentials = [];
  notes = [];
  ifCredentialAdd = false;
  ifCredentialEdit = false;
  isShowCredential = false;
  ifDashBoard = false;
  ifMember = false;
  ifNotesAdd = false;
  ifNotesEdit = false;
  ifUnauthorized = false;

  formCredential: any = {
    url: null,
    login: null,
    password: null
  };

  formCredentialEdit: any = {
    id: '',
    url: '',
    urlEdited: '',
    login: '',
    loginEdited: '',
    password: '',
    passwordEdited: ''
  };

  formNotes: any = {
    title: null,
    content: null
  };

  formNotesEdit: any = {
    id: '',
    title: '',
    content: '',
    titleEdited: '',
    contentEdited: ''
  };

  memberForm: any = {
    username: '',
    role: ''
  };

  members = [];
  eTag = '';
  errorMessage = '';
  ifPrecondition = false;

  constructor(private groupInteractionService: GroupsInteractionService, private groupService: GroupsService,
              private sideBarService: SidebarService, private groupsInteraction: GroupsInteractionService,
              private tokenStorageService: TokenStorageService ) { }

  ngOnInit(): void {
    this.ifMember = false;
    const x = this.groupInteractionService.getGroup();
    this.name = x[1];
    this.id = x[0];
    this.ifDashBoard = true;
    this.groupService.getMembers(this.id).subscribe(data => {
      this.members = data.members;
      this.members.forEach(value => {
        console.log(value);
        if (value.username === this.tokenStorageService.getUser().username) {
          this.role = value.role;
          console.log(this.role);
        }
      });
    });
  }

  onGroup(): void {
    this.ngOnInit();
  }

  onCredentials(): void {
    this.ifMember = false;
    this.isCredentials = true;
    this.isNotes = false;
    this.ifDashBoard = false;
    this.groupService.getAllCredentials(this.id).subscribe(data => {
      this.credentials = data.credentials;
    });
  }

  onNotes(): void {
    this.isNotes = true;
    this.isCredentials = false;
    this.ifDashBoard = false;
    this.groupService.getAllNotes(this.id).subscribe(data => {
      this.notes = data.secureNotesGroupResponses;
    });
  }

  toggleAddCredentialSideBar(): void {
      this.ifUnauthorized = false;
      this.ifCredentialAdd = true;
      this.ifCredentialEdit = false;
      this.sideBarService.setShowNav(true);
  }

  toggleAddSecureNotesSideBar(): void {
    this.ifUnauthorized = false;
    this.ifNotesAdd = true;
    this.ifNotesEdit = false;
    this.sideBarService.setShowNav(true);
  }

  toggleViewUser(member: any): void {
    this.ifMember = true;
    this.memberForm.username = member.username;
    this.memberForm.role = member.role;
    this.sideBarService.setShowNav(true);
  }

  toggleEditNotesSideBar(note: any): void {
    this.ifUnauthorized = false;
    this.ifNotesAdd = false;
    this.ifNotesEdit = true;
    this.formNotesEdit.id = note.id;
    console.log(this.formNotesEdit.id);
    this.formNotesEdit.title = note.title;
    this.formNotesEdit.titleEdited = note.title;
    this.formNotesEdit.content = note.content;
    this.formNotesEdit.contentEdited = note.content;
    this.eTag = note.version;
    console.log(note.version);
    this.groupsInteraction.saveETag(this.eTag);
    this.sideBarService.setShowNav(true);
  }


  toggleEditSideBar(credential: any): void {
    this.ifUnauthorized = false;
    this.ifCredentialEdit = true;
    this.ifCredentialAdd = false;
    this.formCredentialEdit.id = credential.id;
    this.formCredentialEdit.url = credential.url;
    this.formCredentialEdit.urlEdited = credential.url;
    this.formCredentialEdit.login = credential.login;
    this.formCredentialEdit.loginEdited = credential.login;
    this.eTag = credential.version;
    console.log(credential.version);
    this.groupsInteraction.saveETag(this.eTag);
    this.groupService.getPassword(this.id, credential.id).subscribe(data => {
      this.formCredentialEdit.password = data.body.message;
      this.formCredentialEdit.passwordEdited = this.formCredentialEdit.password;
    },
      err => {
        this.errorMessage = err.error.message;
        if (err.status === 412) {
          this.ifPrecondition = true;
        }
        if (err.status === 403) {
          this.ifUnauthorized = true;
        }
      });
    this.sideBarService.setShowNav(true);
  }

  onCredentialSubmit(): void {
    this.ifUnauthorized = false;
    const id = this.id;
    const {url, login, password } = this.formCredential;
    this.groupService.saveCredential(id, url, login, password).subscribe(data => {
        console.log(data);
        this.onCredentials();
        this.sideBarService.setShowNav(false);
      },
      err => {
        this.errorMessage = err.error.message;
        if (err.status === 403) {
          this.ifUnauthorized = true;
        }
      });
  }

  onShow(): void {
    this.isShowCredential = true;

  }

  onHide(): void {
    this.isShowCredential = false;
  }

  onDelete(): void {
    this.ifUnauthorized = false;
    this.groupService.deleteCredential(this.id, this.formCredentialEdit.id).subscribe(data => {
        this.onCredentials();
        this.sideBarService.setShowNav(false);
      },
      err => {
        this.errorMessage = err.error.message;
        if (err.status === 403) {
          this.ifUnauthorized = true;
        }
      });
  }

  onNoteDelete(): void {
    this.ifUnauthorized = false;
    this.groupService.deleteNote(this.id, this.formNotesEdit.id).subscribe(data => {
      this.onNotes();
      this.sideBarService.setShowNav(false);
    },
      err => {
      this.errorMessage = err.error.message;
      if (err.status === 403) {
        this.ifUnauthorized = true;
      }
      });
  }

  onNoteEdit(): void {
    this.ifUnauthorized = false;
    if (this.formNotesEdit.title !== this.formNotesEdit.titleEdited ||
    this.formNotesEdit.content !== this.formNotesEdit.contentEdited) {
      console.log(this.formNotesEdit.titleEdited);
      console.log(this.formNotesEdit.contentEdited);
      this.groupService.editNote(this.id, this.formNotesEdit.id, this.formNotesEdit.titleEdited,
        this.formNotesEdit.contentEdited).subscribe(data => {
          this.onNotes();
          this.sideBarService.setShowNav(false);
      },
        err => {
          if (err.status === 412) {
            this.ifPrecondition = true;
          }
          if (err.status === 403) {
            this.ifUnauthorized = true;
          }
        });
    }
    this.groupsInteraction.clearEtag();
  }

  onEdit(): void {
    this.ifUnauthorized = false;
    let isModified = false;

    if (this.formCredentialEdit.url !== this.formCredentialEdit.urlEdited ||
      this.formCredentialEdit.login !== this.formCredentialEdit.loginEdited ||
      this.formCredentialEdit.password !== this.formCredentialEdit.passwordEdited) {
      isModified = true;
    }
    if (isModified) {
      this.groupService.editCredential(this.id, this.formCredentialEdit.id, this.formCredentialEdit.urlEdited,
        this.formCredentialEdit.loginEdited, this.formCredentialEdit.passwordEdited, this.eTag).subscribe(data => {
          this.onCredentials();
          this.sideBarService.setShowNav(false);
        },
        err => {
          if (err.status === 412) {
            this.ifPrecondition = true;
          }
          if (err.status === 403) {
            this.ifUnauthorized = true;
          }
        });
      this.groupsInteraction.clearEtag();
    }
  }

  onChangeRole(): void {
    console.log(this.memberForm.username);
    this.groupService.changeRole(this.id, this.memberForm.username, this.memberForm.role).subscribe(data => {
      this.onGroup();
      this.sideBarService.setShowNav(false);
    },
      err => {
        this.errorMessage = err.error.message;
        if (err.status === 403) {
          this.ifUnauthorized = true;
        }
      });
  }

  onReload(): void {
    window.location.reload();
  }

  onNoteSubmit(): void {
    const {title, content} = this.formNotes;
    this.groupService.saveNote(this.id, title, content).subscribe(data => {

      this.onNotes();
      this.sideBarService.setShowNav(false);
    },
      err => {
      this.errorMessage = err.error.message;
      if (err.status === 403) {
        this.ifUnauthorized = true;
      }
      });
  }
}
