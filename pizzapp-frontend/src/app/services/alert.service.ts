import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  /**
   * Display a custom sweet alert dialog.
   * @param options sweet alert options
   */
  show(options: SweetAlertOptions) {
    return Swal.fire(options);
  }

  /**
   * Display a success sweet alert dialog.
   * @param text message.
   */
  success(text: string) {
    this.show({title: 'Completado!', text, icon: 'success'});
  }

  /**
   * Display an error sweet alert dialog.
   * @param text message.
   */
  error(text: string) {
    this.show({title: 'Error', text, icon: 'error'});
  }

  /**
   * Show a pre confirmation modal and then excecute a promise, wait until resolve.
   * 
   * @param title text of title.
   * @param text content of modal.
   * @param callback action to excecute.
   * @param success optional callback on success.
   * @param fail optional callback on fail.
   */
  preConfirmLoading(title: string, text: string, callback, success?: Function, fail?: Function) {
    this.show({
      title, 
      text,
      icon: 'warning',
      showCancelButton: true, 
      showLoaderOnConfirm: true,
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#00C853',
      cancelButtonColor: '#e63010',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async (result) => {
        if(result) {
          return callback().then((result) => {
            if(success) return success();
            return this.success(result);
          }).catch(error => {
            if(fail) return fail();
            return this.error(error || 'Ha ocurrido un problema :(');
          })
        } else console.log('picha')
      }
    })
  }

  showLoading() {
    Swal.fire({
      title: 'Cargando',
    })
    Swal.showLoading();
  }

  hideLoading(title?: string) {
    Swal.fire({
      title: title || 'Completado!',
      confirmButtonText: 'Aceptar'
    })
    Swal.hideLoading();
  }
}