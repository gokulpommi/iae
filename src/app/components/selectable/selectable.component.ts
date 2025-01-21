import { Component,OnInit, Input, Output, EventEmitter,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { IonicModule } from '@ionic/angular'; 

@Component({
  selector: 'app-selectable',
  templateUrl: './selectable.component.html',
  styleUrls: ['./selectable.component.scss'],
  standalone: true,
  imports: [IonicSelectableComponent,IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  
})
export class SelectableComponent  implements OnInit {

  @Input() presetValue: any;
  @Input() optionsJson: any;
  @Input() valueField: string = '';   
  @Input() displayField: string = '';
  @Input() fieldName: string = '';
  @Input() required: boolean = false;
  
  
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

   constructor() { }

  onChange(value: any,fieldName:any) {
    this.valueChange.emit(value); 
  }

 

  ngOnInit() {}

}
