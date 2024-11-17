/**
 * First, we will load this project's JavaScript dependencies.
 * This includes Vue and other libraries for building robust web applications.
 */

import { createApp } from 'vue'; // Import Vue 3 createApp function
import Axios from 'axios'; // Import Axios for HTTP requests

// Import BootstrapVue3 and necessary CSS files
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Initialize the Vue app
const app = createApp({});

// Set Axios globally in the app
app.config.globalProperties.$http = Axios;

// Use BootstrapVue3 for Vue 3 components and styles
app.use(BootstrapVue3);

/**
 * Register global components.
 * You can register more components here if needed.
 */
import ExampleComponent from './components/ExampleComponent.vue';
app.component('example-component', ExampleComponent);

/**
 * Alternatively, you can automatically register Vue components by scanning
 * the components directory. Uncomment and modify the following code as needed:
 */
// Object.entries(import.meta.glob('./**/*.vue', { eager: true })).forEach(([path, definition]) => {
//     app.component(path.split('/').pop().replace(/\.\w+$/, ''), definition.default);
// });

/**
 * Finally, mount the Vue app to the HTML element with id "app".
 */
app.mount('#app');
