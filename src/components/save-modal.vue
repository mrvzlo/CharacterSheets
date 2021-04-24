<template>
   <div class="modal fade" id="saveModal">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title">Сохранить персонажа</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
               <div>Сохранить персонажа?</div>
               <div v-if="hasSave()">Текущее сохранение будет перезаписано</div>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-success" v-on:click="save" data-bs-dismiss="modal">
                  Сохранить
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
import Encoder from "../models/encoder";

export default {
   name: "save-modal",
   props: {
      character: Character,
   },
   methods: {
      hasSave: function() {
         return this.$parent.hasSave();
      },
      save: function() {
         var encoder = new Encoder();
         this.$parent.save = encoder.encode256(this.character);
         this.$parent.applySave();
      },
   },
};
</script>
