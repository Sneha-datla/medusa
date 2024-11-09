import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  import bcrypt from "bcryptjs";
  
  @Entity()
  export class Vendor {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string;
  
    @Column()
    name: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    async setPassword(password: string) {
      this.password = await bcrypt.hash(password, 10);
    }
  
    async comparePassword(password: string) {
      return bcrypt.compare(password, this.password);
    }
  }
  