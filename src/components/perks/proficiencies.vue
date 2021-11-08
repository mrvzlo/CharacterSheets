<template>
   <div class="card mx-2">
      <div class="card-header px-1 bg-primary text-white d-flex" @click="toggleExpand">
         <i class="icon icon-eye text-white px-2"></i>
         <div class="ps-1">{{ $t('proficiencies') }}</div>
      </div>
      <div class="card-body p-0" v-if="editModel.expand">
         <div class="px-2 py-1">{{ $t('armor') }}</div>
         <textarea v-model="editModel.armors" class="w-100 py-1 px-2 d-block" rows="1" :disabled="locked"></textarea>
         <div class="px-2 py-1">{{ $t('weapons') }}</div>
         <textarea v-model="editModel.weapons" class="w-100 py-1 px-2 d-block" rows="1" :disabled="locked"></textarea>
         <div class="px-2 py-1">{{ $t('tools') }}</div>
         <textarea v-model="editModel.tools" class="w-100 py-1 px-2 d-block" rows="1" :disabled="locked"></textarea>
         <div class="px-2 py-1">{{ $t('languages') }}</div>
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
         Object.keys(this.character.proficiencies).forEach((x) => {
            let temp = {};
            temp[x] = this.editModel[x];
            Object.assign(this.character.proficiencies, temp);
         });
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
