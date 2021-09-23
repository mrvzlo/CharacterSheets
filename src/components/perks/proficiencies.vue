<template>
   <div class="card mx-2">
      <div class="card-header px-1 bg-primary text-white d-flex">
         <div @click="toggleExpand">
            <i class="fas fa-eye text-white px-3"></i>
         </div>
         <div>
            Владения
         </div>
      </div>
      <div class="card-body p-0" v-if="editModel.expand">
         <div class="px-2 py-1">Броня</div>
         <textarea v-model="editModel.armors" class="w-100 py-1 px-2 d-block" rows="1" :disabled="locked"></textarea>
         <div class="px-2 py-1">Оружие</div>
         <textarea v-model="editModel.weapons" class="w-100 py-1 px-2 d-block" rows="1" :disabled="locked"></textarea>
         <div class="px-2 py-1">Инструменты</div>
         <textarea v-model="editModel.tools" class="w-100 py-1 px-2 d-block" rows="1" :disabled="locked"></textarea>
         <div class="px-2 py-1">Языки</div>
         <textarea v-model="editModel.languages" class="w-100 py-1 px-2 d-block" rows="1" :disabled="locked"></textarea>
      </div>
   </div>
</template>

<script>
import Character from '@/models/character';
import Proficiencies from '@/models/proficiencies/proficiencies';

export default {
   name: 'proficiencies',
   props: {
      character: Character,
   },
   data() {
      return {
         editModel: Proficiencies,
      };
   },
   methods: {
      toggleExpand() {
         this.editModel.expand = !this.editModel.expand;
      },
      getData() {
         this.editModel = this.character.proficiencies;
      },
      setData() {
         Object.assign(this.character.proficiencies, { armors: this.editModel.armors });
         Object.assign(this.character.proficiencies, { weapons: this.editModel.weapons });
         Object.assign(this.character.proficiencies, { tools: this.editModel.tools });
         Object.assign(this.character.proficiencies, { languages: this.editModel.languages });
         Object.assign(this.character.proficiencies, { expand: this.editModel.expand });
      },
   },
   watch: {
      character: {
         handler() {
            this.getData();
         },
         deep: true,
         immediate: true,
      },
      editModel: {
         handler() {
            this.setData();
         },
         deep: true,
      },
   },
   computed: {
      locked: function() {
         return this.character.settings.locked;
      },
   },
};
</script>
