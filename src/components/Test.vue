<template>
  <div class="wrapper">
    <p class="header">Zadanie:</p>
    <p>Korzystając z przygotowanego środowiska, zaprogramuj aplikację do wrzucania plików na serwer.</p>
    <p>Aplikacja ma oferować dwie funkcje:</p>
    <ul>
       <li>Wrzucanie wybranego z dysku pliku do folderu na serwerze</li>
       <li>Lista plików w folderze</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Test',
  data() {
      return {
        info: null,
      };
    },
    created: function() {
      axios
        .get('/api/info')
        .then(res => {
          this.info = res.data.msg;
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
    padding: 20px;
}
.header {
  font-weight: bold;
}
</style>
