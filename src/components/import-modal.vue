<template>
   <div class="modal fade" id="importModal">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title">Загрузить сохранение</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
               <textarea v-model="importData" class="form-control" rows="10" />
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-primary" v-on:click="importStr" data-bs-dismiss="modal">
                  Загрузить
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
import Character from "../models/character";

export default {
   name: "import-modal",
   props: {
      character: Character,
   },
   data() {
      return {
         importData: "",
      };
   },
   methods: {
      importStr: function() {
         return this.$parent.importCharacter(this.importData, 64);
      },
   },
};
</script>
