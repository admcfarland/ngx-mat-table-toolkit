import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MttTextDisplayModal } from '../../../mtt-text-display-modal/mtt-text-display-modal';

const ELLIPSIS = '...';

/**
 * A component that truncates a given text to a specified limit and optionally displays the full text.
 * 
 * This component is useful for displaying long text content in a concise manner, with the ability to expand or view details.
 */
@Component({
  selector: 'mtt-truncated-text-details',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './mtt-truncated-text-details.html',
  styleUrl: './mtt-truncated-text-details.scss'
})
export class MttTruncatedTextDetails {
  /**
   * The full text to be displayed or truncated.
   */
  @Input() fullText = '';

  /**
   * The maximum number of characters to display before truncating.
   * If undefined, the full text will always be displayed.
   */
  @Input() limit!: number | undefined;

  /**
   * Returns the truncated version of the full text if it exceeds the specified limit.
   * Appends an ellipsis (`...`) to indicate truncation.
   * 
   * @returns The truncated text or the full text if no truncation is needed.
   */
  get truncatedText(): string {
    return this.limit && this.fullText.length > this.limit
      ? this.fullText.substring(0, this.limit) + ELLIPSIS
      : this.fullText;
  }

  /**
   * Indicates whether the text is truncated based on the specified limit.
   * 
   * @returns `true` if the text is truncated, otherwise `false`.
   */
  get isTruncated(): boolean {
    return !!this.limit && this.fullText.length > this.limit;
  }

  constructor(private dialog: MatDialog) { }

  /**
   * Opens a modal dialog to display the full text.
   * 
   * Triggered when the user wants to view the complete text that has been truncated.
   */
  protected openFullTextModal(): void {
    this.dialog.open(MttTextDisplayModal, {
      data: {
        title: 'View Full Text',
        text: this.fullText,
      }
    });
  }
}
