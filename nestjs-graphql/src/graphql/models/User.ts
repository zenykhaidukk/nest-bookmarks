import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserSettings } from './UserSettings';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  username: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  @OneToOne(() => UserSettings)
  @JoinColumn()
  settings?: UserSettings;
}
