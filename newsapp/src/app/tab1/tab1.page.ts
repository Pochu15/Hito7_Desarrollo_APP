import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NewsService } from '../../service/news.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalFiltersPage } from '../modal-filters/modal-filters.page';
import { ModalController } from '@ionic/angular';
var moment = require('moment');

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  categories: Array<any> = [];

  constructor(public navCtrl: NavController, public service: NewsService, private router: Router, public modalController: ModalController) {
    
  }


  //Funiones de la API
  news
  articles
  page = 1;
  lang
  sortBy
  from
  until
  gotnews

  ngOnInit() {
    this.gotnews = false
    this.service.readNews(this.page).subscribe(
      (data) => {
        this.news = data;
        this.articles = this.news.response.articles
        console.log(data);
        this.gotnews = true
      })
  }

  async openModal() {
    this.gotnews = false
    const modal = await this.modalController.create({
      component: ModalFiltersPage,
      componentProps: {
        "lang":this.lang,
        "sortBy":this.sortBy,
        "fromDate":this.from,
        "untilDate":this.until
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log(dataReturned);
        this.lang = dataReturned.data.lang
        this.sortBy = dataReturned.data.sortBy
        this.from = dataReturned.data.fromDate
        this.until = dataReturned.data.untilDate
        this.loadArticlesFilter()
      }
    });

    return await modal.present();
  }

  fecha(fechaISO){
    return moment(fechaISO).format('DD/MM/YYYY')
  }

  //Mostrar noticia en otra tab 
  goToArticle(article) {
    this.service.currentArticle = article;
    this.router.navigate(['/article']);
  }

  //Cargar más noticiad Infinite Scroll
  loadArticles(event) {
    console.log(event);

    this.page++;
    this.service.readNewsFilter(this.page, this.lang, this.sortBy, this.until, this.from)
      .subscribe(
        (data) => {
          console.log(data);
          this.news = data;
          this.articles = this.news.response.articles
          for (let i = 0; i < 5; i++) {
            this.articles.push(this.articles[i]);
          } event.target.complete();
        })
  }


  loadArticlesFilter() {
    this.page=1;
    this.service.readNewsFilter(this.page, this.lang, this.sortBy, this.until, this.from)
      .subscribe(
        (data) => {
          this.news = data;
          this.articles = this.news.response.articles
          console.log(data);
          this.gotnews = true
        })
  }
}

