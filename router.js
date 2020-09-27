import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('~/pages/index.vue').then((m) => m.default || m)
const Project = () =>
  import('~/pages/projects/_id.vue').then((m) => m.default || m)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Home,
      },
      {
        path: '/projects/:id?',
        component: Project,
        alias: ['/projetos'],
      },
    ],
  })
}
