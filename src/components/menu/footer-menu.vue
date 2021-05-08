<template>
   <div class="text-center bg-white py-2">
      <div class="btn-group d-block my-3" v-on:click="lock">
         <div class="btn btn-warning">
            <i :class="'fas fa-fw ' + (locked ? 'fa-unlock' : 'fa-lock')"></i>
         </div>
         <div class="btn border-warning col-6">
            {{ locked ? "Разблокировать" : "Заблокировать" }}
         </div>
      </div>
      <div class="btn-group d-block my-3" data-bs-toggle="modal" data-bs-target="#saveModal">
         <div class="btn btn-success">
            <i class="fas fa-fw fa-save"></i>
         </div>
         <div class="btn border-success col-6">
            Сохранения
         </div>
      </div>
      <div class="btn-group d-block my-3" data-bs-toggle="modal" data-bs-target="#reloadModal">
         <div class="btn btn-danger">
            <i class="fas fa-fw fa-redo"></i>
         </div>
         <div class="btn border-danger col-6">
            Загрузка
         </div>
      </div>
      <div class="btn-group d-block my-3" data-bs-toggle="modal" data-bs-target="#importModal">
         <div class="btn btn-primary">
            <i class="fas fa-fw fa-download"></i>
         </div>
         <div class="btn border-primary col-6">
            Импорт строки
         </div>
      </div>
      <div class="btn-group d-block my-3" data-bs-toggle="modal" data-bs-target="#exportModal">
         <div class="btn btn-primary">
            <i class="fas fa-fw fa-upload"></i>
         </div>
         <div class="btn border-primary col-6">
            Экспорт строки
         </div>
      </div>
   </div>
   <export-modal :character="character" />
   <save-modal :character="character" :saveService="saveService" />
   <import-modal />
   <reload-modal />
</template>

<script>
import Character from "@/models/character";
import ExportModalComponent from "./export-modal.vue";
import ImportModalComponent from "./import-modal.vue";
import ReloadModalComponent from "./reload-modal.vue";
import SaveModalComponent from "./save-modal.vue";
import SaveService from "@/models/saving/save-service";

export default {
   name: "footer-menu",
   props: {
      locked: { type: Boolean },
      character: Character,
      saveService: SaveService,
   },
   methods: {
      lock: function() {
         return this.$parent.lock();
      },
      importCharacter: function(a, b) {
         return this.$parent.importCharacter(a, b);
      },
      loadSave() {
         return this.$parent.loadSave();
      },
      applySave(newSave) {
         return this.$parent.applySave(newSave);
      },
      hasSave() {
         return this.$parent.hasSave();
      },
   },
   components: {
      exportModal: ExportModalComponent,
      importModal: ImportModalComponent,
      reloadModal: ReloadModalComponent,
      saveModal: SaveModalComponent,
   },
};
</script>
