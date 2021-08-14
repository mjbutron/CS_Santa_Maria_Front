import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

// HTTP code
export const K_COD_OK = 200;
export const K_COD_NOT_FOUND = 404;
export const K_COD_UNVLBL_SERVICE = 503;
// Constant numeric values
export const K_ZERO_RESULTS = 0;
export const K_NUM_RESULTS_PAGE = 5;
// Constant string values
export const K_BLANK = '';
export const K_ERROR_STR = 'Error';
export const K_ERROR_EXC_STR = '¡Error!';
export const K_INFO_STR = 'Información';
export const K_TOP_ELEMENT_STR = 'rtrSup';
export const K_OK_BUTTON_STR = 'Aceptar';
export const K_CANCEL_BUTTON_STR = 'Cancelar';
export const K_NO_DATE = '--/--/----';
export const K_FORMAT_DATE = 'yyyy-MM-dd';
export const K_LOCALE_EN = 'en';


// Colors
export const K_CONFIRM_BUTTON_COLOR = '#d33';
export const K_CANCEL_BUTTON_COLOR = '#0095A6';
export const K_SLIDER_TEXT_COLOR = '#ffffff';

@Injectable()
export class Globals {
  // URLs
  imgRootPath: string = environment.imageRootPath;
  pathBackEnd: string = environment.urlBackEnd;

}
