<script>
  import { fade, fly, slide, scale } from "svelte/transition";
  import { Confirm } from "svelte-confirm";
    import { createEventDispatcher } from "svelte";
  export let item;
  export let i;
  const dispatch = createEventDispatcher();
  const timestampMs = Number(item.enddate);
  const date = new Date(timestampMs);
  const formattedEndDate = `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${(date.getFullYear() % 100)
    .toString()
    .padStart(2, "0")}`;
  const timeDifference = Math.abs(item.enddate - item.startdate);
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const remainingMilliseconds = timeDifference % (1000 * 60 * 60 * 24);
  const hours = Math.floor(remainingMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(
    (remainingMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((remainingMilliseconds % (1000 * 60)) / 1000);

  // Output the result
  // var timeFunc = setInterval(function () {
  //   now = new Date().getTime();
  //   timeLeft = countDownDate - now;
  //   days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  //   hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   console.log(days);
  // }, 1000);
  // timeFunc;
  const removeTask = (tno) =>{
    dispatch("removeTask",tno)
  }
</script>

<Confirm let:confirm={confirmThis}>
  <div class="task" transition:fly={{ x: 200, y: 0 }}>
    <div class="task-wrap">
      <input bind:checked={item.completed} type="checkbox" on:change={()=>{console.log(item.done)}}/>
      <span class:checked={item.completed}>{item.task}</span>
    </div>
    <div class="twoItems">
      {#if days < 0 || hours < 0}
        <span style="color:red;">Time Up</span>
      {:else}
        <span>{days} {days > 0 ? "Days" : "Day"}</span>
      {/if}
      <span class="dateTag">{formattedEndDate}</span>
      <i
        class="fa fa-trash fa-2x"
        on:click={() => confirmThis(removeTask, item.tno)}
      />
    </div>
  </div>
</Confirm>
