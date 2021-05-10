import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})/*Component declarator this ia*/
export class AppComponent {
  title = 'USC Films';


  ngOnInit(): void {
    if(localStorage.getItem('ls')==null){
      localStorage.setItem('ls',JSON.stringify({}));
    }
  }
}
