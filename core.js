var app = new Vue({
    el: '#app',
    data: {
      locked: false,
      character: Object
    },
    methods:{
      lock: function(){
        this.locked = !this.locked;
      }      
    }
  })

  app.$data.character = character();

function character(){
  return {
    name: 'Имя персонажа',
    level: 1
  }
}