<template>
   <div class="card mx-2">
      <div class="card-header px-1 bg-primary text-white d-flex">
         <div @click="editModel.expand = !editModel.expand">
            <i class="icon icon-eye text-white px-2"></i>
         </div>
         <div class="flex-grow-1 ps-1">
            <input
               type="text"
               v-model="editModel.name"
               class="border-0 border-bottom border-white px-1 w-100 h-100 text-white bg-primary"
               :disabled="locked"
            />
         </div>
         <div v-if="deleteMode" class="block light mx-1">
            <div v-on:click="toggleDelete" class="w-100 h-100">
               <i v-if="item.delete" class="icon icon-cancel"></i>
            </div>
         </div>
         <div class="d-flex align-items-center" v-else-if="editModel.cooldown !== cooldownType.Permanent">
            <input v-model="editModel.count" class="plain w-50px text-center text-white" type="number" :max="editModel.max" min="0" />
            <i class="icon icon-slash"></i>
            <input v-model="editModel.max" class="plain w-50px text-center text-white" type="number" min="0" :disabled="locked" />
         </div>
         <div v-else class="mx-4 ps-1"></div>
      </div>
      <div class="card-body p-0" v-if="editModel.expand">
         <div class="d-flex px-2 border-bottom">
            <div class="py-1 w-50">{{ $t('regain') }}</div>
            <select v-model="editModel.cooldown" class="plain w-50 p-1" :disabled="locked">
               <option :value="cooldownType.Permanent" selected>{{ $t('not_required') }}</option>
               <option :value="cooldownType.Turn">{{ $t('each_turn') }}</option>
               <option :value="cooldownType.ShortRest">{{ $t('after_short_rest') }}</option>
               <option :value="cooldownType.LongRest">{{ $t('after_long_rest') }}</option>
            </select>
         </div>
         <div class="px-2 py-1">{{ $t('description') }}</div>
         <textarea v-model="editModel.description" class="w-100 py-1 px-2 d-block" rows="2" :disabled="locked"></textarea>
      </div>
   </div>
</template>

<script>
import Perk from '@/models/perks/perk';
import Character from '@/models/character';
import { CooldownType } from '@/models/perks/cooldown-type';

export default {
   name: 'countable',
   props: {
      item: Perk,
      character: Character,
      deleteMode: Boolean,
   },
   data() {
      return {
         editModel: Perk,
         cooldownType: CooldownType,
      };
   },
   methods: {
      getData() {
         this.editModel = this.item;
      },
      setData() {
         Object.keys(this.item).forEach((x) => {
            let temp = {};
            temp[x] = this.editModel[x];
            Object.assign(this.item, temp);
         });
      },
      toggleDelete() {
         this.editModel.delete = !this.editModel.delete;
         this.setData();
      },
   },
   created() {
      this.cooldownType = CooldownType;
   },
   watch: {
      item: {
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
