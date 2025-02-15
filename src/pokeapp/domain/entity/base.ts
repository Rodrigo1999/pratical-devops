import { Id } from "@shared/domain/vo";

export default abstract class EntityBase<T> implements Shared.IEntity<T>{
    Id;
    created_at;
    updated_at;

    constructor(data: Shared.IEntityDTO){
        this.Id = new Id(data.id)
        this.created_at = data.created_at
        this.updated_at = data.updated_at
    }

    getId() {
        return this.Id.value
    }

}