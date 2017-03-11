import {ToastOptions} from 'ng2-toastr/ng2-toastr';

export class CustomOption extends ToastOptions {
  animate = 'flyRight'; // you can override any options available
  positionClass = 'toast-top-center';
  toastLife = 3000;
  newestOnTop = true;
  showCloseButton = false;
}
