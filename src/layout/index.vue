<template>
  <div class="xxxx">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <transition-group name="sidebar">
          <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
        </transition-group>
      </el-menu>
    </el-scrollbar>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import SidebarItem from './sidebarItem'

export default {
  name: 'sidebar',
  components: {
    SidebarItem
  },
  props: {},
  data () {
    return {
      // variables: {
      //   menuBg: '#304156',
      //   menuText: '#bfcbd9',
      //   menuActiveText: '#409EFF',
      // }
    }
  },
  computed: {
    variables () {
      return variables
    },
    ...mapGetters(['permission_routes', 'sidebar']),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  created () {},
  mounted () {},
  methods: {},
  beforeDestroy () {}
};
</script>

<style lang="scss">
.xxxx{
  width: 200px;
  height: 500px;
}
.horizontal-collapse-transition {
  transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
}

.scrollbar-wrapper {
  overflow-x: hidden !important;
}

.el-scrollbar__bar.is-vertical {
  right: 0px;
}

.el-scrollbar {
  height: 100%;
}
</style>
