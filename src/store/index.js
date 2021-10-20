import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    global: {
    },
    permission_routes: [
      {
        path: '/permission',
        redirect: '/permission/page',
        alwaysShow: true, // will always show the root menu
        name: 'Permission',
        meta: {
          title: 'Permission',
          icon: 'lock',
          roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [
          {
            path: 'page',
            component: () => import('@/views/About'),
            name: 'PagePermission',
            meta: {
              title: 'Page Permission',
              roles: ['admin'] // or you can only set roles in sub nav
            }
          },
          {
            path: 'directive',
            component: () => import('@/views/Drop'),
            name: 'DirectivePermission',
            meta: {
              title: 'Directive Permission'
              // if do not set roles, means: this page does not require permission
            }
          },
          {
            path: 'role',
            component: () => import('@/views/Home'),
            name: 'RolePermission',
            meta: {
              title: 'Role Permission',
              roles: ['admin']
            }
          }
        ]
      },
    ],
    sidebar: {
      opened: false
    }
  },
  getters: {
    permission_routes: state => state.permission_routes,
    sidebar: state => state.sidebar,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
