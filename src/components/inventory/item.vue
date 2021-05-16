<template>
   <div class="d-flex my-1">
      <div class="hex light mt-1 mx-1">
         <input v-model="count" class="plain w-100" type="number" min="0" max="999" @change="setData" />
      </div>
      <input v-model="name" class="border-0 px-1 border-bottom flex-grow-1" />
      <div class="block light mt-1 mx-1">
         <input v-model="weight" class="plain w-100" type="number" min="0" max="999" @change="setData" />
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
   },
   data() {
      return {
         name: String,
         count: Number,
         weight: Number,
      };
   },
   methods: {
      getData() {
         this.name = this.item.name;
         this.count = this.item.count;
         this.weight = this.item.weight;
      },
      setData() {
         Object.assign(this.item, { name: this.name });
         Object.assign(this.item, { count: this.count });
         Object.assign(this.item, { weight: this.weight });
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
