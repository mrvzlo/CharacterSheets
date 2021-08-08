<template>
   <div :class="'position-fixed px-2 mt-3 text-center message ' + msgClass">
      <transition name="fade">
         <div :class="'text-white rounded ' + model.color" v-if="model.show" v-on:click="close">
            <div class="d-flex justify-content-center">
               <i :class="'m-auto ms-3 ' + model.icon"></i>
               <div class="toast-body text-center py-2">
                  {{ model.text }}
               </div>
               <button type="button" class="btn-close m-auto me-2 btn-close-white"></button>
            </div>
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
   watch: {
      model() {
         this.getData();
      },
   },
};
</script>
