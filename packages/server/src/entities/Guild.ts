import { Exclude } from 'class-transformer'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { GuildMetadata } from './GuildMetadata'
import { Messages } from './Messages'
import { User } from './User'

@Entity('guilds')
export class Guild extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column({ type: 'boolean', default: true })
  joined: boolean

  @Exclude()
  @Column({ type: 'uuid' })
  fk_owner_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'fk_owner_id' })
  owner: User

  @ManyToMany(() => User)
  users: User[]

  @Index()
  @Column({ type: 'varchar', nullable: false })
  name: string

  @OneToOne(() => GuildMetadata, (meta) => meta.guild)
  metadata: GuildMetadata

  @OneToMany(() => Messages, (messages) => messages.guild)
  messages: Messages[]

  @UpdateDateColumn()
  updated_at: Date

  @CreateDateColumn()
  created_at: Date
}
