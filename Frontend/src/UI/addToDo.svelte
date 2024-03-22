<script>
  import { onMount } from "svelte";
  import Blocks from "./Blocks/blocks.svelte";
  import Tasks from "../Controller/tasks";
  const TasksController = new Tasks();
  export let todoLists;
  let newToDo = "";
  let dueDate = new Date().toISOString().slice(0, 10); // Initialize dueDate with current date
  let block = "all";
  let searchDate = "";
  let completed = [];
  let incomplete = [];
  const addTask = async (param) => {
    const res = await TasksController.createTask(param);
    if (res) {
      console.log(res);
      todoLists = [];
      todoLists = res.data.createTask;
    } else {
      console.log("Something went wrong");
    }
  };
  const removeTask = async (e) => {
    console.log(e.detail)
    const res = await TasksController.removeTask(e.detail);
    if (res) {
      console.log(res);
      todoLists = [];
      console.log(res);
      todoLists = res.data.removeTask;
    } else {
      console.log("Something went wrong");
    }
  };

  onMount(() => {});
  const addTodo = () => {
    if (newToDo.trim().length > 0) {
      block = "all";
      let currentTodo = {
        task: newToDo,
        startdate: new Date().toISOString().slice(0, 10),
        enddate: dueDate,
      };
      addTask(currentTodo);
      newToDo = "";
      console.log(currentTodo);
    } else {
      return;
    }
  };
  // const removeItem = (index) => {
  //   console.log(index);
  //   index = index - 1;
  //   todoLists.splice(index, 1);
  //   todoLists = todoLists;
  //   console.log("Done");
  // };
</script>

<main>
  <div class="container">
    <h2>Just Do It</h2>
    <div class="fixed-bar">
      <input
        class="newToDo"
        placeholder="What Needs To Be Done ? + Enter"
        type="text"
        bind:value={newToDo}
        on:keypress={(e) => {
          if (e.key === "Enter") {
            addTodo();
          }
        }}
      />
      <input
        min={new Date().toISOString().slice(0, 10)}
        type="date"
        name=""
        class="date"
        bind:value={dueDate}
      />
    </div>
    {#if block === "all"}
      {#each todoLists as item}
        <Blocks {item} on:removeTask = {removeTask} />
      {/each}
    {:else if block === "incomplete"}
      {#each incomplete as item}
        <Blocks {item} />
      {/each}
    {:else if block === "completed"}
      {#each completed as item}
        <Blocks {item} />
      {/each}
    {:else if block === "date"}
      {#each date as item, i}
        <Blocks {item} {removeItem} {i} />
      {/each}
    {/if}

    {#if todoLists.length > 0}
      <div class="bottom-buttons">
        <button
          on:click={() => {
            block = "all";
          }}>All</button
        >
        <button
          on:click={() => {
            completed = todoLists.filter((todo) => todo.completed === true);
            block = "completed";
          }}>Completed</button
        >
        <button
          on:click={() => {
            incomplete = todoLists.filter((todo) => todo.completed === false);
            block = "incomplete";
          }}>Active</button
        >
        <input
          type="text"
          placeholder="Search By Date"
          onfocus="(this.type = `date`)"
          bind:value={searchDate}
          on:change={() => {
            date = todoLists.filter((todo) => todo.date === searchDate);
          }}
        />
      </div>
    {/if}
  </div>
</main>
