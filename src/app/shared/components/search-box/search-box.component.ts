import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { debounceTime, pipe, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer = new Subject<string>();
  private debonceSuscribtion?:Subscription;
  @Input()
  public placeholder: string = ''
  @Input()
  public initialValue: string = ''
  @Output()
  public onValue = new EventEmitter<string>();
  @Output()
  public onDebounce = new EventEmitter<string>();

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>

  ngOnInit(): void {
    this.debonceSuscribtion = this.debouncer
    .pipe(
      debounceTime(1000)
    )
    .subscribe(value=>{
      this.onDebounce.emit(value)
    })
  }

  ngOnDestroy(): void {
    this.debonceSuscribtion?.unsubscribe();
  }

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.onValue.emit(newTag)
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm)
  }
}
