<template>
   <div class="text-center my-4">
      <div>
         Редактирование персонажа
         <div class="btn-group d-block" v-on:click="lock">
            <div class="btn btn-primary">
               <i :class="'fas fa-fw ' + (character.settings.locked ? 'fa-unlock' : 'fa-lock')"></i>
            </div>
            <div class="btn btn-outline border-primary col-6">
               {{ character.settings.locked ? 'Разблокировать' : 'Заблокировать' }}
            </div>
            <div class="btn btn-primary"><i class="fa-fw fas">&nbsp;</i></div>
         </div>
      </div>
      <div class="btn-group d-block my-4" v-on:click="toggleTheme">
         <div class="btn btn-primary">
            <i class="fas fa-fw fa-palette"></i>
         </div>
         <div class="btn btn-outline border-primary col-6">
            {{ themeSwitch.isDark ? 'Светлая тема' : 'Тёмная тема' }}
         </div>
         <div class="btn btn-primary"><i class="fa-fw fas">&nbsp;</i></div>
      </div>
      <div class="btn-group d-block my-4" v-on:click="toStart">
         <div class="btn btn-primary">
            <i class="fas fa-fw fa-sync"></i>
         </div>
         <div class="btn btn-outline border-primary col-6">
            Сменить персонажа
         </div>
         <div class="btn btn-primary"><i class="fa-fw fas">&nbsp;</i></div>
      </div>
      <a class="btn-group d-block my-4" href="https://vk.com/andrejevve" target="_blank">
         <div class="btn btn-primary">
            <i class="fab fa-fw fa-vk"></i>
         </div>
         <div class="btn btn-outline border-primary col-6">
            Обратная связь
         </div>
         <div class="btn btn-primary"><i class="fa-fw fas">&nbsp;</i></div>
      </a>
   </div>
</template>

<script>
import Character from '@/models/character';
import ThemeSwitch from '@/helpers/theme-switch';

export default {
   name: 'settings',
   props: {
      character: Character,
      themeSwitch: ThemeSwitch,
   },
   methods: {
      lock: function() {
         Object.assign(this.character.settings, { locked: !this.character.settings.locked });
      },
      importCharacter: function(a, b) {
         return this.$parent.importCharacter(a, b);
      },
      toggleTheme() {
         this.themeSwitch.toggleTheme();
      },
      toStart() {
         this.$parent.toStart();
      },
   },
};
</script>
