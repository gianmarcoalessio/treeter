import { createApp } from 'vue'
import globals from './globals.js';
import components from './components.js';
import { router } from './router.js';
import App from './App.vue'
import '@css/style.css'
var app = createApp(App)

app.use(globals);
app.use(components);
app.use(router);

app.mount('#app');

