<template>
   <div class="gray-oct position-relative pt-1">
      <div class="d-flex px-1 border-bottom">
         <input v-model="editModel.name" class="border-0 plain" placeholder="Название" :disabled="locked" />
      </div>
      <div class="d-flex px-1 justify-content-center">
         <template v-if="!deleteMode">
            <button class="btn btn-sm text-primary" type="button" v-on:click="editModel.inc()" v-if="locked">
               <i class="fas fa-fw fa-plus-circle"></i>
            </button>
            <input v-model="editModel.count" class="plain w-100" type="number" :max="editModel.max" min="0" />
            <div class="mx-1 my-0 h5 lh-inherit">/</div>
            <input v-model="editModel.max" class="plain w-100" type="number" min="0" :disabled="locked" />
            <button class="btn btn-sm text-primary" type="button" v-on:click="editModel.dec()" v-if="locked">
               <i class="fas fa-fw fa-minus-circle"></i>
            </button>
         </template>
         <div class="block light m-1" v-else>
            <div v-on:click="toggleDelete" class="w-100 h-100 text-center">
               <i v-if="item.delete" class="fas fa-times"></i>
            </div>
         </div>
      </div>
      <octagon />
   </div>
</template>

<script>
import Countable from '@/models/countable';
import Octagon from '../helpers/octagon.vue';
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
         Object.assign(this.item, { name: this.editModel.name });
         Object.assign(this.item, { count: this.editModel.count });
         Object.assign(this.item, { max: this.editModel.max });
         Object.assign(this.item, { delete: this.editModel.delete });
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
