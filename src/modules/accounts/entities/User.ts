import { v4 as uuidV4 } from 'uuid'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('users')
class User {

    @PrimaryColumn()
    id: String

    @Column()
    name: String

    @Column()
    username: String

    @Column()
    password: String

    @Column()
    driver_license: String

    @Column()
    is_admin: Boolean

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }
}

export { User }