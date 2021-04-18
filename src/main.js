import { createApp } from 'vue';
import VueClipboard from 'vue3-clipboard';
import App from './App.vue';

var app = createApp(App);
app.mount('#app');
app.use(VueClipboard);

import '@popperjs/core/dist/cjs/popper';
import 'bootstrap/dist/js/bootstrap';