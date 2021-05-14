import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../_services/sidebar.service';
import {SaveNotesService} from '../_services/save-notes.service';

@Component({
  selector: 'app-secure-notes',
  templateUrl: './secure-notes.component.html',
  styleUrls: ['./secure-notes.component.css']
})
export class SecureNotesComponent implements OnInit {

  form: any = {
    title: null,
    content: null
  };

  form2: any = {
    id: '',
    title: '',
    content: '',
    titleEdited: '',
    contentEdited: ''
  };

  ifAdd = false;
  isTitleModified = false;
  isContentModified = false;
  notes = [];
  errorMessage = '';


  constructor(private sideBarService: SidebarService, private saveNotesService: SaveNotesService) { }

  ngOnInit(): void {
    this.saveNotesService.getAllNotes().subscribe(data => {
      this.notes = data.secureNotes;
    });
  }

  toggleAddSideBar(): void {
    this.ifAdd = true;
    this.form.title = null;
    this.form.content = null;
    this.sideBarService.setShowNav(true);
  }


  toggleEditSideBar(note: any): void {
    this.ifAdd = false;
    this.form2.id = note.id;
    this.form2.title = note.title;
    this.form2.titleEdited = note.title;

    this.saveNotesService.showContent(this.form2.id).subscribe(data => {
      this.form2.content = data.content;
      this.form2.contentEdited = data.content;

    });

    this.sideBarService.setShowNav(true);
  }

  onSubmit(): void {
    const {title, content} = this.form;
    this.saveNotesService.saveNote(title, content).subscribe(data => {
      window.location.reload();
    },
      err => {
        this.errorMessage = err.error.message;
      });
  }

  onDelete(): void {
    this.saveNotesService.deleteNote(this.form2.id).subscribe(data => {
      window.location.reload();
    },
      err => {
        this.errorMessage = err.error.message;
      });
  }

  onEdit(): void {
    let isModified = false;

    if (this.form2.title !== this.form2.titleEdited) {
      this.isTitleModified = true;
      isModified = true;
    }

    if (this.form2.content !== this.form2.contentEdited) {
      this.isContentModified = true;
      isModified = true;
    }

    if (!isModified) {
      return null;
    }

    console.log(this.form2.contentEdited);
    console.log(this.isContentModified);
    console.log(isModified);

    this.saveNotesService.updateNote(this.form2.id, this.form2.titleEdited,
      this.isTitleModified, this.form2.contentEdited, this.isContentModified).subscribe(data => {
        window.location.reload();
      },
      err => {
        this.errorMessage = err.error.message;
    });
  }
}
