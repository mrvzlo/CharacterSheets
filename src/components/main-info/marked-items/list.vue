<template>
   <div v-if="character.markedItems.length">
      <div class="mx-1 row">
         <div v-for="item in character.markedItems" v-bind:key="item" class="col-6 pt-2">
            <item :item="item" :locked="character?.settings.locked" />
         </div>
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
