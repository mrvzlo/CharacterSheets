<template>
   <div class="text-center h4 my-2">Инвентарь</div>
   <div class="flex-grow-1">
      <div class="row justify-content-center mx-0">
         <div class="col-12 col-md-6 mb-2" v-for="(container, index) in character.inventory" v-bind:key="index">
            <container :container="container" :index="index" :deleteMode="deleteMode" />
         </div>
      </div>
   </div>
   <div v-if="!deleteMode">
      <button class="btn fw btn-success m-2" v-on:click="addContainer">
         <i class="fas fa-plus-circle me-2"></i>
         Добавить
      </button>
      <button class="btn fw btn-danger m-2" v-on:click="openDeleteMode" :disabled="!character.inventory.length">
         <i class="fas fa-trash me-2"></i>
         Удалить
      </button>
   </div>
   <div v-if="deleteMode">
      <button class="btn fw btn-danger m-2" v-on:click="confirmDelete">
         <i class="fas fa-trash me-2"></i>
         Удалить
      </button>
      <button class="btn fw btn-secondary m-2" v-on:click="this.deleteMode = false">
         <i class="fas fa-times me-2"></i>
         Отмена
      </button>
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
