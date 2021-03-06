import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from "../app/auth/auth.service"
import { tap } from  'rxjs/operators';
const API = "http://localhost:3000/api"
var USER // Este campo representa el usuario actual.

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  currentArticle: {
    title:string,
    author:string,
    description:string,
    urlToImage:string,
  };

  constructor(public http: HttpClient, public auth : AuthService) { 
    console.log('News service ok');
    auth.getEmail().then((email) =>{
      http.get(`${API}/email/${email}`).subscribe(
        (data) => {
          USER = data
          USER = USER.user.userName
          console.log(USER)
        }
      )
    })
  }

  //Devolver noticias por categoría
  readCategory(category, page,country){
    return this.http.get(`http://localhost:3000/api/news/topheadlines?category=${category}&pageSize=5&page=${page}&country=${country}`);
  }
  //Devolver noticias por actualidad
  readNews(page,lang){
    return this.http.get(`http://localhost:3000/api/news/everything?lang=${lang}&pageSize=5&page=${page}`);
  }
  readNewsFilter(page,lang,sortBy,from,until){
    return this.http.get(`http://localhost:3000/api/news/everything?lang=${lang}&from=${from}&until=${until}&pageSize=5&page=${page}&sortBy=${sortBy}`);
  }
  readeverything(){
    return this.http.get(`${API}/news/everything`);
  }

  saveNew(noticia){
    console.log(USER)
    console.log(noticia)
    return this.http.put(`${API}/favNews/${USER}`, noticia)
  }

  //Obtiene los datos de un usuario dado su email
  getUser(user){
    return this.http.get(`${API}/email/${user}`)
  }

  deleteArt(index){
    return this.http.put(`${API}/favNews/${USER}/${index}`,{})
  }

  updateUser(updated, email){
    console.log(updated)
    return this.http.put(`${API}/userid/${email}`,{
      userName: updated.userName,
      firstName: updated.firstName,
      password: updated.password,
      lastName: updated.lastName,
      email: updated.email
    })
  }

  checkPassword(email, password){
    return this.http.post(`${API}/checkpwd`,{
      email: email,
      password: password
    })
  }

  deleteUser(username){
    return this.http.put(`${API}/user/deactivate/${username}`, {})
  }

  activateUser(username){}
    
  addCategoryView(cat:string, mail:string){
    console.log('Service: ' + mail + ':' + cat);
    this.http.post(`${API}/user/addCategory/`,{"email":mail, "category":cat}).subscribe(
      (val) => {
          console.log("POST call successful value returned in body", val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      },
    );
  }
  addKeyWordView(kw:string, mail:string){
    console.log('Service: ' + mail + ':' + kw);
    this.http.post(`${API}/user/addKeyWord/`,{"email":mail, "q":kw}).subscribe(
      (val) => {
          console.log("POST call successful value returned in body", val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      },
    );
  }

}