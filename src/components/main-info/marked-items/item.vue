<template>
   <div class="d-flex align-items-center">
      <div class="dropdown">
         <button class="btn p-0 pe-2 text-default" type="button" data-bs-toggle="dropdown">
            <i :class="'icon icon-' + icons[item.category]"></i>
         </button>
         <div class="dropdown-menu">
            <div class="d-flex justify-content-evenly">
               <div v-for="(icon, index) in icons" v-bind:key="icon" class="p-1 m-1" v-on:click="editModel.category = index">
                  <i :class="'icon icon-' + icon"></i>
               </div>
            </div>
         </div>
      </div>
      <div class="flex-grow-1">{{ item.name }}</div>
      <div class="hex ms-1" :style="`--color: ${colors[editModel.category]}deg`">
         <input v-model="editModel.bonus" class="plain w-100" type="number" :disabled="locked" />
      </div>
   </div>
</template>

<script>
import Item from '@/models/inventory/item';

export default {
   name: 'container',
   props: {
      item: Item,
      locked: Boolean,
   },
   data() {
      return {
         editModel: Item,
         icons: ['sword', 'bow', 'helmet', 'potion', 'scroll', 'tools'],
         colors: [0, 120, 200, 240, 320, 60],
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
};
</script>
