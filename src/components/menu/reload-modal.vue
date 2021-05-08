<template>
   <div class="modal fade" id="reloadModal">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title">Сбросить персонажа</h5>
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
               </div>
               <div class="mt-4 mb-3 d-flex rounded position-relative">
                  <div
                     :class="'rounded border p-1 flex-grow-1 ' + (selected == 10 ? 'bg-dark text-white' : '')"
                     v-on:click="selected = selected == 10 ? -1 : 10"
                  >
                     Новый персонаж
                  </div>
               </div>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-danger" data-bs-dismiss="modal" v-on:click="load" v-if="selected >= 0">
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
import SaveService from "@/models/saving/save-service";
export default {
   name: "reload-modal",
   props: {
      saveService: SaveService,
   },
   data() {
      return {
         importData: "",
         selected: Number,
      };
   },
   methods: {
      hasSave: function(id) {
         return this.saveService.hasSave(id);
      },
      load: function() {
         if (this.selected == 10) {
            return this.clearSave();
         }
         var data = this.saveService.getSave(this.selected).value;
         this.$parent.importCharacter(data, 256);
      },
      clearSave: function() {
         this.$parent.importCharacter(null, 0);
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
