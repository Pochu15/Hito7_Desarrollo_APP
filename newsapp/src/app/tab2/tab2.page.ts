import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NewsService } from '../../service/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
      categories: Array <any> = [];
      news
  
  constructor(public navCtrl: NavController, public service: NewsService){
    this.categories = [
      {name:'DEPORTE', img:'sports.jpg' },
      {name:'ECONOMÍA', img:'economy.jpg'},
      {name: 'TECNOLOGÍA', img:'technology.jpg'},
      {name: 'CIENCIA', img:'science.jpg'},
      {name:'SALUD', img: 'health.jpg'},
      {name: 'ENTRENAMIENTO', img:'entertainment.jpg'}
    ]
  }
  
  sliderConfig = {
   loop: true,
   initialSlide: 1,
   spaceBetween: 5,
   centeredSlides: true,
   slidesPerView: 2.3
  }

  //Funiones de la API
  ionViewDidLoad(){
    this.service.readNews()
    .subscribe(
      (data) => {this.news = data;
                console.log(data);},
      (error) => {console.log(error);}
    )
  }

  saveNew(noticia){
    alert("Aquí habría que guardar la noticia en el usuario actual. Todavía no se puede; necesitamos activar la autentificación")
  }
}