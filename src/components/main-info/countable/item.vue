<template>
   <div class="col-6 px-1 my-1">
      <div class="position-relative pt-1">
         <div class="mx-1">
            <input v-model="editModel.name" class="border-bottom plain w-100 px-1 text-center" :placeholder="$t('name')" :disabled="locked" />

            <div v-if="!deleteMode" class="d-flex align-items-center justify-content-center">
               <input v-model="editModel.count" class="plain w-30px text-center" type="number" :max="editModel.max" min="0" />
               <i class="icon icon-slash"></i>
               <input v-model="editModel.max" class="plain w-30px text-center" type="number" min="0" :disabled="locked" />
            </div>
            <div v-else class="block light ms-1 w-50px mb-n1px">
               <div v-on:click="toggleDelete" class="w-inherit text-center">
                  <i v-if="item.delete" class="icon icon-cancel"></i>
                  <i v-else>&nbsp;</i>
               </div>
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
