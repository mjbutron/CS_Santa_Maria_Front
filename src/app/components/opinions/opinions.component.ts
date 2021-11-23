import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as globalsConstants from 'src/app/common/globals';
// Services
import { DataApiService } from 'src/app/services/data-api.service';
// Interfaces
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
  // CSS classes
  classColumn: string;
  classCommentDefault: string;
  classComment: string;
  // Load
  isLoaded: boolean;
  // Commentary
  testContent = globalsConstants.K_BLANK;
  // Scroll to commentary
  @ViewChild(globalsConstants.K_OPINION_USER_COMMENT_STR, { static: false }) userComment: ElementRef;

  /**
   * constructor
   * @param dataApi  Data API Object
   */
  constructor(private dataApi: DataApiService) {
    this.classCommentDefault = globalsConstants.K_OPINION_COMMENT_BL_CLASS;
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.isLoaded = false;
    this.getAllOpinions()
  }

  /**
   * Get opinions information on the home page
   * @return List populated with opinions on the home page
   */
  getAllOpinions() {
    this.classColumn = globalsConstants.K_OPINION_COLUMN_CLASS;
    this.dataApi.getAllOpinions().subscribe((data) => {
      if (globalsConstants.K_COD_OK == data.cod) {
        if (0 < data.allOpinions.length) {
          for (let opnHome of data.allOpinions) {
            if (opnHome.home == 1) {
              this.opnInHome.push(opnHome);
            }
          }
        }
        if (3 < this.opnInHome.length) {
          this.partColumn = 12 / 3;
        }
        else {
          this.partColumn = 12 / this.opnInHome.length;
        }
        this.classColumn = "col-md-" + this.partColumn + " mb-md-0 mb-5";
        this.isLoaded = true;
      }
    });
  }

  /**
   * Show comentary
   * @param  name     User name
   * @param  content  Comentary text
   */
  openComment(name: string, content: string) {
    this.scrollToCommentary();
    this.classComment = this.classCommentDefault + globalsConstants.K_OPINION_FADEIN_CLASS;
    this.testContent = "<b>" + name + "</b> " + content;
  }

  /**
   * Hide comentary
   */
  onCloseComment() {
    this.classComment = this.classCommentDefault + globalsConstants.K_OPINION_FADEOUT_CLASS;
    setTimeout(() => {
      this.testContent = globalsConstants.K_BLANK;
    }, 1000);
  }

  /**
   * Scroll to comentary
   */
  scrollToCommentary() {
    this.userComment.nativeElement.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  /**
   * Create and display review stars
   * @param  index  Number of stars (Review)
   */
  counter(index: number) {
    let list = new Array();
    for (let i = 0; i < index; i++) {
      list.push(i);
    }
    return list;
  }
}
