<template>
  <div id="app">
    <Header />
    <Test />
  </div>
</template>

<script>
import Test from './components/Test.vue';
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Test,
    Header,
  },
};
</script>

<style>
body {
  background-color: #e7e8e9;
  color: #0b1223;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #0b1223;
  margin-top: 60px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #e7e8e9;
}
</style>
