<template>
   <div class="modal fade" id="exportModal">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title">Экспортировать персонажа</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
               <textarea :value="exportStr()" class="form-control" readonly rows="10" />
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-primary" v-on:click="copy">
                  Скопировать
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
   name: "export-modal",
   props: {
      character: Character,
   },
   methods: {
      exportStr: function() {
         return this.encoder.encode64(this.character);
      },
      copy: function() {
         const string = this.exportStr();
         document.addEventListener("copy", (event) => {
            event.clipboardData.setData("text/plain", string);
            event.preventDefault();
            document.removeEventListener("copy", this.event);
         });
         document.execCommand("copy");
      },
   },
   created() {
      this.encoder = new Encoder();
   },
};
</script>
