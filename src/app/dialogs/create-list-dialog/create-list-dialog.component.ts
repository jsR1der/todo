import {Component, Inject, OnInit} from '@angular/core';
import {ButtonComponent} from "../../components/button/button.component";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {InputConfig, InputConfigBuilder} from "../../components/input/input.model";
import {CreateListService} from "./create-list.service";
import {InputComponent} from "../../components/input/input.component";

@Component({
  selector: 'app-create-list-dialog',
  standalone: true,
  imports: [
    ButtonComponent,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    InputComponent
  ],
  templateUrl: './create-list-dialog.component.html',
  styleUrl: './create-list-dialog.component.scss'
})
export class CreateListDialogComponent implements OnInit {
  public nameInputConfig: InputConfig<string>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                message: string
              }, private dialogRef: MatDialogRef<CreateListDialogComponent>,
              public createListService: CreateListService) {
  }

  ngOnInit() {
    this.nameInputConfig = new InputConfigBuilder<string>().setMaterial(true).setControl(this.createListService.controls.name).addPlaceholder('Provide name');
  }

  public createList() {
    if (this.createListService.form.valid) {
      this.dialogRef.close(this.createListService.form.value)
      //   snackbar with success
      console.log(`list was created`)
    } else {
      //   snackbar with form validation
      console.log('validate form')
    }
  }
}
