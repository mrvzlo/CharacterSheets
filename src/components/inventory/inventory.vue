<template>
   <div class="col-12 col-md-6 my-2" v-for="(container, index) in character.inventory" v-bind:key="index">
      <container :character="character" :container="container" :index="index" />
   </div>
   <div>
      <button class="btn btn-success m-2" v-on:click="addContainer">
         <i class="fas fa-plus-circle me-2"></i>
         Добавить хранилище
      </button>
   </div>
</template>

<script>
import Character from "../../models/character";
import ContainerComponent from "./container";

export default {
   name: "inventory",
   props: {
      character: Character,
   },
   data() {
      return {};
   },
   methods: {
      getData() {},
      addContainer() {
         this.character.addContainer();
      },
   },
   watch: {
      character: {
         handler() {
            this.getData();
         },
         deep: true,
         immediate: true,
      },
   },
   components: {
      container: ContainerComponent,
   },
};
</script>
