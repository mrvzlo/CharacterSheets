<template>
   <div class="d-flex my-1">
      <div class="hex light mt-1 mx-1">
         <input v-model="count" class="plain w-100" type="number" min="0" max="999" @change="setData" />
      </div>
      <input v-model="name" class="border-0 px-1 border-bottom flex-grow-1" @change="setData" placeholder="Предмет" />
      <div class="block light mt-1 mx-1">
         <input v-model="weight" v-if="!deleteMode" class="plain w-100" type="number" min="0" max="999" @change="setData" />
         <div v-on:click="toggleDelete" class="w-100 h-100" v-if="deleteMode">
            <i v-if="item.delete || container.delete" class="fas fa-times"></i>
         </div>
      </div>
   </div>
</template>

<script>
import Item from "@/models/inventory/item";
import Container from "@/models/inventory/container";

export default {
   name: "container",
   props: {
      item: Item,
      container: Container,
      index: Number,
      deleteMode: Boolean,
   },
   data() {
      return {
         name: String,
         count: Number,
         weight: Number,
         delete: Boolean,
      };
   },
   methods: {
      getData() {
         this.name = this.item.name;
         this.count = this.item.count;
         this.weight = this.item.weight;
         this.delete = this.item.delete;
      },
      setData() {
         Object.assign(this.item, { name: this.name });
         Object.assign(this.item, { count: this.count });
         Object.assign(this.item, { weight: this.weight });
         Object.assign(this.item, { delete: this.delete });
      },
      toggleDelete() {
         this.delete = !this.delete;
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
   },
   components: {},
};
</script>
