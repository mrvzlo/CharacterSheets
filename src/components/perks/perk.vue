<template>
   <div class="card mx-2">
      <div class="card-header px-1 bg-primary text-white d-flex">
         <div @click="editModel.expand = !editModel.expand">
            <i class="fas fa-eye text-white px-3"></i>
         </div>
         <div class="flex-grow-1">
            <input
               type="text"
               v-model="editModel.name"
               class="border-0 border-bottom border-white px-1 w-100 h-100 text-white bg-primary"
               :disabled="locked"
            />
         </div>
         <div v-if="deleteMode" class="block light mx-1">
            <div v-on:click="toggleDelete" class="w-100 h-100">
               <i v-if="item.delete" class="fas fa-times"></i>
            </div>
         </div>
         <div v-else class="mx-4 ps-1"></div>
      </div>
      <div class="card-body p-0" v-if="editModel.expand">
         <div class="d-flex px-2 border-bottom">
            <div class="py-1 w-50">Восстановление</div>
            <select v-model="editModel.cooldown" class="plain w-50 p-1" :disabled="locked">
               <option :value="cooldownType.Permanent" selected>Не требуется</option>
               <option :value="cooldownType.Turn">В начале хода</option>
               <option :value="cooldownType.ShortRest">За короткий отдых</option>
               <option :value="cooldownType.LongRest">За длинный отдых</option>
            </select>
         </div>
         <div class="px-2 py-1">Описание</div>
         <textarea v-model="editModel.description" class="w-100 py-1 px-2 d-block" rows="2" :disabled="locked"></textarea>
      </div>
      <div class="card-footer d-flex px-0 py-1 align-items-center" v-if="editModel.cooldown !== cooldownType.Permanent">
         <div class="py-0 px-2 col-3">Заряды</div>
         <div class="d-flex align-items-center col-6 justify-content-center">
            <button class="btn btn-sm btn-outline" type="button" v-on:click="editModel.inc()" v-if="locked">
               <i class="fas fa-fw fa-plus-circle"></i>
            </button>
            <input v-model="editModel.count" class="plain w-50px text-center" type="number" :max="editModel.max" min="0" />
            <div class="mx-1 lh-inherit">/</div>
            <input v-model="editModel.max" class="plain w-50px text-center" type="number" min="0" :disabled="locked" />
            <button class="btn btn-sm btn-outline" type="button" v-on:click="editModel.dec()" v-if="locked">
               <i class="fas fa-fw fa-minus-circle"></i>
            </button>
         </div>
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
         Object.assign(this.item, { name: this.editModel.name });
         Object.assign(this.item, { description: this.editModel.description });
         Object.assign(this.item, { count: this.editModel.count });
         Object.assign(this.item, { max: this.editModel.max });
         Object.assign(this.item, { delete: this.editModel.delete });
         Object.assign(this.item, { expand: this.editModel.expand });
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
