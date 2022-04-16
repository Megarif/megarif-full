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
import useLang from '@/store/useLang'

const lang = useLang()
lang.init()
const route = useRoute()

const layout = computed(() => {
  if (route.meta.layout) {
    return route.meta.layout
  }
  return layouts.empty
})


</script>

<style lang="scss">
@import '@/styles/main';
</style>
