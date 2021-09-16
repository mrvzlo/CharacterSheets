<template>
   <div :class="'position-fixed px-2 mt-3 text-center message ' + msgClass">
      <transition name="fade">
         <div v-if="model.show" v-on:click="close">
            <slot></slot>
         </div>
      </transition>
   </div>
</template>

<script>
import FixedMessageModel from '../models/fixed-message';
export default {
   name: 'fixed-message',
   props: {
      model: FixedMessageModel,
      msgClass: String,
   },
   methods: {
      close() {
         this.model.closeHeader();
      },
   },
};
</script>
