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
//// Brands
export const K_BRANDS_IMG_VECTOR = [
  { img: "../../assets/img/asisa.png" },
  { img: "../../assets/img/allianz.png" },
  { img: "../../assets/img/adeslas.png" },
  { img: "../../assets/img/zurich.png" },
  { img: "../../assets/img/reale.png" },
  { img: "../../assets/img/aegon.png" },
  { img: "../../assets/img/liberty.png" },
  { img: "../../assets/img/mapfre.png" },
  { img: "../../assets/img/sanitas.png" }
];
export const K_BRANDS_CAROUSEL_CONFIG = {
  "slidesToShow": 2,
  "slidesToScroll": 1,
  "centerMode": true,
  "autoplay": true,
  "autoplaySpeed": 3000,
  "arrows": false,
  "dots": true,
  "infinite": true,
  "pauseOnHover": false,
  "variableWidth": true,
  "responsive": [{
    "breakpoint": 768,
    "settings": {
      "slidesToShow": 1,
      "slidesToScroll": 1
    }
  }, {
    "breakpoint": 520,
    "settings": {
      "slidesToShow": 1,
      "slidesToScroll": 1
    }
  }]
};
//// Contact
export const K_CONTACT_SECTION_TITLE = 'Datos de contacto';
export const K_CONTACT_REQUEST_SECTION_TITLE = 'Envianos tu solicitud';
export const K_CONTACT_ADDRESS_STR = 'Dirección';
export const K_CONTACT_EMAILS_STR = 'Emails';
export const K_CONTACT_APPO_STR = 'Teléfono de cita previa';
export const K_CONTACT_MWIVES_STR = 'Teléfono matrona';
export const K_CONTACT_PHYSIO_STR = 'Teléfono fisioterapia';
export const K_CONTACT_NAME_STR = 'Nombre *';
export const K_CONTACT_NAME_REQUIRED_STR = 'El nombre es obligatorio';
export const K_CONTACT_SURNAME_STR = 'Apellidos *';
export const K_CONTACT_SURNAME_REQUIRED_STR = 'Los apellidos son obligatorios';
export const K_CONTACT_EMAIL_STR = 'Email *';
export const K_CONTACT_EMAIL_REQUIRED_STR = 'El email es obligatorio';
export const K_CONTACT_EMAIL_VALID_STR = 'El email no es valido';
export const K_CONTACT_SUBJECT_STR = 'Asunto *';
export const K_CONTACT_SUBJECT_INFO_STR = 'Información';
export const K_CONTACT_SUBJECT_APPO_STR = 'Cita Previa';
export const K_CONTACT_SUBJECT_INSC_STR = 'Inscripción Taller/Curso';
export const K_CONTACT_SUBJECT_REQUIRED_STR = 'El asunto es obligatorio';
export const K_CONTACT_MESSAGE_STR = 'Mensaje *';
export const K_CONTACT_MESSAGE_REQUIRED_STR = 'El mensaje es obligatorio';
export const K_CONTACT_READ_POLICY_STR = 'He leído y acepto ';
export const K_CONTACT_PRIVACY_POLICY_STR = 'política de privacidad';
export const K_CONTACT_ACCEPT_PP_STR = 'Debe aceptar la política de privacidad';
export const K_CONTACT_SEND_REQUEST_STR = 'Enviar solicitud';
export const K_CONTACT_SUCCESS_REQUEST_STR = '¡Solicitud enviada!';
export const K_CONTACT_RESP_REQUEST_STR = 'Responderemos a su solicitud lo antes posible.';
export const K_CONTACT_ERROR_REQUEST_STR = 'No se ha podido enviar su solicitud. Por favor, intentelo de nuevo mas tarde.';

// End web sections

@Injectable()
export class Globals {
  // URLs
  imgRootPath: string = environment.imageRootPath;
  pathBackEnd: string = environment.urlBackEnd;
}
