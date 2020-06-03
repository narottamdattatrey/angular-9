import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {Person} from '../../person.interface';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: [ './add.component.css' ]
})



export class AddComponent implements OnInit {
  addPersonForm: FormGroup;
  constructor(private fb: FormBuilder,  public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person){}

  ngOnInit(){
    this.addPersonForm = this.fb.group({
      name: ['', Validators.required],
      mobile: [null, [Validators.required, Validators.pattern("(9)[0-9 ]{9}")]],
      age: [null , Validators.required],
      address: ['', Validators.required]
    }) 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  submit(){
    this.dialogRef.close(this.addPersonForm.value);
  }

}
