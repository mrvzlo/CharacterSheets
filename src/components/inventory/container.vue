<template>
   <div class="card border">
      <div class="card-header border-bottom d-flex justify-content-between px-1">
         <div data-bs-toggle="collapse" :data-bs-target="'.collapse_' + index">
            <i class="fas fa-eye text-white pt-1 my-1 ps-2 pe-3"></i>
         </div>
         <div class="flex-grow-1">
            <input type="text" v-model="name" @change="setData" class="border-0 border-bottom border-white px-1 w-100 h-100" />
         </div>
         <div class="d-flex" v-if="!deleteMode">
            <span class="w-50px py-1">{{ container.weight }}</span>
            <span class="py-1">/</span>
            <input type="number" v-model="capacity" @change="setData" class="plain w-50px" min="0" />
         </div>
         <div v-if="deleteMode" class="block light m-1">
            <div v-on:click="toggleDelete" class="w-100 h-100">
               <i v-if="container.delete" class="fas fa-times"></i>
            </div>
         </div>
      </div>
      <div :class="'card-body p-1 collapse show collapse_' + index">
         <div v-for="(item, itemIndex) in container.inner" v-bind:key="itemIndex">
            <item :item="item" :index="itemIndex" :container="container" :deleteMode="deleteMode" />
         </div>
         <div class="text-start mt-2">
            <button class="btn btn-success p-1 btn-sm lh-0" v-on:click="addItem">
               <i class="fas fa-plus-circle"></i>
            </button>
         </div>
      </div>
   </div>
</template>

<script>
import Container from "@/models/inventory/container";
import ItemComponent from "./item.vue";

export default {
   name: "container",
   props: {
      container: Container,
      index: Number,
      deleteMode: Boolean,
   },
   data() {
      return {
         name: String,
         capacity: Number,
         delete: Boolean,
      };
   },
   methods: {
      getData() {
         this.name = this.container.name;
         this.capacity = this.container.capacity;
         this.delete = this.container.delete;
      },
      setData() {
         Object.assign(this.container, { name: this.name });
         Object.assign(this.container, { capacity: this.capacity });
         Object.assign(this.container, { delete: this.delete });
      },
      addItem() {
         this.container.addItem();
      },
      toggleDelete() {
         this.delete = !this.delete;
         this.container.toggleDeleteMode(true);
         this.setData();
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
   },
   components: { item: ItemComponent },
};
</script>
