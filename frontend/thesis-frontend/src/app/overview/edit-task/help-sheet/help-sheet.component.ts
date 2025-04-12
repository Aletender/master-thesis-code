import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MarkdownModule } from 'ngx-markdown';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-help-sheet',
  templateUrl: './help-sheet.component.html',
  standalone: true,
  imports: [
    MarkdownModule, // Nur das Modul importieren
    MatButtonModule
  ],
  styleUrls: ['./help-sheet.component.scss']
})
export class HelpSheetComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { step: string; helpText: string },
    private bottomSheetRef: MatBottomSheetRef<HelpSheetComponent>
  ) {}

  close(): void {
    this.bottomSheetRef.dismiss();
  }
}
