import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {ActionEvent} from "../state/product.state";

@Injectable({providedIn:"root"})
export class EventDriverService{
  sourceEventSubject:Subject<ActionEvent>=new Subject<ActionEvent>();// source oü les evenements doivent etre publies. Et les composants vont juste souscrire ä cette source
  sourceEventSubjectObservable=this.sourceEventSubject.asObservable();//permet de souscrire ä un evenement dans  la source
  publishEvent(event: ActionEvent){// La methode publish permet de publier un evenement dans la source, l´evenement ici peut etre un Edit, Delete, Save, etc...
    this.sourceEventSubject.next(event);// next ca veut dire je publie un evenement event de type ActionEvent

  }


}
