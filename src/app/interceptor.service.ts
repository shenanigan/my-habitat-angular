import { 
    HttpEvent,
    HttpHandler, 
    HttpInterceptor, 
    HttpRequest, 
    HttpResponse 
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoaderService } from "./loader.service";

@Injectable({
    providedIn:'root'
})

export class InterceptorService implements HttpInterceptor{
    private requests:HttpRequest<any>[]=[];

    constructor(
        public loaderService:LoaderService
    ){}

    removeRequest(req:HttpRequest<any>){
        const i=this.requests.indexOf(req);
        if(i>=0){
            this.requests.splice(i,1);
        }
        this.loaderService.isLoading.next(this.requests.length>0);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        this.requests.push(req);
        this.loaderService.isLoading.next(true);
        
        return new Observable(
            (observer:{
                next:(arg:HttpResponse<any>)=>void;
                error:(arg:any)=>void;
                complete:()=>void;
            })=>{
                const subscription=next.handle(req).subscribe(
                    (event)=>{
                        if(event instanceof HttpResponse){
                            this.removeRequest(req);
                            observer.next(event);
                        }
                    },
                    (err)=>{
                        this.removeRequest(req);
                        observer.error(err);
                    },
                    ()=>{
                        this.removeRequest(req);
                        observer.complete();
                    }
                );
                return()=>{
                    this.removeRequest(req);
                    subscription.unsubscribe();
                };
            }
        );
    }
}