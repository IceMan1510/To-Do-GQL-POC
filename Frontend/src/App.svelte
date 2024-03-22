<script>
  import AddToDo from "./UI/addToDo.svelte";
  import Tasks from "./Controller/tasks";
  import { onMount } from "svelte";
  let todoLists = [];
  const tasks = new Tasks();
  const getAllTasks = async () => {
    const response = await tasks.getTasks();
    if (response) {
      todoLists = response.data.getTasksList;
    } else {
      console.log(response);
    }
  };
  onMount(async () => {
    getAllTasks();
  });
</script>

<main>
  <AddToDo {todoLists} />
</main>
