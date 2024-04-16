import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appTamano20]'
})
export class Tamano20Directive implements OnInit{

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.style.fontSize = '20px';
  }
}
