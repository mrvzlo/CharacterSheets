<template>
   <div class="my-2 flex-grow-1">
      <div class="row mx-1 justify-content-center" v-if="character.countable.length">
         <countable v-for="item in character.countable" :key="item" :item="item" :character="character" :deleteMode="deleteMode" />
      </div>
   </div>
   <div class="d-flex my-2 mx-1 mt-0" v-if="!character.settings.locked">
      <div class="mx-1 btn btn-primary" @click="toggleExpand">
         {{ $t('counters') }}
         <i :class="'icon icon-' + (expand ? 'left' : 'right')"></i>
      </div>
      <template v-if="expand">
         <template v-if="!deleteMode">
            <button class="btn btn-success mx-1" v-on:click="addCountable">
               <i class="icon icon-plus px-3"></i>
            </button>
            <button class="btn btn-danger mx-1" v-on:click="openDeleteMode" :disabled="!character.countable.length">
               <i class="icon icon-trash px-3"></i>
            </button>
         </template>
         <template v-else>
            <button class="btn btn-danger mx-1" v-on:click="confirmDelete">
               <i class="icon icon-trash px-3"></i>
            </button>
            <button class="btn btn-secondary mx-1" v-on:click="this.deleteMode = false">
               <i class="icon icon-cancel px-3"></i>
            </button>
         </template>
      </template>
   </div>
</template>

<script>
import Character from '@/models/character';
import CountableComponent from './item.vue';

export default {
   name: 'container',
   props: {
      character: Character,
   },
   data() {
      return {
         deleteMode: false,
         expand: false,
      };
   },
   methods: {
      addCountable() {
         this.character.addCountable();
      },
      toggleExpand() {
         this.expand = !this.expand;
      },
      openDeleteMode() {
         this.deleteMode = !this.deleteMode;
         this.character.countable.forEach((x) => x.toggleDeleteMode(false));
      },
      confirmDelete() {
         this.deleteMode = false;
         this.character.clearCountable();
      },
   },
   components: { countable: CountableComponent },
};
</script>
