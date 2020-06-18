import { confirm } from '@nativescript/core/ui/dialogs';

export function confirmDialog(msg: string) {
  return confirm({
    message: msg,
    okButtonText: 'Ja',
    cancelButtonText: 'Nein'
  });
}
