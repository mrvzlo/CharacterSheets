<template>
   <div v-if="character.markedItems.length">
      <div class="mx-2 row">
         <div v-for="item in character.markedItems" v-bind:key="item" class="col-6 pt-2">
            {{ item.name }}
         </div>
      </div>
   </div>
</template>

<script>
import Character from '@/models/character';

export default {
   name: 'health',
   props: {
      character: Character,
   },
   methods: {},
   watch: {},
};
</script>
