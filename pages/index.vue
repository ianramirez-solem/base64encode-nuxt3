<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title>Convertir Imágenes a Base64</v-card-title>

      <v-file-input 
        label="Subir imágenes" 
        multiple 
        accept="image/*" 
        @change="handleFiles"
        show-size
      ></v-file-input>

      <v-row>
        <v-col v-for="(image, index) in base64Images" :key="index" cols="12" md="6" lg="4">
          <v-card class="pa-3">
            <v-img class="mb-1" :src="image.preview" height="200px" contain></v-img>
            <v-tooltip location="bottom" text="Copiar">
              <template v-slot:activator="{ props }">
                <v-icon
                class="mb-1"
                color="primary"
                dark
                v-bind="props"
                @click="copyToClipboard(image.base64)"
                >
                mdi-content-copy
                </v-icon>
              </template>   
            </v-tooltip>
            <v-card-text class="base64-text">
              <p>{{ image.base64 }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-snackbar v-model="snackbar" :timeout="3000" color="success" top>
      Base64 copiado al portapapeles
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from "vue"
const snackbar = ref(false)

const base64Images = ref([])


const handleFiles = async (event) => {
  const files = event.target.files
  if (!files.length) return

  for (const file of files) {
    const base64String = await convertToBase64(file)
    const base64Data = base64String.split('base64,')[1]
    base64Images.value.push({
        preview: base64String,
        base64: base64Data,
      })
  }
}

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    snackbar.value = true
  })
}
</script>

<style scoped>
.base64-text {
  max-height: 100px;  /* Máximo de altura antes de que aparezca el scroll */
  overflow-y: auto;   /* Scroll solo en la dirección vertical */
  overflow-x: hidden; /* Evita el scroll horizontal */
  background: #f4f4f4;
  padding: 10px;
  white-space: pre-wrap;  /* Asegura que el texto se ajuste a la caja */
  word-break: break-word; /* Permite que el texto se corte adecuadamente */
}
</style>
