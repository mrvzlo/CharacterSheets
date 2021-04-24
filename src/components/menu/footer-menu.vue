<template>
   <div class="position-fixed bottom-0 end-0 w-100 px-2 d-flex justify-content-end">
      <transition name="fade-fast">
         <div class="border-0 text-right bg-white py-2 ps-2" :id="'menu'" v-if="show">
            <div class="btn btn-success me-1" data-bs-toggle="modal" data-bs-target="#saveModal">
               <i class="fas fa-fw fa-save"></i>
            </div>
            <div class="btn btn-danger me-1" data-bs-toggle="modal" data-bs-target="#reloadModal">
               <i class="fas fa-fw fa-redo"></i>
            </div>
            <div class="btn btn-primary me-1" data-bs-toggle="modal" data-bs-target="#importModal">
               <i class="fas fa-fw fa-upload"></i>
            </div>
            <div class="btn btn-primary me-1" data-bs-toggle="modal" data-bs-target="#exportModal">
               <i class="fas fa-fw fa-download"></i>
            </div>
            <div class="btn btn-warning me-2" v-on:click="lock">
               <i :class="'fas fa-fw ' + (locked ? 'fa-unlock' : 'fa-lock')"></i>
            </div>
         </div>
      </transition>
      <div class="my-2" v-on:click="show = !show">
         <i class="fas fa-cog fa-2x"></i>
      </div>
   </div>
</template>

<script>
export default {
   name: "footer-menu",
   props: {
      locked: { type: Boolean },
   },
   data: function() {
      return {
         show: false,
      };
   },
   methods: {
      lock: function() {
         return this.$parent.lock();
      },
      reloadCharacter: function() {
         return this.$parent.reloadCharacter();
      },
   },
};
</script>
