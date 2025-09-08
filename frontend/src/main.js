import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import DestinationCategory from './components/DestinationCategory.vue'
import PreferenceInput from './components/PreferenceInput.vue'
import AuthPage from './components/AuthPage.vue'
import Test from './components/test.vue'

import SearchChooser from './components/SearchChooser.vue'
import GuidedSearch from './components/GuidedSearch.vue'

const routes = [
  { path: '/auth', component: AuthPage },
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/destination', redirect: '/search' },
  { path: '/search', component: SearchChooser },
  { path: '/preference', component: PreferenceInput },
  { path: '/search/guided', component: GuidedSearch },
  { path: '/recommend', component: () => import('./components/RecommendResult.vue') },
  { path: '/bookmarks', component: () => import('./components/BookmarkList.vue') },
  { path: '/community', component: () => import('./components/Community.vue') },
  { path: '/management', component: () => import('./components/Management.vue') },
  { path: '/present', component: () => import('./components/PresentFestivals.vue') },
  { path: '/test', component: Test },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
