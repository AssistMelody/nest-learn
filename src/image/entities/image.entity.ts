import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ImageStatus {
  PENDING = 0,
  RESOLVE = 1,
  REJECTED = 2,
}

@Entity({ name: 'image' })
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '邮件Id',
  })
  emailId: number;

  @Column({
    type: 'enum',
    enum: ImageStatus,
    comment: '生成状态',
    default: ImageStatus.PENDING,
  })
  imageStatus: number;

  @Column({
    comment: '链接地址',
    nullable: true,
  })
  link: string;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updateDate: Date;
}
