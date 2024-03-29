import { SafePipe } from './safe.pipe';
import { inject, TestBed } from '@angular/core/testing';
import { Observable, throwError  } from 'rxjs';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

describe('SafePipe', () => {

  it('Create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SafePipe(domSanitizer);
    expect(pipe).toBeTruthy();
  }));

  it('Returns a SafeHTML for html type.', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SafePipe(domSanitizer);
    const res = pipe.transform('Test', 'html');
    expect(res).toBeTruthy();
  }));

  it('Returns a SafeStyle for style type.', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SafePipe(domSanitizer);
    const res = pipe.transform('Test', 'style');
    expect(res).toBeTruthy();
  }));

  it('Returns a SafeUrl for url type.', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SafePipe(domSanitizer);
    const res = pipe.transform('Test', 'url');
    expect(res).toBeTruthy();
  }));

  it('Returns a SafeResourceUrl for resourceUrl type.', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SafePipe(domSanitizer);
    const res = pipe.transform('Test', 'resourceUrl');
    expect(res).toBeTruthy();
  }));
});
