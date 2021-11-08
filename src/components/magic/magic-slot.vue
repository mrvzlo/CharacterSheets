<template>
   <div class="card">
      <div class="card-header d-flex justify-content-between px-1 bg-primary text-white">
         <div class="flex-grow-1 text-start" @click="toggleExpand">
            <i class="icon icon-eye text-white px-2"></i>
            <span class="px-1">{{ name }}</span>
         </div>
         <div class="d-flex align-items-center" v-if="index > 0 && index <= 9">
            <input type="number" v-model="editModel.uses" class="plain w-30px text-white text-center" min="0" />
            <i class="icon icon-slash"></i>
            <input type="number" v-model="editModel.limit" class="plain w-30px text-white text-center" min="0" />
         </div>
      </div>
      <div class="card-body p-1" v-if="editModel.expand">
         <div v-if="magicSlot.spells.length == 0" class="text-center">{{ $t('no_spells') }}</div>
         <div v-for="(item, itemIndex) in magicSlot.spells" v-bind:key="itemIndex">
            <spell :spell="item" :index="itemIndex" :magicSlot="magicSlot" :deleteMode="deleteMode" :locked="locked" />
         </div>
         <div class="mt-2" v-if="!locked">
            <button class="btn btn-success p-1 btn-sm lh-0" v-on:click="addItem">
               <i class="icon icon-plus"></i>
            </button>
         </div>
      </div>
   </div>
</template>

<script>
import MagicSlot from '@/models/magic/magic-slot';
import SpellComponent from './spell';

export default {
   name: 'magic-slot',
   props: {
      magicSlot: MagicSlot,
      index: Number,
      deleteMode: Boolean,
      name: String,
      locked: Boolean,
   },
   data() {
      return {
         editModel: MagicSlot,
      };
   },
   methods: {
      getData() {
         this.editModel = this.magicSlot;
      },
      setData() {
         Object.assign(this.magicSlot, { uses: this.editModel.uses });
         Object.assign(this.magicSlot, { limit: this.editModel.limit });
         Object.assign(this.magicSlot, { delete: this.editModel.delete });
      },
      addItem() {
         this.magicSlot.addItem();
      },
      toggleDelete() {
         this.editModel.delete = !this.editModel.delete;
         this.magicSlot.toggleDeleteMode(true);
      },
      toggleExpand() {
         if (!this.editModel.expand) this.$parent.hideAll();
         this.editModel.expand = !this.editModel.expand;
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
      editModel: {
         handler() {
            this.setData();
         },
         deep: true,
      },
   },
   components: { spell: SpellComponent },
};
</script>
