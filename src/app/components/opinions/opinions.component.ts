import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as globalsConstants from 'src/app/common/globals';

import { DataApiService } from 'src/app/services/data-api.service';

import { OpinionInterface } from 'src/app/models/opinion-interface';

@Component({
  selector: 'app-opinions',
  templateUrl: './opinions.component.html',
  styleUrls: ['./opinions.component.css']
})
export class OpinionsComponent implements OnInit {
  // Path
  path = environment.imageRootPath;
  // Opinions
  opnInHome: OpinionInterface[] = [];
  partColumn: number;
  classColumn: string;
  classCommentDefault: string;
  classComment: string;
  // Load
  isLoaded: boolean;
  // Commentary
  testContent = "";
  // Scroll to commentary
  @ViewChild("userComment", { static: false }) userComment: ElementRef;

  constructor(private dataApi: DataApiService) {
    this.classCommentDefault = "row mt-3 testimonial-comment-bl animated ";
  }

  ngOnInit() {
    this.isLoaded = false;
    this.getAllOpinions()
  }

  getAllOpinions() {
    this.classColumn = "col-md-6 mb-md-0 mb-5"
    this.dataApi.getAllOpinions().subscribe((data) => {
      if (globalsConstants.K_COD_OK == data.cod){
        if(0 < data.allOpinions.length){
          for(let opnHome of data.allOpinions){
            if(opnHome.home == 1){
              this.opnInHome.push(opnHome);
            }
          }
        }
        if(3 < this.opnInHome.length){
          this.partColumn = 12 / 3;
        }
        else{
          this.partColumn = 12 / this.opnInHome.length;
        }
        this.classColumn = "col-md-" + this.partColumn + " mb-md-0 mb-5";
        this.isLoaded = true;
      }
    });
  }

  openComment(name: string, content: string) {
    this.scrollToCommentary();
    this.classComment = this.classCommentDefault + "fadeInUp";
    this.testContent = name + ": " + content;
  }
  onCloseComment() {
    this.classComment = this.classCommentDefault + "fadeOutDown";
    setTimeout (() => {
         this.testContent = "";
      }, 1000);
  }

  scrollToCommentary() {
      this.userComment.nativeElement.scrollIntoView({block: "center", behavior: "smooth"});
  }

  counter(index: number) {
    let list = new Array();
    for(let i=0; i<index; i++){
      list.push(i);
    }
    return list;
  }

}
