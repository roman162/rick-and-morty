<template>
  <div class="container">
    <img src="/not-found.png" alt="" class="image">
    <div class="text">
      No results were found for your request
    </div>
  </div>
</template>

<style scoped lang="scss">
  .container{
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px;
    .image{
      max-width: 100%;
    }
    .text{
      text-align: center;
      color: $surfaceDisabled;
    }
  }
</style>