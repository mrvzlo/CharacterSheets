<template>
   <div class="d-flex flex-column">
      <div class="text-center h4 my-3 fw-bold">Способности и черты</div>
      <div class="flex-grow-1">
         <div class="pb-2" v-for="item in character.perks" :key="item">
            <perk :item="item" :character="character" :deleteMode="deleteMode" />
         </div>
         <proficiencies :character="character" />
      </div>
      <div v-if="!deleteMode && !locked" class="text-center">
         <button class="btn fw btn-success m-2" v-on:click="add">
            <i class="fas fa-plus-circle me-2"></i>
            Добавить
         </button>
         <button class="btn fw btn-danger m-2" v-on:click="openDeleteMode" :disabled="!character.perks.length">
            <i class="fas fa-trash me-2"></i>
            Удалить
         </button>
      </div>
      <div v-if="deleteMode" class="text-center">
         <button class="btn fw btn-danger m-2" v-on:click="confirmDelete">
            <i class="fas fa-trash me-2"></i>
            Удалить
         </button>
         <button class="btn fw btn-secondary m-2" v-on:click="this.deleteMode = false">
            <i class="fas fa-times me-2"></i>
            Отмена
         </button>
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
