import gql from "graphql-tag";

export const typeDefs = gql`
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
