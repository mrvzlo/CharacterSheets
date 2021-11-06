<template>
   <div class="position-relative pt-1">
      <div class="d-flex mx-1 align-items-end">
         <input v-model="editModel.name" class="border-bottom plain flex-grow-1 px-1" :placeholder="$t('name')" :disabled="locked" />

         <div v-if="!deleteMode" class="border-bottom d-flex align-items-center">
            <button class="btn p-0 btn-outline lh-0" type="button" v-on:click="editModel.inc()" v-if="locked">
               <i class="fas fa-fw fa-plus-circle"></i>
            </button>
            <input v-model="editModel.count" class="plain w-30px text-center" type="number" :max="editModel.max" min="0" />
            <i class="fas fa-slash"></i>
            <input v-model="editModel.max" class="plain w-30px text-center" type="number" min="0" :disabled="locked" />
            <button class="btn p-0 btn-outline lh-0" type="button" v-on:click="editModel.dec()" v-if="locked">
               <i class="fas fa-fw fa-minus-circle"></i>
            </button>
         </div>
         <div v-else class="block light ms-1 w-50px mb-n1px">
            <div v-on:click="toggleDelete" class="w-100 h-100 text-center">
               <i v-if="item.delete" class="fas fa-times"></i>
               <i v-else>&nbsp;</i>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import Countable from '@/models/countable';
import Octagon from '../../helpers/octagon.vue';
import Character from '@/models/character';

export default {
   name: 'countable',
   props: {
      item: Countable,
      character: Character,
      deleteMode: Boolean,
   },
   data() {
      return {
         editModel: Countable,
      };
   },
   methods: {
      getData() {
         this.editModel = this.item;
      },
      setData() {
         if (+this.editModel.count > +this.editModel.max) {
            this.editModel.count = this.editModel.max;
         }
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
   components: { Octagon },
};
</script>
