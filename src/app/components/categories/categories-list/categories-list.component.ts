import { AfterViewInit, Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ICategory } from '../../../interfaces';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent {
  @Input() title: string  = '';
  @Input() categories: ICategory[] = [];
  @Output() callModalAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();
  @Output() callDeleteAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();
 @Input() buttonVisibility: string = '';
 constructor() {
  let userString = localStorage.getItem('auth_user');
  if(userString){
    let user = JSON.parse(userString);
    if(user.role.name == 'ADMIN' || user.role.name == 'SUPER_ADMIN'){
      this.buttonVisibility = 'display-true';
    }else this.buttonVisibility = 'display-none';
    console.log(user.role.name);
  }else{
    console.log('nanai');
    this.buttonVisibility = 'display-none';
  }
  
}

}


