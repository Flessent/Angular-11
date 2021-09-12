import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({providedIn: "root"})//providedIn:root= rend le service disponible dans toute l´app
export class ProductsServices{
//importation de HttpClientModule pour pouvoir utiliser le service: communication entre le service et les components

  constructor(private http: HttpClient) {  }//Injection de HttpClient: Injection des dependances

  getAllProducts(): Observable<Product[]>{ //retourne un tableau de type Product (voir model)
    let host= (Math.random()>0.2)?environment.host:environment.unrechargeableHost;// Ici on donne les probalites a l´app de tomber sur joignable ou pas
    //si les chances sont <20% on tombe sur injoignable en cas de pb reseau par exemple
    return this.http.get<Product[]>(host+"/products");
  }


  getSelectedProducts(): Observable<Product[]>{ //retourne un tableau de type Product (voir model)
  let host= (Math.random()>0.2)?environment.host:environment.unrechargeableHost;
    return this.http.get<Product[]>(host+"/products?selected=true");
  }

  getAvailableProducts(): Observable<Product[]>{ //retourne un tableau de type Product (voir model)
    let host= (Math.random()>0.2)?environment.host:environment.unrechargeableHost;
    return this.http.get<Product[]>(host+"/products?available=true");
  }

  searchProducts(keyword: string ): Observable<Product[]>{
    let host=environment.host;
    return  this.http.get<Product[]>(host+"/products?name_like="+keyword);

  }
  select(product: Product ): Observable<Product>{
    let host=environment.host;
    product.selected=!product.selected;
    return  this.http.put<Product>(host+"/products/"+product.id,product);

  }
  deleteProduct(product: Product ): Observable<void>{
    let host=environment.host;
    product.selected=!product.selected;
    return  this.http.delete<void>(host+"/products/"+product.id);

  }

  save(product: Product ): Observable<Product>{
    let host=environment.host;
    return  this.http.post<Product>(host+"/products",product);

  }
edit(product:Product) : Observable<Product>{
    let host=environment.host;
    return this.select(product) && this.save(product);


  }

  getProducts(id:number): Observable<Product>{ //retourne le Id  d´un Product (pour la methode edit)
    let host= environment.host;
    return this.http.get<Product>(host+"/products/"+id);
  }

  updateProducts(product:Product): Observable<Product>{ //retourne le Id  d´un Product (pour la methode edit)
    let host= environment.host;
    return this.http.put<Product>(host+"/products/"+product.id,product);
  }








}
