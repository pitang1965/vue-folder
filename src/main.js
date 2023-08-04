import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

import 'element-plus/dist/index.css';
import './style.css';

import naive from 'naive-ui';

const app = createApp(App);

library.add(faFolder);

app.use(router);
app.use(naive);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
