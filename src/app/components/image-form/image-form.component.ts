import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: 'app-image-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './image-form.component.html',
  styleUrl: './image-form.component.css'
})
export class ImageFormComponent {

  public file?: File;

  @Output()
  public emitted: EventEmitter<File> = new EventEmitter<File>();

  public onPhotoSubmit(form: NgForm): void {
    if (form.valid && this.file) {
      this.emitted.emit(this.file)
    }
  }

  public onPhotoChange(change: any): void {
    if (change && change.target && change.target.files) {
      this.file = change.target.files.item(0);
    }
  }

}
