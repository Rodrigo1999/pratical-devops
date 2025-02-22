import type Id from '@shared/domain/VO/id'

declare global{
    declare namespace Shared{
        interface IEntity<T>{
            Id: Id
            created_at: Date
            updated_at: Date
            getId(): ReturnType<Id['value']>
        }
        
        interface IEntityDTO{
            id: string
            created_at: Date
            updated_at: Date
        }
    }
}