<template>
  <v-app class="bg-backround">
    <Header/>
    <v-main>
      <slot />
    </v-main>
    <div>
      <v-footer class="bg-primary d-flex align-center justify-center">
        <span class="white--text">&copy; 2025 — <strong>Ian Ramírez</strong></span>
      </v-footer>
    </div>
  </v-app>
</template>

<script lang="ts" setup>

</script>

<style>

</style>