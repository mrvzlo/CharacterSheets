<template>
   <div class="modal fade" id="reloadModal">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title">Сбросить персонажа</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
               <div>Вы хотите сбросить текущие настройки?</div>
               <div v-if="hasSave()">
                  Будет загружено последнее сохранение<br />
                  <span v-on:click="clearSave" class="link-danger fw-bold">
                     Очистить
                     <i class="fas fa-trash"></i>
                  </span>
               </div>
               <div v-else>Сохранение отсутствует</div>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-danger" v-on:click="reload" data-bs-dismiss="modal">
                  Сбросить
               </button>
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  Закрыть
               </button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: "reload-modal",
   data() {
      return {
         importData: "",
      };
   },
   methods: {
      hasSave: function() {
         return this.$parent.hasSave();
      },
      reload: function() {
         this.$parent.loadSave();
      },
      clearSave: function() {
         this.$parent.save = null;
         this.$parent.applySave();
      },
   },
};
</script>
