<template>
  <v-tabs-window v-model="tabStore.tab">
    <v-tabs-window-item>
      <Encode /> 
    </v-tabs-window-item>
    <v-tabs-window-item>
      <Decode />
    </v-tabs-window-item>
  </v-tabs-window>
</template>

<script lang="ts" setup>
import { useTabStore } from '@/stores/tabStore'
import Encode from '@/components/Encode.vue'
import Decode from '@/components/Decode.vue'

const tabStore = useTabStore()
</script>
