import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable } from 'rxjs';

import { BookDetailsComponent } from './book-details.component';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';

const expectedBook = {
  isbn: '111',
  title: 'Book 1',
  authors: [],
  published: new Date(),
  rating: 4
};

@Component({ template: '<router-outlet></router-outlet>' })
class StubOutletComponent { }

class BookStoreServiceMock {
  getSingle(isbn: string): Observable<Book> {
    return of(isbn === expectedBook.isbn ? expectedBook : null);
  }
  remove(isbn: string): Observable<any> {
    return of();
  }
}

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StubOutletComponent,
        BookDetailsComponent
      ],
      providers: [
        {
          provide: BookStoreService,
          useClass: BookStoreServiceMock
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: { get: (key) => '111' }
            }
          }
        }
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: ':isbn', component: BookDetailsComponent }
        ])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should fetch a single book', () => {
    expect(component.book.isbn).toBe('111');
  });

  it('should convert rating number into an array', () => {
    const ratingEl = nativeEl.querySelectorAll('i.star');
    expect(ratingEl.length).toBe(4);
  });

  it('should remove a book and navigate back', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    fixture.nativeElement.querySelector('button').click();
    // TODO: check if remove book has been called and check routing
  });
});
