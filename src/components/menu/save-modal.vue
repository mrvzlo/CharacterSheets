<template>
   <div class="modal fade" id="saveModal">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header text-center">
               <h5 class="modal-title">Сохранить персонажа</h5>
            </div>
            <div class="modal-body py-0">
               <div v-for="(_, index) in appConfig.saveSlots + 1" :key="index" class="my-3 d-flex rounded-row">
                  <div class="border bg-primary text-light px-2 py-1">{{ index == 0 ? "Авто" : index }}</div>
                  <div
                     :class="'border py-1 px-2 flex-grow-1 border-start-0 ' + (index == selected ? 'bg-primary text-white' : '')"
                     v-on:click="select(index)"
                  >
                     {{ savedName(index) }}
                     <span class="text-secondary float-end" v-if="hasSave(index)">{{ savedDate(index) }}</span>
                  </div>
               </div>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-danger" v-on:click="deleteSave" v-if="hasSave(selected)">
                  Удалить
               </button>
               <button type="button" class="btn btn-success" v-on:click="save" v-if="selected != appConfig.unselectedSave">
                  Сохранить
               </button>
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" v-on:click="selected = appConfig.unselectedSave">
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
import AppConfig from "@/app-config";

export default {
   name: "save-modal",
   props: {
      character: Character,
      saveService: SaveService,
   },
   data() {
      return {
         selected: Number,
         appConfig: AppConfig,
      };
   },
   methods: {
      select: function(num) {
         this.selected = this.selected == num ? -1 : num;
      },
      hasSave: function(id) {
         return this.saveService.hasSave(id);
      },
      save: function() {
         this.saveService.applySave(this.character, this.selected);
         this.selected = this.appConfig.unselectedSave;
      },
      deleteSave: function() {
         this.saveService.deleteSave(this.selected);
         this.selected = this.appConfig.unselectedSave;
      },
      savedName: function(id) {
         return this.saveService.savedName(id);
      },
      savedDate: function(id) {
         return this.saveService.dateFormat(id);
      },
   },
   created() {
      this.appConfig = new AppConfig();
      this.selected = this.appConfig.unselectedSave;
   },
};
</script>
