import { tasks } from "./datasources/data";

export const resolvers = {
  Query: {
    getTasksList: (parent, args, context, info) => {
      try {
        return context.dataSources.dataQueries.getAllTasks();
      } catch (err) {
        return err.stack
      }
    },
    getTaskByKey: (parent, args, context, info) => {
      try {
        const { key } = args;
        return context.dataSources.dataQueries.getTaskByKey(key);
      } catch (error) {
        return error.stack;
      }
    },
  },
  Mutation: {
    createTask: async (parent, args, context, info) => {
      try {
        const { task, startdate, enddate } = args;
        const result = await context.dataSources.dataQueries.createTask(task, startdate, enddate);
        if (result.length == 0) {
          return await context.dataSources.dataQueries.getAllTasks();
        }
        else {
          return [];
        }
      } catch (error) {
        throw error
      }
    },
    removeTask: async (parent, args, context, info) => {
      try {
        const { tno } = args;
        const result = await context.dataSources.dataQueries.removeTask(tno);
        if (result.length == 0) {
          return await context.dataSources.dataQueries.getAllTasks();
        }
        else {
          return [];
        }
      } catch (error) {
        throw error
      }
    },
    updateTask: async (parent, args, context, info) => {
      try {
        console.log(args)
        const { tno, task, startdate, enddate, deleted, done } = args;
        const result = await context.dataSources.dataQueries.updateTask(tno, task, startdate, enddate, deleted, done );
        if (result.length == 0) {
          return await context.dataSources.dataQueries.getAllTasks();
        }
        else {
          return [];
        }
      } catch (error) {
        throw error
      }
    },
  }
};