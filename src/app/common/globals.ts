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
export const K_NO_DATE_STR = '0000-00-00';
export const K_LOADING_STR = 'Cargando...';
// Colors
export const K_CONFIRM_BUTTON_COLOR = '#d33';
export const K_CANCEL_BUTTON_COLOR = '#0095A6';
export const K_SLIDER_TEXT_COLOR = '#ffffff';
// Webs Sections
//// About Us
export const K_ABOUT_US_SECTION_TITLE = 'Nuestro equipo';
export const K_ABOUT_US_HISTORY_ONE = 'Tras varios años de formación fuera de España* volvemos a casa y, como matronas, queremos aportar nuestro granito de arena compartiendo todo lo aprendido para ofrecer una visión más global de la maternidad.';
export const K_ABOUT_US_HISTORY_TWO = 'Nuestro principal objetivo es empoderar a las mujeres preparándolas de forma integral y realista frente al embarazo, parto, puerperio, lactancia y crianza, facilitando la toma de decisiones desde la más actualizada evidencia científica sin perder el lado humano.';
export const K_ABOUT_US_HISTORY_THREE = 'Actualmente compaginamos nuestra actividad laboral entre el sector público y privado.';
export const K_ABOUT_US_HISTORY_FOUR = '* María Terry se formó en Londres (Inglaterra) y Laura Feria en Florencia (Italia).';
// End web sectios

@Injectable()
export class Globals {
  // URLs
  imgRootPath: string = environment.imageRootPath;
  pathBackEnd: string = environment.urlBackEnd;
}
