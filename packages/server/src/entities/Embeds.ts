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

  @Column({ type: 'uuid' })
  fk_guild_id: string

  @ManyToOne(() => Guild, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_guild_id' })
  guild: Guild

  @OneToOne(() => EmbedMetadata, (meta) => meta.embed)
  metadata: EmbedMetadata

  @DeleteDateColumn()
  deleted_at: Date
}
