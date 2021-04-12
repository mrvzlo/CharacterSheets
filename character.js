class Character{
    constructor(){
        this.name = 'Имя персонажа';
        this.level = 1;
        this.inspiration = false;
        this.attributes = [];
        var attributes = ["S","A","E","I","W","C"];
        attributes.forEach(
            type => this.attributes.push(
                new Attribute(type)
            )
        );
    }

    proficiency(){
        return Math.floor((this.level-1)/4)+2
    }
}

class Attribute{
    constructor(type){
        this.type = type;
        this.value = 10;
    }

    bonus(){
        return Math.floor(this.value/2)-5;
    }
}