import bcrypt from "bcryptjs";
import { DataTypes, Optional, Transaction } from "sequelize";
import { Column, IsUUID, PrimaryKey, Table, Model } from "sequelize-typescript";

export interface IUser {
  id?: string;
  isActive?: boolean;
  email?: string;
  phone?: string;
  lastName?: string | null;
  firstName?: string | null;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  registerNo?: string;
  sessionId?: string | null;
  validatePassword?: (password: string) => Promise<boolean>;
  createPassword?: (password: string) => Promise<string>;
}

type Attributes = Optional<IUser, "id">;

@Table({ tableName: "user", timestamps: true, paranoid: true })
export class User extends Model<IUser, Attributes>{
  static findOne(arg0: { where: { email: string; }; transaction: Transaction; }) {
    throw new Error("Method not implemented.");
  }
  save(arg0: { transaction: Transaction; }) {
    throw new Error("Method not implemented.");
  }
  @IsUUID(4)
  @PrimaryKey
  @Column({ field: "id", defaultValue: DataTypes.UUIDV4, type: DataTypes.UUIDV4 })
  declare id: string;

  @Column({ field: "created_at", type: DataTypes.DATE })
  declare createdAt: Date;

  @Column({ field: "updated_at", type: DataTypes.DATE })
  declare updatedAt: Date;
  
  @Column({ field: "is_active", type: DataTypes.BOOLEAN, defaultValue: true })
  declare isActive: boolean;

  @Column({ field: "email", type: DataTypes.STRING })
  declare email: string;

  @Column({ field: "username", type: DataTypes.STRING })
  declare username: string;


  @Column({ field: "session_id" })
  declare sessionId: string;

  @Column({ field: "phone", type: DataTypes.STRING })
  declare phone: string;

  @Column({ field: "last_name", type: DataTypes.STRING })
  declare lastName: string;

  @Column({ field: "first_name", type: DataTypes.STRING })
  declare firstName: string;
  
  @Column({ field: "password", type: DataTypes.STRING })
  declare password: string;
  
  async updatePassword (password: string){
    this.password = `some encrypts...${password}`;

    await this.save();
  }

  async validatePassword (password: string){
    if (!this.password) return false;
    const valid = await bcrypt.compare(password, this.password);

    return valid;
  }

  async createPassword (password: string){
    const SALT_ROUNDS = 10;

    const newPassword = await bcrypt.hash(password, SALT_ROUNDS);

    this.password = newPassword;

    return newPassword;
  }
}