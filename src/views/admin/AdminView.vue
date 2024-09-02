<script setup>
  import PropiedadAdmin from '@/components/PropiedadAdmin.vue';
  import usePropiedades from '@/composables/usePropiedades';
  import { propertyPrice } from '@/helpers';

  const { propiedadesCollection, deleteItem } = usePropiedades()

</script>

<template>
  <h2 class="text-center text-h3 my-5 font-weight-bold">Admin Panel</h2>

  <v-btn
    color="teal"
    variant="flat"
    :to="{name: 'nueva-propiedad'}"
  >
    Nueva Propiedad
  </v-btn>

  <v-card class="mx-auto mt-10" flat>
    <v-row> 
      <PropiedadAdmin
        v-for="propiedad in propiedadesCollection"
        :key="propiedad.id"
        :propiedad="propiedad"   
        :price="propertyPrice"
        :delete-item="deleteItem"    
      />
    </v-row>
  </v-card>
</template>
