<template>
   <div class="d-flex mt-2 align-items-end">
      <div class="hex light mx-1 mb-n1px">
         <input v-model="editModel.count" class="plain w-100" type="number" min="0" max="999" />
      </div>
      <div class="border-bottom flex-grow-1">
         <input v-model="editModel.name" class="border-0 px-1 py-0 w-100" :placeholder="$t('item')" />
      </div>
      <div v-on:click="editModel.marked = !editModel.marked" class=" mb-n1px">
         <i :class="'icon op-05 ' + (editModel.marked ? 'icon-star' : 'icon-star-empty')"></i>
      </div>
      <div class="block light mx-1 mb-n1px">
         <input v-model="editModel.weight" v-if="!deleteMode" class="plain w-100" type="number" min="0" max="999" />
         <div v-on:click="editModel.delete = !editModel.delete" class="w-100 h-100" v-if="deleteMode">
            <i v-if="item.delete || container.delete" class="icon icon-cancel"></i>
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
