<template>
   <div class="d-flex mt-2 align-items-end">
      <div v-on:click="editModel.marked = !editModel.marked">
         <i :class="'p-1 icon icon-circle' + (editModel.marked ? '' : '-empty')"></i>
      </div>
      <input v-model="editModel.name" class="border-0 px-1 py-0 border-bottom flex-grow-1" :placeholder="$t('name')" :disabled="locked" />
      <div class="block light mx-1 mb-n1px" v-if="deleteMode">
         <div v-on:click="editModel.delete = !editModel.delete" class="w-100 h-100">
            <i v-if="spell.delete" class="icon icon-cancel"></i>
         </div>
      </div>
   </div>
   <div class="d-flex py-1" :disabled="locked">
      <div v-on:click="locked ? null : (editModel.verbal = !editModel.verbal)" :class="editModel.verbal ? '' : 'op-03'">
         <i class="icon icon-voice mx-1 icon-md"></i>
      </div>
      <div v-on:click="locked ? null : (editModel.somatic = !editModel.somatic)" :class="editModel.somatic ? '' : 'op-03'">
         <i class="icon icon-hand mx-1 icon-md"></i>
      </div>
      <div v-on:click="locked ? null : (editModel.material = !editModel.material)" :class="editModel.material ? '' : 'op-03'">
         <i class="icon icon-magic mx-1 icon-md"></i>
      </div>
      <input v-model="editModel.components" class="border-0 px-1 me-1 py-0 border-bottom flex-grow-1" placeholder="" :disabled="locked" />
      <div v-on:click="locked ? null : (editModel.ritual = !editModel.ritual)" :class="editModel.ritual ? '' : 'op-03'">
         <i class="icon icon-time mx-1 icon-md"></i>
      </div>
      <div v-on:click="locked ? null : (editModel.concentration = !editModel.concentration)" :class="editModel.concentration ? '' : 'op-03'">
         <i class="icon icon-brain mx-1 icon-md"></i>
      </div>
   </div>
</template>

<script>
import Spell from '@/models/magic/spell';
import MagicSlot from '@/models/magic/magic-slot';

export default {
   name: 'spell',
   props: {
      spell: Spell,
      magicSlot: MagicSlot,
      index: Number,
      deleteMode: Boolean,
      locked: Boolean,
   },
   data() {
      return {
         editModel: Spell,
      };
   },
   methods: {
      getData() {
         this.editModel = this.spell;
      },
      setData() {
         Object.assign(this.spell, { name: this.editModel.name });
         Object.assign(this.spell, { delete: this.editModel.delete });
      },
   },
   watch: {
      spell: {
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
