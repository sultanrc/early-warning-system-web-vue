import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import TableView from './views/TableView.vue'
import About from './views/About.vue'

const routes = [
  { path: '/', name: 'dashboard', component: Dashboard },
  { path: '/tableview', name: 'table', component: TableView },
  { path: '/about', name: 'about', component: About },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
