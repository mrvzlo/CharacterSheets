var app = new Vue({
    el: '#app',
    data: {
      locked: false,
      character: Character,
      checkTypes: CheckTypes,
      importData: ""
    },
    methods:{
      lock: function(){this.locked = !this.locked;},     
      inspiration: function(){this.character.inspiration = !this.character.inspiration;},
      importStr: function(){this.character.import(this.importData)},
      copy: function(){}
    },
    created() {
      this.character = new Character();
    }  
  })