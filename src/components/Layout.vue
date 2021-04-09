<template>
  <div class="wrapper">
    <div class="container">
      <label
        >Wybierz plik
        <input
          type="file"
          id="file"
          name="file"
          ref="file"
          v-on:change="handleFileUpload()"
        />
      </label>
    </div>

    <br />
    <div class="container">
      <button v-on:click="submitFiles()">Zapisz</button>

      <button v-on:click="handleDisplayFiles()">
        Wczytaj pliki z serwera
      </button>
    </div>

    <div class="container">
      <div
        v-for="file in files"
        class="file-listing"
        v-bind:key="file.name"
      >
        <a
          class="link"
          v-bind:href="file.url"
          download
          >{{ file.name.length &lt; 50 ? file.name : file.name.substring(0,40)+'...' }}</a
        >
        <div class="icons">
          <span><Display class="svg-icon" /></span>
          <a class="link" v-bind:href="file.url" download
            ><span><Download class="svg-icon" /></span
          ></a>
          <span v-on:click="handelDeleteFIle(file.name)"
            ><Delete class="svg-icon"
          /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Download from '../assets/download.svg';
import Delete from '../assets/delete.svg';
import Display from '../assets/tv.svg';

export default {
  name: 'Layout',
  components: { Download, Delete, Display },
  data() {
    return {
      files: [],
      file: null,
      message: '',
    };
  },
  methods: {
    async submitFiles() {
      const formData = new FormData();
      formData.append('file', this.file);
      try {
        await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        this.message = 'Plik zapisany!';
        this.handleDisplayFiles();
      } catch (err) {
        console.log('Error');
        this.message = 'Coś poszło nie tak, spróbuj ponownie!';
      }
    },
    handleFileUpload() {
      const file = this.$refs.file.files[0];
      this.file = file;
      this.message = '';
    },
    handleDisplayFiles() {
      try {
        axios.get('/api/files').then((res) => {
          this.files = [...res.data];
        });
        this.message = 'Wczynato listę plików z katalogu!';
      } catch (err) {
        console.log('Error');
        this.message = 'Coś poszło nie tak, spróbuj ponownie!';
      }
    },
    handelDeleteFIle(name) {
      try {
        axios.get(`/api/delete/${name}`).then((res) => {
          console.log(res.data);
        });
        this.message = 'Plik skaowany!';
        this.handleDisplayFiles();
      } catch (err) {
        console.log('Error');
        this.message = 'Coś poszło nie tak, spróbuj ponownie!';
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  padding: 20px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 10px;
}
.container {
  padding: 10px;
}
.file-listing {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  background-color: #dbdddf;
  padding: 7px 10px;
  border-radius: 4px;
}
.icons {
  display: flex;
}

.svg-icon {
  width: 24px;
  margin-left: 6px;
}

.link {
  color: #0b1223;
  text-decoration: none;
  cursor: pointer;
}
</style>
