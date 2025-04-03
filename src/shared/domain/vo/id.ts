export default class Id{
    constructor(private readonly id: string){}

    get value(){
        return this.id
    }

    static generateId(){
        return "temp_"+Math.random().toString(32).substring(2)
    }

    isGenratedId(){
        return this.id.startsWith('temp_')
    }

    compare(id: string){
        return this.id === id
    }
}