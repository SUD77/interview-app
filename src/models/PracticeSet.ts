import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import { User } from "./User";

interface PracticeSetAttributes {
  id: number;
  title: string;
  description: string;
  difficultyLevel: string;
  createdBy: number; // user id
  createdAt?: Date;
}

interface PracticeSetCreationAttributes extends Optional<PracticeSetAttributes, "id" | "createdAt"> {}

export class PracticeSet extends Model<PracticeSetAttributes, PracticeSetCreationAttributes>
  implements PracticeSetAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public difficultyLevel!: string;
  public createdBy!: number;
  public readonly createdAt!: Date;
}

PracticeSet.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    difficultyLevel: { type: DataTypes.STRING, allowNull: false },
    createdBy: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  { sequelize, modelName: "PracticeSet", tableName: "practice_sets", timestamps: false }
);

// Set up association
PracticeSet.belongsTo(User, { foreignKey: "createdBy" });
User.hasMany(PracticeSet, { foreignKey: "createdBy" });
