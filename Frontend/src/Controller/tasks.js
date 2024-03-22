import { createTask, getAllTasks, removeTask } from "../Services/tasks";

class Tasks {
    async getTasks() {
        const data = getAllTasks();
        if (data.length !== 0) {
            return data;
        }
        else {
            throw "No Data Found";
        }
    }
    async createTask(param){
        const data = createTask(param);
        if (data.length !== 0) {
            return data;
        }
        else {
            throw "No Data Found";
        }
    }
    async removeTask(tNo){
        const data = removeTask(tNo);
        if (data.length !== 0) {
            return data;
        }
        else {
            throw "No Data Found";
        }
    }
}

export default Tasks;