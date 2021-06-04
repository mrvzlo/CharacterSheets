<template>
   <div class="text-center bg-white py-2">
      <div class="my-3">
         Редактирование персонажа
         <div class="btn-group d-block" v-on:click="lock">
            <div class="btn btn-warning">
               <i :class="'fas fa-fw ' + (character.settings.locked ? 'fa-unlock' : 'fa-lock')"></i>
            </div>
            <div class="btn border-warning col-6">
               {{ character.settings.locked ? "Разблокировать" : "Заблокировать" }}
            </div>
            <div class="btn btn-warning"><i class="fa-fw fas">&nbsp;</i></div>
         </div>
      </div>
      <div class="my-3">
         Автосохранения (каждые {{ character.settings.autoSavesInterval / 60000 }} минут)
         <div class="btn-group d-block" v-on:click="toggleAutoSave">
            <div class="btn btn-info">
               <i :class="'fas fa-fw ' + (!character.settings.autoSavesEnabled ? 'fa-play-circle' : 'fa-stop-circle')"></i>
            </div>
            <div class="btn border-info col-6">
               {{ !character.settings.autoSavesEnabled ? "Включить" : "Отключить" }}
            </div>
            <div class="btn btn-info"><i class="fa-fw fas">&nbsp;</i></div>
         </div>
      </div>
      <div class="my-5"></div>
      <div class="btn-group d-block my-3" data-bs-toggle="modal" data-bs-target="#saveModal">
         <div class="btn btn-success">
            <i class="fas fa-fw fa-save"></i>
         </div>
         <div class="btn border-success col-6">
            Сохранения
         </div>
         <div class="btn btn-success"><i class="fa-fw fas">&nbsp;</i></div>
      </div>
      <div class="btn-group d-block my-3" data-bs-toggle="modal" data-bs-target="#reloadModal">
         <div class="btn btn-danger">
            <i class="fas fa-fw fa-redo"></i>
         </div>
         <div class="btn border-danger col-6">
            Загрузка
         </div>
         <div class="btn btn-danger"><i class="fa-fw fas">&nbsp;</i></div>
      </div>
      <div class="btn-group d-block my-3" data-bs-toggle="modal" data-bs-target="#importModal">
         <div class="btn btn-info">
            <i class="fas fa-fw fa-download"></i>
         </div>
         <div class="btn border-info col-6">
            Импорт строки
         </div>
         <div class="btn btn-info"><i class="fa-fw fas">&nbsp;</i></div>
      </div>
      <div class="btn-group d-block my-3" data-bs-toggle="modal" data-bs-target="#exportModal">
         <div class="btn btn-info">
            <i class="fas fa-fw fa-upload"></i>
         </div>
         <div class="btn border-info col-6">
            Экспорт строки
         </div>
         <div class="btn btn-info"><i class="fa-fw fas">&nbsp;</i></div>
      </div>
   </div>
   <export-modal :character="character" />
   <save-modal :character="character" :saveService="saveService" />
   <import-modal />
   <reload-modal :saveService="saveService" />
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
      character: Character,
      saveService: SaveService,
   },
   methods: {
      lock: function() {
         Object.assign(this.character.settings, { locked: !this.character.settings.locked });
      },
      toggleAutoSave: function() {
         Object.assign(this.character.settings, { autoSavesEnabled: !this.character.settings.autoSavesEnabled });
      },
      importCharacter: function(a, b) {
         return this.$parent.importCharacter(a, b);
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
