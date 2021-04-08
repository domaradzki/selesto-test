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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 600px;
  margin: 0 auto;
}
</style>
