var app = new Vue({
    el: '#app',
    data: {
      locked: false,
      character: Character
    },
    methods:{
      lock: function(){this.locked = !this.locked;},     
      inspiration: function(){this.character.inspiration = !this.character.inspiration;}
    },
    created() {
      this.character = new Character();
    }  
  })

