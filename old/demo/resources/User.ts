import { Entity, PrimaryGeneratedColumn, Column } from '../../old';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  age!: number;

  @Column({
    nullable: true,
  })
  desc?: string;
}
