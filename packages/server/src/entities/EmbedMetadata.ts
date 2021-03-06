import { Exclude } from 'class-transformer'
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Embeds } from './Embeds'

export interface EmbedData {
  title?: string
  color?: string
  description?: string
  author?: boolean
  footer?: string
  thumbnail?: string
  url?: string
  timestamp?: boolean
  image?: string
}

@Entity('embed_metadata')
export class EmbedMetadata extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Exclude()
  @Column({ type: 'uuid' })
  fk_embed_id: string

  @OneToOne(() => Embeds, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_embed_id' })
  embed: Embeds

  @Column({ type: 'varchar', nullable: true })
  title: string

  @Column({ type: 'varchar', default: 'fff', length: 6 })
  color: string

  @Column({ type: 'varchar', nullable: true })
  description: string

  @Column({ type: 'boolean', default: false })
  author: boolean

  @Column({ type: 'varchar', nullable: true })
  footer: string

  @Column({ type: 'varchar', nullable: true })
  thumbnail: string

  @Column({ type: 'varchar', nullable: true })
  url: string

  @Column({ type: 'boolean', default: false })
  timestamp: boolean

  @Column({ type: 'varchar', nullable: true })
  image: string
}
