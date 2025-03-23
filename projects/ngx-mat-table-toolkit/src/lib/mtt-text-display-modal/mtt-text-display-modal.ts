import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

/**
 * A modal component for displaying text content.
 * 
 * This component is used to show detailed text content, such as truncated text, in a modal dialog.
 * It provides a title and a close button for user interaction.
 */
@Component({
  selector: 'mtt-text-display-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './mtt-text-display-modal.html',
  styleUrl: './mtt-text-display-modal.scss'
})
export class MttTextDisplayModal {
  /**
   * The title of the modal dialog.
   * Defaults to "Text Display" if no title is provided in the data.
   */
  @Input() title = 'Text Display';

  /**
   * Creates an instance of the modal dialog.
   * 
   * @param dialogRef - A reference to the dialog instance.
   * @param data - The data passed to the modal, including the title and text content.
   */
  constructor(
    public dialogRef: MatDialogRef<MttTextDisplayModal>,
    @Inject(MAT_DIALOG_DATA) public data: { title?: string, text: string }
  ) {
    if (data.title) {
      this.title = data.title;
    }
  }

  /**
   * Closes the modal dialog.
   */
  close(): void {
    this.dialogRef.close();
  }
}
