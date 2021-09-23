<template>
   <div class="modal" tabindex="-1" @focus="clear()">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title">Подтвердите удаление</h5>
               <button type="button" class="btn btn-outline p-0" data-bs-dismiss="modal">
                  <i class="fas fa-times h2 m-0"></i>
               </button>
            </div>
            <div class="modal-body">
               <div class="text-break">Напишите слово <span class="text-danger">удалить</span> для подтверждения</div>
               <input type="text" class="text-lowercase form-control my-3" v-model="confirmText" />
               <div v-if="confirmText.toLowerCase() === 'удалить'" class="text-center">
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
