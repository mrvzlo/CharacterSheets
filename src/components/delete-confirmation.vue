<template>
   <div class="modal" tabindex="-1" @focus="clear()">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title">{{ $t('delete_confirm_title') }}</h5>
               <button type="button" class="btn btn-outline p-0" data-bs-dismiss="modal">
                  <i class="icon icon-cancel h2 m-0"></i>
               </button>
            </div>
            <div class="modal-body">
               <div class="text-break" v-html="$t('delete_confirm_message', [`<b class='text-danger'>${$t('delete_confirm_word')}</b>`])"></div>
               <input type="text" class="text-lowercase form-control my-3" v-model="confirmText" />
               <div v-if="confirmText.toLowerCase() === $t('delete_confirm_word')" class="text-center">
                  <slot></slot>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: 'delete-confirmation',
   data() {
      return {
         confirmText: '',
      };
   },
   methods: {
      clear() {
         this.confirmText = '';
      },
   },
};
</script>
