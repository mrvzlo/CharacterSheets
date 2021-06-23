<template>
   <div class="position-fixed top-0 start-0 w-100 p-2 text-center message">
      <transition name="fade">
         <div :class="'text-white rounded ' + model.color" v-if="model.show">
            <div class="d-flex justify-content-center">
               <i :class="'m-auto ms-3 ' + model.icon"></i>
               <div class="toast-body text-center">
                  {{ model.text }}
               </div>
               <button type="button" class="btn-close m-auto me-2 btn-close-white" v-on:click="close"></button>
            </div>
         </div>
      </transition>
   </div>
</template>

<script>
import HeaderMessageModel from "../models/header-message";
export default {
   name: "header-message",
   props: {
      model: HeaderMessageModel,
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
