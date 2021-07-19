import { Exclude } from 'class-transformer'
import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { EmbedMetadata } from './EmbedMetadata'
import { Guild } from './Guild'

@Entity('embeds')
export class Embeds extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Exclude()
  @Column({ type: 'uuid' })
  fk_guild_id: string

  @ManyToOne(() => Guild, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_guild_id' })
  guild: Guild

  @Column({ type: 'varchar', length: 10 })
  name: string

  @OneToOne(() => EmbedMetadata, (meta) => meta.embed)
  metadata: EmbedMetadata

  @DeleteDateColumn()
  deleted_at: Date
}
