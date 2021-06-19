import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Index()
  @Column({ type: 'varchar', nullable: true })
  email: string

  @Column({ type: 'varchar', nullable: true })
  locale: string

  @Column({ type: 'varchar', nullable: true, unique: true })
  username: string

  @Column({ type: 'varchar', nullable: true })
  discriminator: string

  @Column({ type: 'boolean', default: false })
  verified: boolean

  @Column({ type: 'boolean', nullable: true, default: false })
  developer: boolean
}
