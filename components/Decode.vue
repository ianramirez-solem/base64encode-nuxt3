<template>
  <v-container>
    <v-card class="pa-5 bg-primary">
      <v-card-title>Decodificar Base64 a Imagen</v-card-title>
      <v-textarea
        label="Pega aquí el texto Base64" 
        v-model="base64Text" 
        rows="3"
        outlined
      ></v-textarea>
      <v-row class="justify-space-between pr-3 pl-3">
        <v-btn class="mt-2" color="success" @click="decodeBase64" :disabled="!base64Text.trim()">Decodificar</v-btn>

        <v-btn class="mt-2" color="success" v-if="images.length > 1" @click="deleteAll()">Eliminar todo</v-btn>
      </v-row>
      <v-row>
        <v-col  v-for="(image, index) in images" :key="index" cols="12" md="6" lg="4">
          <v-card class="pa-3 bg-secondary">
            <v-img class="mb-1" :src="image" height="200px" contain></v-img>
            <v-row class="pl-2 pr-2" align="center" justify="space-between">
              <v-col cols="auto">
                <v-tooltip location="bottom" text="Descargar">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      class="mb-1"
                      dark
                      v-bind="props"
                      @click="downloadImage(image)"
                    >
                      mdi-download
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
const base64Text = ref<string>("")
const decodedImage = ref<string | null>(null)
const images = ref<string[]>([])
const fileType = ref<string>("png")
const snackbar = ref({
  visible: false,
  message: '',
  color: 'success'
})

const decodeBase64 = () => {  
  let match: RegExpMatchArray | null = null
  let base64String = base64Text.value.trim()

  if (base64String.startsWith('data:image/')) {
    match = base64String.match(/^data:image\/([a-zA-Z]+);base64,/)
  }

  if (!match) {
    match = base64String.match(/^([A-Za-z0-9+/=]+)$/)
  }
  if (!match) {
    snackbar.value.visible = true
    snackbar.value.message = 'Formato Base64 no válido'
    snackbar.value.color = 'error'
    return
  }

  if (base64String.startsWith('data:image/')) {
    fileType.value = match[1]
    decodedImage.value = `data:image/${fileType.value};base64,${base64String.replace(/^data:image\/[a-zA-Z]+;base64,/, "")}`
  } else {
    fileType.value = "png" 
    decodedImage.value = `data:image/${fileType.value};base64,${base64String}`
  }
  images.value.push(decodedImage.value)
  base64Text.value = ''
}

const downloadImage = (image: string) => {
  if (!image) return

  const byteCharacters = atob(image.split(',')[1])
  const byteArrays = new Uint8Array(byteCharacters.length)

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays[i] = byteCharacters.charCodeAt(i)
  }
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "")

  const blob = new Blob([byteArrays], { type: `image/${fileType.value}` })

  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `image_${timestamp}.${fileType.value}`
  document.body.appendChild(link)
  link.click()
  
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  snackbar.value.visible = true
  snackbar.value.message = '¡Imagen descargada exitosamente!'
  snackbar.value.color = 'success'
}

const deleteSelection = (index: number) => {
  images.value.splice(index, 1)
  snackbar.value.visible = true
  snackbar.value.message = '¡Imagen eliminada!'
  snackbar.value.color = 'error'
}

const deleteAll = () => {
  images.value = []
  snackbar.value.visible = true
  snackbar.value.message = '¡Imagenes eliminadas!'
  snackbar.value.color = 'error'
}
</script>

<style scoped>
</style>