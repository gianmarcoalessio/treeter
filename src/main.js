import { createApp } from 'vue'
import globals from './globals.js';
import App from './App.vue'
import '@css/style.css'
var app = createApp(App)

app.use(globals);

app.mount('#app');

