<template>
  <component :is="layout" />
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue'
import layouts from '@/layouts'
import { useRoute } from 'vue-router'

const route = useRoute()

const layout = computed(() => {
  if (route.meta.layout) {
    return route.meta.layout
  }
  return layouts.empty
})
</script>

<style>
#megarif {
  font-family:             Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing:  antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align:              center;
  color:                   #2C3E50;
  margin-top:              60px;
}
</style>
