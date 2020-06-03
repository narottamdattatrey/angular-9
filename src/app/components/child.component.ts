import { Component, Input, OnChanges, SimpleChanges, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Person } from '../person.interface';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: [ './child.component.css' ]
})

export class ChildComponent implements OnInit, OnChanges{
  @Input() person;
  @Output() editedPerson: EventEmitter<any> = new EventEmitter();
  editPerson: Person;
  editPersonForm: FormGroup;
  constructor(private fb: FormBuilder){
    this.editPersonForm = this.fb.group({
      name: ['', Validators.required],
      mobile: [null, [Validators.required, Validators.pattern("(9)[0-9 ]{9}")]],
      age: ['', Validators.required],
      address: ['', Validators.required]
    }) 
  }


ngOnInit(){}
  ngOnChanges(changes: SimpleChanges){
    if(changes.person.currentValue){
      this.editPerson = changes.person.currentValue; 
      const {name, mobile, age, address} = this.editPerson;
      
      this.editPersonForm.setValue({name: name, mobile: mobile, age: age, address: address})
    }
  }

  submit(){
    this.editedPerson.emit({...this.editPersonForm.value, id: this.editPerson.id})
  }
}
