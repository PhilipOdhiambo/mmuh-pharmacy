import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector) { }

// open a modal component with some data and return an observable of the result
open(component: any, data: any): Observable<any> {
// create a component reference from the component
const componentRef:ComponentRef<any> = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);

// attach the component to the appRef so that it's inside the ng component tree
this.appRef.attachView(componentRef.hostView);

// get a DOM element from the component
const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

// append the element to the body
document.body.appendChild(domElem);

// set the input data to the component
componentRef.instance.data = data;

// create a subject to emit the result
const result = new Subject<any>();

// subscribe to the output event of the component
componentRef.instance.result.subscribe((res:any) => {
// emit the result
result.next(res);

// destroy the component
this.destroy(componentRef);
});

// return the observable of the result
return result.asObservable();
}

// destroy the component
private destroy(componentRef: any) {
// detach the component from the appRef
this.appRef.detachView(componentRef.hostView);

// destroy the component
componentRef.destroy();
}
}
