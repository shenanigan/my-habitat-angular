import { OnInit, AfterViewInit, ViewChild, ElementRef, Directive } from '@angular/core';
import { fromEvent, BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { TypedAction } from '@ngrx/store/src/models';
import { Store } from '@ngrx/store';
import { IListRequest } from '../contract/list-request';
import { getSocieties } from 'src/app/society/+state/society.actions';

@Directive()
export abstract class TableComponent<T> implements AfterViewInit, OnInit, DataSource<T> {


    @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort?: MatSort;
    @ViewChild('input', { static: true }) input?: ElementRef;

    public countSubject = new BehaviorSubject<number>(0);
    protected dataSubject = new BehaviorSubject<T[]>([]);
    protected loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.dataSubject;
    }


    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
    }

    abstract getDataAction(listRequest: IListRequest): TypedAction<string>;
    abstract getCountSelector(): (state: object) => number;
    abstract getDataSelector(): (state: object) => T[];

    constructor(protected _store: Store) { }

    ngOnInit(): void {
        this._store.dispatch(getSocieties({ request: this.getListRequest() }))

        this._store.select(this.getCountSelector()).subscribe((res) => {
            this.countSubject.next(res);
        });
        this._store.select(this.getDataSelector()).subscribe((res) => {
            this.loadingSubject.next(false);
            this.dataSubject.next(res);
        });
    }

    ngAfterViewInit(): void {
        fromEvent(this.input?.nativeElement, 'keyup')
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                tap(() => {
                    if (this.paginator) {
                        this.paginator.pageIndex = 0;
                    }
                    this.loadRequests()
                })
            )
            .subscribe();

        this.sort?.sortChange.subscribe(() => {
            if (this.paginator) {
                this.paginator.pageIndex = 0
            }
        });

        this.sort?.sortChange.pipe(
            tap(() => this.loadRequests())
        );

        this.paginator?.page.pipe(
            tap(() => this.loadRequests())
        )
    }


    protected getListRequest(): IListRequest {
        let pageSize = this.paginator?.pageSize ? this.paginator.pageSize : 10;
        return {
            skip: this.paginator?.pageIndex ?? 0 * pageSize,
            take: pageSize,
            filter: this.input?.nativeElement.value,
            orderBy: this.sort?.active,
            orderByDescending: this.sort?.direction === 'desc'
        };
    }

    protected loadRequests() {
        this.loadingSubject.next(true);
        this._store.dispatch(this.getDataAction(this.getListRequest()))
    }
}
