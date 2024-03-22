"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.typeDefs = (0, graphql_tag_1.default) `
type Tasks {
    tno: Int 
    task: String
    done: Boolean
    deleted: Boolean
    startdate: String
    enddate:String
  }
  type Query {
    getTasksList: [Tasks]
    getTaskByKey(key: String!): Tasks
  }
  type Mutation {
        createTask(task: String!, startdate: String!, enddate:String!): [Tasks]!
        removeTask(tno:Int!):[Tasks]
        updateTask(tno:Int!, task: String!, startdate: String!, enddate:String!,deleted:Boolean!, done:Boolean!):[Tasks]
    }
  `;
