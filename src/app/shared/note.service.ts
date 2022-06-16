import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService implements OnDestroy {
  notes: Note[] = [];

  storageListenSub!: Subscription;

  constructor() {
    this.loadState();

    //
    this.storageListenSub = fromEvent(window, 'storage').subscribe(
      (event: any) => {
        if (event.key === 'notes') this.loadState();
      }
    );

    // fromEvent<StorageEvent>(window, "storage").pipe(
    //   filter(event => event.storageArea === sessionStorage),
    //   map(event => event.newValue)
    // )
    // fromEvent<StorageEvent>(window, "storage").pipe(
    //   filter(event => event.storageArea === sessionStorage),
    //   map(event => event.newValue)
    // )
  }

  ngOnDestroy(): void {
    if (this.storageListenSub) this.storageListenSub.unsubscribe;
  }

  getNotes() {
    return this.notes;
  }

  getNote(id: string | null): Note | undefined {
    return this.notes.find((n) => n.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);

    this.saveState();
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id);
    Object.assign(note, updatedFields);

    this.saveState();
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex((n) => n.id === id);
    if (noteIndex == -1) return;

    this.notes.splice(noteIndex, 1);

    this.saveState();
  }

  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadState() {
    try {
      const notesInStorage = JSON.parse(localStorage.getItem('notes')!);
      // if (!notesInStorage) return;

      this.notes.length = 0; //clear notes array, pastrez referinta
      this.notes.push(...notesInStorage);

      this.notes = notesInStorage;
    } catch (e) {
      console.log('There was an error retrieving the notes from local storage');
      console.log(e);
    }
  }
}
