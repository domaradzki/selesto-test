<template>
  <div class="wrapper">
    <div class="container column">
      <div class="photo-view">
        <img
          v-if="activeFile"
          class="image"
          v-bind:src="`../../api/files/${activeFile}`"
        />
        <img v-else class="image" src="../assets/logo.png" />
      </div>
      <label
        >Dodawanie zdjęć do katalogu
        <input
          class="file-input column"
          type="file"
          accept="image/*"
          id="file"
          name="file"
          ref="file"
          v-on:change="handleFileUpload()"
        />
      </label>
    </div>
    <div class="container">
      <h2 class="message">{{ message }}</h2>
    </div>
    <div class="container">
      <button class="btn" v-on:click="submitFiles()">Zapisz</button>

      <button class="btn" v-on:click="handleDisplayFiles()">
        Wczytaj pliki z serwera
      </button>
    </div>

    <div class="container">
      <div
        v-for="(file, key) in files"
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
          <span class="icon" v-on:click="handleActiveView(file.name)"
            ><Display class="svg-icon"
          /></span>
          <a class="link" v-bind:href="file.url" download
            ><span class="icon"><Download class="svg-icon" /></span
          ></a>
          <span
            class="icon"
            v-on:click="handleDeleteFIle(file.name, key)"
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
      activeFile: null,
    };
  },
  methods: {
    async submitFiles() {
      if (!this.file) {
        this.message = 'Wybierz poprawny plik!';
        return;
      }
      const formData = new FormData();
      formData.append('file', this.file);
      if (this.files.some((image) => image.name === this.file.name)) {
        this.message = 'Plik o takiej nazwie już istnieje!';
      } else {
        try {
          await axios.post('/api/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          await this.handleDisplayFiles();
          this.message = 'Plik zapisany!';
        } catch (err) {
          console.log('Error', err);
          this.message = 'Coś poszło nie tak, spróbuj ponownie!';
        }
      }
    },
    handleFileUpload() {
      const file = this.$refs.file.files[0];
      if (file) {
        this.file = file;
        this.message = file.name;
      }
    },
    handleActiveView(name) {
      if (name) {
        this.activeFile = name;
      }
    },
    async handleDisplayFiles() {
      try {
        await axios.get('/api/files').then((res) => {
          this.files = [...res.data];
        });
        this.message = 'Wczynato listę plików z katalogu!';
      } catch (err) {
        console.log('Error', err);
        this.message = 'Coś poszło nie tak, spróbuj ponownie!';
      }
    },
    handleDeleteFIle(name, key) {
      try {
        axios.delete(`/api/delete/${name}`).then((res) => {
          this.files.splice(key, 1);
          this.message = 'Plik skaowany!';
        });
      } catch (err) {
        console.log('Error', err);
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
  position: relative;
}
.container {
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
}
.column {
  display: flex;
  flex-direction: column;
}
.file-listing {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  background-color: #dbdddf;
  padding: 12px 10px;
  border-radius: 4px;
}
.photo-view {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 150px;
}
.image {
  width: 100%;
  margin: 0 auto;
}
.message {
  font-weight: bold;
  font-size: 18px;
  color: #c6c6c6;
}
.icons {
  display: flex;
}
.icon {
  cursor: pointer;
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
.btn {
  display: inline-block;
  width: 200px;
  text-align: center;
  border-radius: 8px;
  line-height: 30px;
  cursor: pointer;
  margin-right: 15px;
  padding: 4px 15px;
  box-shadow: 0 2px 4px #0b12232a;
  background: #0b1223;
  border: 1px solid #c6c6c6;
  color: #dbdddf;
  text-decoration: none;
  transition: background 0.3s 0.2s ease-in-out,
    color 0.3s 0.1s ease-in-out, box-shadow 0.3s 0.1s ease-in-out;
}

.btn:hover {
  background: #dbdddf;
  box-shadow: 3px 4px 8px #0b12232a;
  color: #0b1223;
}
.file-input {
  margin-top: 15px;
  color: transparent;
  outline: none;
  width: 200px;
}
.file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.file-input::before {
  content: 'Wybierz plik...';
  display: inline-block;
  background: #0b1223;
  line-height: 30px;
  border: 1px solid #c6c6c6;
  color: #dbdddf;
  border-radius: 8px;
  padding: 5px 8px;
  outline: none;
  text-align: center;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
}
.file-input:hover::before {
  background: #dbdddf;
  box-shadow: 3px 4px 8px #0b12232a;
  color: #0b1223;
}
.file-input:active {
  outline: 0;
}

@media (max-width: 498px) {
  .wrapper {
    padding: 10px;
    min-height: 400px;
    justify-content: space-between;
  }
  .container {
    padding: 1px;
  }
  .photo-view[data-v-005bfc5a] {
    position: relative;
    width: 175px;
    align-self: center;
    margin-bottom: 20px;
  }
  .btn {
    width: 150px;
    line-height: 20px;
    padding: 0;
    height: 50px;
  }
}
</style>
