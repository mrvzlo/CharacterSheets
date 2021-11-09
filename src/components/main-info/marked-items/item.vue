<template>
   <div class="minw-50p">
      <div class="d-flex align-items-center p-2 pb-0">
         <div class="dropdown">
            <button class="btn p-0 pe-2 text-default btn-outline" type="button" data-bs-toggle="dropdown">
               <i :class="'icon icon-' + icons[item.category]"></i>
            </button>
            <div :class="'dropdown-menu ' + (locked ? 'd-none' : '')">
               <div class="d-flex justify-content-evenly">
                  <div v-for="(icon, index) in icons" v-bind:key="icon" class="p-1 m-1" v-on:click="editModel.category = index">
                     <i :class="'icon icon-' + icon"></i>
                  </div>
               </div>
            </div>
         </div>
         <div class="minw-50px flex-grow-1">
            {{ editModel.name }}
         </div>
         <div class="hex ms-2" :style="`--color: ${colors[editModel.category]}deg`">
            <input v-model="editModel.bonus" class="plain w-inherit" type="number" :disabled="locked" />
         </div>
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
         colors: [-10, 120, 200, 240, 300, 60],
      };
   },
   methods: {
      isBig() {
         return this.editModel.name.length > 10;
      },
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
