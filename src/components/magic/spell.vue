<template>
   <div class="d-flex mt-2">
      <div v-on:click="editModel.marked = !editModel.marked">
         <i :class="'p-1 ' + (editModel.marked ? 'fas fa-circle' : 'far fa-circle')"></i>
      </div>
      <input v-model="editModel.name" class="border-0 px-1 py-0 border-bottom flex-grow-1" placeholder="Название" :disabled="locked" />
      <div class="block light mx-1" v-if="deleteMode">
         <div v-on:click="editModel.delete = !editModel.delete" class="w-100 h-100">
            <i v-if="spell.delete" class="fas fa-times"></i>
         </div>
      </div>
   </div>
   <div class="d-flex py-1">
      <div v-on:click="locked ? null : (editModel.verbal = !editModel.verbal)" :class="editModel.verbal ? '' : 'op-03'">
         <i class="fas fa-comment-dots mx-2 h4 m-0"></i>
      </div>
      <div v-on:click="locked ? null : (editModel.somatic = !editModel.somatic)" :class="editModel.somatic ? '' : 'op-03'">
         <i class="fas fa-hand-paper mx-2 h4 m-0"></i>
      </div>
      <div v-on:click="locked ? null : (editModel.material = !editModel.material)" :class="editModel.material ? '' : 'op-03'">
         <i class="fas fa-magic mx-2 h4 m-0"></i>
      </div>
      <input v-model="editModel.components" class="border-0 px-1 py-0 border-bottom flex-grow-1" placeholder="" :disabled="locked" />
      <div v-on:click="locked ? null : (editModel.ritual = !editModel.ritual)" :class="editModel.ritual ? '' : 'op-03'">
         <i class="fas fa-clock mx-2 h4 m-0"></i>
      </div>
      <div v-on:click="locked ? null : (editModel.concentration = !editModel.concentration)" :class="editModel.concentration ? '' : 'op-03'">
         <i class="fas fa-brain mx-2 h4 m-0"></i>
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
