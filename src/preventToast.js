import { toast } from 'react-toastify';

const displayedToasts = {};

export function Toast(message, options) {
  if (!displayedToasts[message]) {
    displayedToasts[message] = true;
    toast(message, options);
  }
}

setInterval(() => {
  Object.keys(displayedToasts).forEach((message) => {
    delete displayedToasts[message];
  });
}, 2000);
