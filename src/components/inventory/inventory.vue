<template>
   <div class="d-flex flex-column h-100">
      <div class="text-center h4 my-3 fw-bold">{{ $t('inventory') }}</div>
      <div class="flex-grow-1">
         <div class="row justify-content-center mx-0">
            <div class="col-12 col-md-6 mb-2 px-2" v-for="(container, index) in character.inventory" v-bind:key="index">
               <container :container="container" :index="index" :deleteMode="deleteMode" />
            </div>
         </div>
      </div>
      <div v-if="!deleteMode" class="text-center">
         <button class="btn btn-success m-2 px-4" v-on:click="addContainer">
            <i class="fas fa-plus-circle fa-fw mx-2"></i>
         </button>
         <button class="btn btn-danger m-2 px-4" v-on:click="openDeleteMode" :disabled="!character.inventory.length">
            <i class="fas fa-trash fa-fw mx-2"></i>
         </button>
      </div>
      <div v-if="deleteMode" class="text-center">
         <button class="btn btn-danger m-2 px-4" v-on:click="confirmDelete" :disabled="!anyMarked()">
            <i class="fas fa-trash fa-fw mx-2"></i>
         </button>
         <button class="btn btn-secondary m-2 px-4" v-on:click="this.deleteMode = false">
            <i class="fas fa-times fa-fw mx-2"></i>
         </button>
      </div>
   </div>
</template>

<script>
import Character from '../../models/character';
import ContainerComponent from './container';

export default {
   name: 'inventory',
   props: {
      character: Character,
   },
   data() {
      return {
         deleteMode: false,
      };
   },
   methods: {
      addContainer() {
         this.character.addContainer();
      },
      anyMarked() {
         return this.character.inventory.filter((x) => x.delete || x.inner.filter((x) => x.delete).length > 0).length > 0;
      },
      openDeleteMode() {
         this.deleteMode = true;
         this.character.inventory.forEach((x) => x.toggleDeleteMode(false));
      },
      confirmDelete() {
         this.deleteMode = false;
         this.character.clearInventory();
      },
   },
   components: {
      container: ContainerComponent,
   },
};
</script>
