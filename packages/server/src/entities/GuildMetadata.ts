import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Guild } from './Guild'

@Entity('guild_metadata')
export class GuildMetadata extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Index()
  @Column({ type: 'varchar', nullable: true })
  announce_channel: string

  @Index()
  @Column({ type: 'varchar', nullable: true })
  welcome_channel: string

  @Index()
  @Column({ type: 'varchar', nullable: true })
  goodbye_channel: string

  @Index()
  @Column({ type: 'varchar', nullable: true })
  nitro_channel: string

  @Column({ type: 'varchar' })
  fk_guild_id: string

  @OneToOne(() => Guild, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_guild_id' })
  guild: Guild
}
