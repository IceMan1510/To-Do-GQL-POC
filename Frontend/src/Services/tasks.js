import axios from "axios";

export const getAllTasks = async () => {
  try {
    const res = await axios.post('http://localhost:4000/gql', {
      query: `
          query {
            getTasksList {
              task
              deleted
              startdate
              done
              enddate
              tno
            }
          }
        `
    });
    if (res.status == 200) {
      return res.data;
    }
    else {
      throw "Data not found"
    }
  } catch (err) {
    console.log(err);
  }
};

export const removeTask = async (tNo) => {
  try {
    const res = await axios.post('http://localhost:4000/gql', {
      query: `
      mutation removeTask($tno: Int!) {
        removeTask(tno: $tno) {
          tno
          task
          done
          enddate
          startdate
        }
      }`,
      variables: {
        tno: Number(tNo)
      }
    });
    if (res.status == 200) {
      return res.data;
    }
    else {
      throw "Data not found"
    }
  } catch (err) {
    console.log(err);
  }
};

export const createTask = async (param) => {
  try {
    const res = await axios.post('http://localhost:4000/gql', {
      query: `
          mutation CreateTask($task: String!, $startdate: String!, $enddate: String!) {
            createTask(task: $task, startdate: $startdate, enddate: $enddate) {
              tno
              task
              done
              enddate
              startdate
            }
          }
          `,
      variables: {
        task: param.task,
        startdate: param.startdate,
        enddate: param.enddate
      }
    });
    if (res.status == 200) {
      return res.data;
    }
    else {
      throw "Data not found"
    }
  } catch (err) {
    console.log(err);
  }
};