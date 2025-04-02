<template>
  <v-app-bar class="bg-primary" density="compact">
    <v-container>
      <v-row>
        <v-col class="col-4 ma-auto">
          <v-typography variant="h1" class="d-none d-md-flex">
            Base64ify
          </v-typography>
        </v-col>
        <v-col class="col-4">
          <v-tabs v-model="tabStore.tab" grow>
            <v-tab>ENCODE</v-tab>
            <v-tab>DECODE</v-tab>
            <!-- <v-tab to="/info">Info</v-tab> -->
          </v-tabs>
        </v-col>
        <v-col class="col-4"></v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useTabStore } from '@/stores/tabStore'
const tabStore = useTabStore()
</script>
