import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import { Question } from "./Question";

interface OptionAttributes {
  id: number;
  questionId: number;
  optionText: string;
  isCorrect: boolean;
}

interface OptionCreationAttributes extends Optional<OptionAttributes, "id"> {}

export class Option extends Model<OptionAttributes, OptionCreationAttributes>
  implements OptionAttributes {
  public id!: number;
  public questionId!: number;
  public optionText!: string;
  public isCorrect!: boolean;
}

Option.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    questionId: { type: DataTypes.INTEGER, allowNull: false },
    optionText: { type: DataTypes.TEXT, allowNull: false },
    isCorrect: { type: DataTypes.BOOLEAN, allowNull: false }
  },
  { sequelize, modelName: "Option", tableName: "options", timestamps: false }
);

// Set up association
Option.belongsTo(Question, { foreignKey: "questionId" });
Question.hasMany(Option, { foreignKey: "questionId" });
