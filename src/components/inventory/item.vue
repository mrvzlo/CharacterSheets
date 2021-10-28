<template>
   <div class="d-flex mt-2 align-items-end">
      <div class="hex light mx-1">
         <input v-model="editModel.count" class="plain w-100" type="number" min="0" max="999" />
      </div>
      <input v-model="editModel.name" class="border-0 px-1 py-0 border-bottom flex-grow-1" :placeholder="$t('item')" />
      <div class="block light mx-1">
         <input v-model="editModel.weight" v-if="!deleteMode" class="plain w-100" type="number" min="0" max="999" />
         <div v-on:click="toggleDelete" class="w-100 h-100" v-if="deleteMode">
            <i v-if="item.delete || container.delete" class="fas fa-times"></i>
         </div>
      </div>
   </div>
</template>

<script>
import Item from '@/models/inventory/item';
import Container from '@/models/inventory/container';

export default {
   name: 'container',
   props: {
      item: Item,
      container: Container,
      index: Number,
      deleteMode: Boolean,
   },
   data() {
      return {
         editModel: Item,
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
   components: {},
};
</script>
