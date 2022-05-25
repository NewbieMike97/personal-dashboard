import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  // showValidationErrors: boolean

  constructor(private noteService: NoteService, private router: Router) { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {

    console.log(form)

    if (form.invalid) return alert("Form is invalid")

    // if (form.invalid) return form.submitted = false

    const note = new Note(form.value.title, form.value.content)

    this.noteService.addNote(note)
    this.router.navigateByUrl("/notes")
  }

}
