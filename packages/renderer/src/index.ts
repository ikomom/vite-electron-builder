import {createApp} from 'vue';
import App from '@/App.vue';

import {createVuetify} from 'vuetify';
import router from '@/router';

createApp(App).use(router).use(createVuetify()).mount('#app');
