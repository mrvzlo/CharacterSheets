<template>
   <div class="card">
      <div class="card-header d-flex justify-content-between px-1 bg-primary text-white align-items-end">
         <div @click="editModel.expand = !editModel.expand">
            <i class="fas fa-eye text-white px-3"></i>
         </div>
         <div class="flex-grow-1">
            <input type="text" v-model="editModel.name" class="border-0 border-bottom border-white px-1 w-100 h-100 text-white bg-primary" />
         </div>
         <div class="d-flex align-items-center text-center" v-if="!deleteMode">
            <span :class="'w-50px ' + (container.weight > container.capacity ? 'text-danger' : '')">{{ container.weight }}</span>
            <i class="fas fa-slash"></i>
            <input type="number" v-model="editModel.capacity" class="plain w-50px text-white text-center" min="0" />
         </div>
         <div v-if="deleteMode" class="block light mx-1 mb-n1px">
            <div v-on:click="toggleDelete" class="w-100 h-100">
               <i v-if="container.delete" class="fas fa-times"></i>
            </div>
         </div>
      </div>
      <div class="card-body p-1 pt-0" v-if="editModel.expand">
         <div v-for="(item, itemIndex) in container.inner" v-bind:key="itemIndex">
            <item :item="item" :index="itemIndex" :container="container" :deleteMode="deleteMode" />
         </div>
         <div class="text-start mt-2">
            <div class="btn btn-success p-1 btn-sm lh-0" v-on:click="addItem">
               <i class="fas fa-plus-circle"></i>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import Container from '@/models/inventory/container';
import ItemComponent from './item.vue';

export default {
   name: 'container',
   props: {
      container: Container,
      index: Number,
      deleteMode: Boolean,
   },
   data() {
      return {
         editModel: Container,
      };
   },
   methods: {
      getData() {
         this.editModel = this.container;
      },
      setData() {
         Object.assign(this.container, { name: this.editModel.name });
         Object.assign(this.container, { capacity: this.editModel.capacity });
         Object.assign(this.container, { expand: this.editModel.expand });
         Object.assign(this.container, { delete: this.editModel.delete });
      },
      addItem() {
         this.container.addItem();
      },
      toggleDelete() {
         this.editModel.delete = !this.editModel.delete;
         this.container.toggleDeleteMode(this.editModel.delete);
      },
   },
   watch: {
      container: {
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
   components: { item: ItemComponent },
};
</script>
