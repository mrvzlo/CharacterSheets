<template>
   <div class="d-flex flex-column h-100">
      <div class="text-center h4 my-3 fw-bold">{{ $t('skills_and_feats') }}</div>
      <div class="flex-grow-1">
         <div class="pb-2" v-for="item in character.perks" :key="item">
            <perk :item="item" :character="character" :deleteMode="deleteMode" />
         </div>
         <proficiencies :character="character" />
      </div>
      <div v-if="!locked" class="text-center">
         <div v-if="!deleteMode">
            <button class="btn btn-success m-2 px-4" v-on:click="add">
               <i class="icon icon-plus mx-2"></i>
            </button>
            <button class="btn btn-danger m-2 px-4" v-on:click="openDeleteMode" :disabled="!character.perks.length">
               <i class="icon icon-trash mx-2"></i>
            </button>
         </div>
         <div v-else>
            <button class="btn btn-danger m-2 px-4" v-on:click="confirmDelete" :disabled="!anyMarked()">
               <i class="icon icon-trash mx-2"></i>
            </button>
            <button class="btn btn-secondary m-2 px-4" v-on:click="this.deleteMode = false">
               <i class="icon icon-cancel mx-2"></i>
            </button>
         </div>
      </div>
   </div>
</template>

<script>
import Character from '@/models/character';
import PerkComponent from './perk.vue';
import ProficienciesComponent from './proficiencies.vue';

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
      add() {
         this.character.addPerk();
      },
      anyMarked() {
         return this.character.perks.filter((x) => x.delete).length > 0;
      },
      openDeleteMode() {
         this.deleteMode = true;
         this.character.perks.forEach((x) => x.toggleDeleteMode(false));
      },
      confirmDelete() {
         this.deleteMode = false;
         this.character.clearPerks();
      },
   },
   computed: {
      locked: function() {
         return this.character.settings.locked;
      },
   },
   components: { perk: PerkComponent, proficiencies: ProficienciesComponent },
};
</script>
