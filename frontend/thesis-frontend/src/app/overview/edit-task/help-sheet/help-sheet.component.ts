// file: frontend/thesis-frontend/src/app/overview/edit-task/help-sheet/help-sheet.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-help-sheet',
  templateUrl: './help-sheet.component.html',
  standalone: true,
  imports: [
    MatIcon
  ],
  styleUrls: ['./help-sheet.component.scss']
})
export class HelpSheetComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { helpText: string },
    private bottomSheetRef: MatBottomSheetRef<HelpSheetComponent>
  ) {}

  close(): void {
    this.bottomSheetRef.dismiss();
  }
}
