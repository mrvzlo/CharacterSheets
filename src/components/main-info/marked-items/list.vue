<template>
   <div v-if="character.markedItems.length">
      <div class="mx-1 d-flex flex-wrap justify-content-center">
         <item v-for="item in character.markedItems" v-bind:key="item" :item="item" :locked="character?.settings.locked" />
      </div>
   </div>
</template>

<script>
import Character from '@/models/character';
import ItemComponent from './item.vue';

export default {
   name: 'health',
   props: {
      character: Character,
   },
   components: {
      item: ItemComponent,
   },
};
</script>
