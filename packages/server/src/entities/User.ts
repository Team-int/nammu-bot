import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Index()
  @Column({ type: 'varchar', nullable: false })
  email: string

  @Column({ type: 'varchar', nullable: false })
  locale: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string

  @Column({ type: 'varchar', nullable: false })
  discriminator: string

  @Column({ type: 'boolean', default: false })
  verified: boolean
}
