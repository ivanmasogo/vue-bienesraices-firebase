<script setup>
  import { useForm, useField } from 'vee-validate'
  import { collection,addDoc } from 'firebase/firestore'
  import { useFirestore } from 'vuefire'
  import { useRouter } from 'vue-router'
  import { validationSchema,imageSchema } from '@/validation/propiedadSchema'
  import useImage from '@/composables/useImage'
  import useLocationMap from '@/composables/useLocationMap'
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

  const items=[1,2,3,4,5]

  const { url,uploadImage,image } = useImage()
  const { zoom,center,pin } = useLocationMap()

  const router = useRouter()
  const db = useFirestore() 

  const { handleSubmit } = useForm({
    validationSchema : {
      ...validationSchema,
      ...imageSchema
    }
  })
  
  const titulo = useField('titulo')
  const imagen = useField('imagen')
  const precio = useField('precio')
  const habitaciones = useField('habitaciones')
  const wc = useField('wc')
  const estacionamiento = useField('estacionamiento')
  const descripcion = useField('descripcion')
  const piscina = useField('piscina', null, {
    initialValue : false
  })

  const submit = handleSubmit(async (values) => {

    const { imagen, ...propiedad } = values

    const docRef = await addDoc(collection(db, "propiedades"), {
      ...propiedad,
      imagen: url.value,
      ubicacion: center.value
    });

    if(docRef.id) {
      router.push({name: 'admin-propiedades'})
    }
  })
  
  
</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title
      class="text-h4 font-weight-bold"
      tag="h3"
    >
      Nueva Propiedad
    </v-card-title>
    <v-card-subtitle
      class="text-h5 py-5"
    >
      Crea una nueva propiedad llenando el siguiente formulario
    </v-card-subtitle>

    <v-form class="mt-10">
      <v-text-field
        class="mb-2"
        label="Titulo Propiedad"
        v-model="titulo.value.value"
        :error-messages="titulo.errorMessage.value"
      />
      <v-file-input
        accept="image/jpeg"
        label="Imagen Propiedad"
        prepend-icon="mdi-camera"
        class="mb-2"
        v-model="imagen.value.value"
        :error-messages="imagen.errorMessage.value"
        @change="uploadImage"
      />

      <div
        v-if="image"
        class="my-5"
      >
        <p class="font-weight-bold">Imagen Propiedad:</p>
        <img class="w-50" :src="image"/>
      </div>

      <v-text-field
        class="mb-5"
        label="Precio"
        v-model="precio.value.value"
        :error-messages="precio.errorMessage.value"
      />
      <v-row>
        <v-col
          col="12"
          md="4"
        >
          <v-select
            label="Habitaciones"
            class="mb-2"
            :items="items"
            v-model="habitaciones.value.value"
            :error-messages="habitaciones.errorMessage.value"
          />
        </v-col>
        <v-col
            col="12"
            md="4"
        >
          <v-select
            label="WC"
            class="mb-2"
            :items="items"
            v-model="wc.value.value"
            :error-messages="wc.errorMessage.value"
          />
        </v-col>
        <v-col
            col="12"
            md="4"
        >
          <v-select
            label="Lugares Estacionamiento"
            class="mb-2"
            :items="items"
            v-model="estacionamiento.value.value"
            :error-messages="estacionamiento.errorMessage.value"
          />
        </v-col>
      </v-row>
      <v-textarea
          class="mb-2"
          label="Descripción"
          v-model="descripcion.value.value"
          :error-messages="descripcion.errorMessage.value"
      ></v-textarea>
      <v-checkbox 
        label="Piscina"
        v-model="piscina.value.value"
        :error-messages="piscina.errorMessage.value"
      />
      <h2 class="font-weight-bold text-center my-5"> Ubicación</h2>
      <div class="pb-10">
        <div style="height:600px">
          <LMap 
            v-model:zoom="zoom" 
            :center="center" 
            :use-global-leaflet="false"
          >
          <LMarker
            :lat-lng="center"
            draggable
            @moveend="pin"
          />
          <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ></LTileLayer>
          </LMap>
        </div>
      </div>

      <v-btn
        color="pink-accent-3"
        block
        @click="submit"
      >
        Agregar Propiedad
      </v-btn>

    </v-form>
  </v-card>
</template>
