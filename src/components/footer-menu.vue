<template>
   <div class="position-fixed bottom-0 end-0 mx-2 d-flex">
      <div class="border-0 collapse" :id="'menu'">
         <div class="btn btn-secondary me-1">
            <i class="fas fa-fw fa-save"></i>
         </div>
         <div class="btn btn-danger me-1">
            <i class="fas fa-fw fa-redo" v-on:click="loadCharacter"></i>
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
      <div class="mb-2" data-bs-toggle="collapse" href="#menu">
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
