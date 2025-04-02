<template>
  <v-container>
    <v-card class="pa-5 bg-primary">
      <v-card-title>Convertir Imágenes a Base64</v-card-title>

      <v-file-input 
        label="Subir imágenes" 
        multiple 
        accept="image/*" 
        @change="handleFiles"
        show-size
        v-model="fileInput"
      ></v-file-input>
      <v-row class="justify-end pr-3">
        <v-btn color="success" v-if="base64Images.length > 1" @click="deleteAll()">Eliminar todo</v-btn>
      </v-row>
      <v-row>
        <v-col v-for="(image, index) in base64Images" :key="index" cols="12" md="6" lg="4">
          <v-card class="pa-3 bg-secondary">
            <v-img class="mb-1" :src="image.preview" height="200px" contain></v-img>
            <v-row class="pl-2 pr-2" align="center" justify="space-between">
              <v-col cols="auto">
                <v-tooltip location="bottom" text="Copiar">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      class="mb-1"
                      dark
                      v-bind="props"
                      @click="copyToClipboard(image.base64)"
                    >
                      mdi-content-copy
                    </v-icon>
                  </template>   
                </v-tooltip>
              </v-col>

              <v-col cols="auto">
                <v-tooltip location="bottom" text="Eliminar">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      class="mb-1"
                      dark 
                      v-bind="props" 
                      @click="deleteSelection(index)"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-card-text class="base64-text">
              <p>{{ image.base64 }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-snackbar v-model="snackbar.visible" :color="snackbar.color" top>
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script lang="ts" setup>

const fileInput = ref<File[]>([])
const snackbar = ref({
  visible: false,
  message: '',
  color: 'success'
})

interface Base64Image {
  preview: string;
  base64: string;
}

const base64Images = ref<Base64Image[]>([])

const handleFiles = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files || !files.length) return

  for (const file of files) {
    const base64String = await convertToBase64(file)
    const base64Data = base64String.split('base64,')[1]
    base64Images.value.push({
        preview: base64String,
        base64: base64Data,
      })
  }

  if (fileInput.value) {
    setTimeout(() => {
      fileInput.value = []
    }, 2000)
  }
}

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  snackbar.value.visible = true
  snackbar.value.message = 'Base64 copiado al portapapeles'
  snackbar.value.color = 'success'

}

const deleteSelection = (index: number) => {
  base64Images.value.splice(index, 1)
  snackbar.value.visible = true
  snackbar.value.message = '¡Imagen eliminada!'
  snackbar.value.color = 'error'
}

const deleteAll = () => {
  base64Images.value = []
  snackbar.value.visible = true
  snackbar.value.message = '¡Imagenes eliminadas!'
  snackbar.value.color = 'error'
}
</script>

<style scoped>
.base64-text {
  max-height: 100px;  /* Máximo de altura antes de que aparezca el scroll */
  overflow-y: auto;   /* Scroll solo en la dirección vertical */
  overflow-x: hidden; /* Evita el scroll horizontal */
  padding: 10px;
  white-space: pre-wrap;  /* Asegura que el texto se ajuste a la caja */
  word-break: break-word; /* Permite que el texto se corte adecuadamente */
}
</style>
