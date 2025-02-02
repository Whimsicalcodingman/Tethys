import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; // Import Home.vue
import About from '../views/About.vue'; // Import About.vue
import Movies from '../views/Movies.vue'; // Import Movies.vue
import Login from '../views/Login.vue'; // Import Login.vue
import UserRegistration from '../views/UserRegistration.vue'; // Import UserRegistration.vue
import Movie from '../views/Movie.vue'; // Import Movie.vue (The movie detail page)

const routes = [
  {
    path: '/', // Define the root path
    name: 'Home',
    component: Home, // Route '/' to Home.vue
  },
  {
    path: '/about', // Define the about page
    name: 'About',
    component: About, // Route '/about' to About.vue
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies,
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: Movie,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: UserRegistration,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
