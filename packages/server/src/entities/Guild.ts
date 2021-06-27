import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'

@Entity('guilds')
export class Guild extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column({ type: 'boolean', default: true })
  joined: boolean

  @Column({ type: 'varchar', nullable: false })
  owner_id: string

  @Index()
  @Column({ type: 'varchar', nullable: false })
  name: string
}
