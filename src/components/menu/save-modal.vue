<template>
   <div class="modal fade" id="saveModal">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title">Сохранить персонажа</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body py-0">
               <div class="mt-3 text-center">Автосохранение</div>
               <div class="my-3 d-flex rounded position-relative">
                  <div
                     :class="'rounded border p-1 flex-grow-1 ' + (selected == 0 ? 'bg-dark text-white' : '')"
                     v-on:click="selected = selected == 0 ? -1 : 0"
                  >
                     {{ savedName(0) }}
                  </div>
               </div>
               <div class="mt-3 text-center">Слоты сохранений</div>
               <div v-for="index in 3" :key="index" class="my-3 d-flex rounded position-relative">
                  <div
                     :class="'rounded border p-1 flex-grow-1 ' + (index == selected ? 'bg-dark text-white' : '')"
                     v-on:click="selected = selected == index ? -1 : index"
                  >
                     {{ index }} - {{ savedName(index) }}
                  </div>
                  <button
                     type="button"
                     class="btn btn-danger position-absolute end-0 bottom-0 top-0 border-dark"
                     v-on:click="deleteSave(index)"
                     v-if="hasSave(index)"
                  >
                     <i class="fas fa-times"></i>
                  </button>
               </div>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-success" v-on:click="save" v-if="selected >= 0">
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
import SaveService from "@/models/saving/save-service";
import Character from "@/models/character";

export default {
   name: "save-modal",
   props: {
      character: Character,
      saveService: SaveService,
   },
   data() {
      return {
         selected: Number,
      };
   },
   methods: {
      hasSave: function(id) {
         return this.saveService.hasSave(id);
      },
      save: function() {
         this.saveService.applySave(this.character, this.selected);
         this.selected = -1;
      },
      deleteSave: function(id) {
         this.saveService.deleteSave(id);
         this.selected = -1;
      },
      savedName: function(id) {
         return this.saveService.savedName(id);
      },
   },
   created() {
      this.selected = -1;
   },
};
</script>
