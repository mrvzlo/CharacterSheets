class Character{
    constructor(){
        this.name = '';
        this.level = 1;
        this.inspiration = false;
        this.attributes = [];
        this.speed = 30;
        this.armor = 10;
        var attributes = ["СИЛ","ЛОВ","ТЕЛ","ИНТ","МУД","ХАР"];
        attributes.forEach(
            type => this.attributes.push(
                new Attribute(type)
            )
        );
        
        for(var i=0; i<6; i++)
            this.attributes[i].checks.push(new Check("Спасбросок", CheckTypes.Saving));

        this.attributes[0].checks.push(new Check("Атлетика", CheckTypes.Skill));
        this.attributes[1].checks.push(new Check("Акробатика", CheckTypes.Skill));
        this.attributes[1].checks.push(new Check("Ловкость рук", CheckTypes.Skill));
        this.attributes[1].checks.push(new Check("Скрытность", CheckTypes.Skill));
        this.attributes[3].checks.push(new Check("Анализ", CheckTypes.Skill));
        this.attributes[3].checks.push(new Check("История", CheckTypes.Skill));
        this.attributes[3].checks.push(new Check("Магия", CheckTypes.Skill));
        this.attributes[3].checks.push(new Check("Природа", CheckTypes.Skill));
        this.attributes[3].checks.push(new Check("Религия", CheckTypes.Skill));
        this.attributes[4].checks.push(new Check("Внимательность", CheckTypes.Skill));
        this.attributes[4].checks.push(new Check("Выживание", CheckTypes.Skill));
        this.attributes[4].checks.push(new Check("Медицина", CheckTypes.Skill));
        this.attributes[4].checks.push(new Check("Проницательность", CheckTypes.Skill));
        this.attributes[4].checks.push(new Check("Уход за животными", CheckTypes.Skill));
        this.attributes[5].checks.push(new Check("Выступление", CheckTypes.Skill));
        this.attributes[5].checks.push(new Check("Зпугивание", CheckTypes.Skill));
        this.attributes[5].checks.push(new Check("Обман", CheckTypes.Skill));
        this.attributes[5].checks.push(new Check("Убеждение", CheckTypes.Skill));
        this.attributes[1].checks.push(new Check("Инициатива", CheckTypes.Static));
    }

    proficiency(){
        return Math.floor((this.level-1)/4)+2
    }
}

class Attribute{
    constructor(name){
        this.name = name;
        this.value = 10;
        this.checks = [];
    }

    bonus(){
        return Math.floor(this.value/2)-5;
    }

    getChecks(type){
        return this.checks.filter(function(x) { return x.type === type; });
    }
}

class Check{
    constructor(name, type){
        this.name = name;
        this.type = type;
        this.knowledge = 0;
    }

    get(proficiency, value){
        return value + proficiency*this.knowledge;
    }

    inc(){
        this.knowledge = (this.knowledge+1) % 3;
    }

    level(){
        switch(this.knowledge){
            case 0: return 'far fa-circle';
            case 1: return 'fas fa-dot-circle';
            case 2: return 'fas fa-circle';
        }
    }
}

const CheckTypes = {
    Saving: 0,
    Skill: 1,
    Static: 2
}