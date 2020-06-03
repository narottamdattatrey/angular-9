import { Component, OnInit, IterableDiffers, DoCheck } from '@angular/core';
import { Person } from './person.interface';
import { MatDialog } from '@angular/material/dialog';
import {AddComponent} from './components/add/add.component';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, DoCheck  {
  name = 'Angular';
  localData: Person[];
  displayedColumns: string[] = [ 'name', 'mobile'];
  open: boolean;
  editedPerson: Person;
  iterableDiffer: any;
  searchKey: string | number;

  constructor(public dialog: MatDialog, iterableDiffers: IterableDiffers){
    this.iterableDiffer = iterableDiffers.find([]).create(null);
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.localData);
    if (changes) {
        this.localData = [].concat(this.localData).sort((a,b) => a.name > b.name ? 1 : (a.name < b.name ? -1 : 0));
    }
}

  ngOnInit(): void{
    this.localData = this.getLocally('personList');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.setItem(result);
      }
    });
  }

  setLocally(prop: string, data: any): void{
    localStorage.setItem(prop, JSON.stringify(data))
  }

  getLocally(prop: string){
    if(localStorage.getItem(prop)){
      return JSON.parse(localStorage.getItem(prop)).sort((a,b) => a.name > b.name ? 1 : (a.name < b.name ? -1 : 0));
    } else {
      return []
    }
   
  }

  setItem(data){
    let id = this.localData.length > 0 ? this.localData.length +1 : 1;
    this.localData.push({...data, id: id});
    this.setLocally('personList', this.localData)
    // update personList
    this.localData = this.getLocally('personList');
    // this.ref.markForCheck();
  }

  editPerson(data){
    this.open = true;
    this.editedPerson = data
  }

  closedPanel(): void{
    this.open = false;
  }

  editPersonData(ev){
    let id = this.localData.findIndex(x => x.id === ev.id);
    this.localData[id] = ev;
    this.setLocally('personList', this.localData);
  }
}
