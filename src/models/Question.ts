import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import { PracticeSet } from "./PracticeSet";

interface QuestionAttributes {
  id: number;
  setId: number;
  questionText: string;
  questionType: "SINGLE_CORRECT" | "MULTIPLE_CORRECT";
  explanation: string;
  createdAt?: Date;
}

interface QuestionCreationAttributes extends Optional<QuestionAttributes, "id" | "createdAt"> {}

export class Question extends Model<QuestionAttributes, QuestionCreationAttributes>
  implements QuestionAttributes {
  public id!: number;
  public setId!: number;
  public questionText!: string;
  public questionType!: "SINGLE_CORRECT" | "MULTIPLE_CORRECT";
  public explanation!: string;
  public readonly createdAt!: Date;
}

Question.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    setId: { type: DataTypes.INTEGER, allowNull: false },
    questionText: { type: DataTypes.TEXT, allowNull: false },
    questionType: { type: DataTypes.ENUM("SINGLE_CORRECT", "MULTIPLE_CORRECT"), allowNull: false },
    explanation: { type: DataTypes.TEXT, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  { sequelize, modelName: "Question", tableName: "questions", timestamps: false }
);

// Set up association
Question.belongsTo(PracticeSet, { foreignKey: "setId" });
PracticeSet.hasMany(Question, { foreignKey: "setId" });
