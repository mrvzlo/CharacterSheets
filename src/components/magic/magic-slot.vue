<template>
   <div class="card">
      <div class="card-header border-bottom d-flex justify-content-between px-1 bg-primary text-white">
         <div class="flex-grow-1 text-start" data-bs-toggle="collapse" :data-bs-target="'.collapse_' + index">
            <div class="py-1 ps-2">{{ name }}</div>
         </div>
         <div class="d-flex" v-if="index > 0 && index <= 9">
            <input type="number" v-model="uses" @change="setData" class="plain w-50px text-white" min="0" />
            <span class="py-1">/</span>
            <input type="number" v-model="limit" @change="setData" class="plain w-50px text-white" min="0" />
         </div>
      </div>
      <div :class="'card-body p-1 collapse show collapse_' + index">
         <div v-if="magicSlot.spells.length == 0">Ничего не изучено</div>
         <div v-for="(item, itemIndex) in magicSlot.spells" v-bind:key="itemIndex">
            <spell :spell="item" :index="itemIndex" :magicSlot="magicSlot" :deleteMode="deleteMode" :locked="locked" />
         </div>
         <div class="text-start mt-2" v-if="!locked">
            <button class="btn btn-success rounded-circle p-1 btn-sm lh-0" v-on:click="addItem">
               <i class="fas fa-plus-circle"></i>
            </button>
         </div>
      </div>
   </div>
</template>

<script>
import MagicSlot from "@/models/magic/magic-slot";
import SpellComponent from "./spell";

export default {
   name: "magic-slot",
   props: {
      magicSlot: MagicSlot,
      index: Number,
      deleteMode: Boolean,
      name: String,
      locked: Boolean,
   },
   data() {
      return {
         limit: Number,
         uses: Number,
         delete: Boolean,
      };
   },
   methods: {
      getData() {
         this.limit = this.magicSlot.limit;
         this.uses = this.magicSlot.uses;
         this.delete = this.magicSlot.delete;
      },
      setData() {
         Object.assign(this.magicSlot, { uses: this.uses });
         Object.assign(this.magicSlot, { limit: this.limit });
         Object.assign(this.magicSlot, { delete: this.delete });
      },
      addItem() {
         this.magicSlot.addItem();
      },
      toggleDelete() {
         this.delete = !this.delete;
         this.magicSlot.toggleDeleteMode(true);
         this.setData();
      },
   },
   watch: {
      magicSlot: {
         handler() {
            this.getData();
         },
         deep: true,
         immediate: true,
      },
   },
   components: { spell: SpellComponent },
};
</script>
