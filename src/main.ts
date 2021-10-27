import { createApp } from 'vue';
import App from './App.vue';
import { translator } from './i18n';

const app = createApp(App)
   .use(translator)
   .mount('#app');
