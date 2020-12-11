<template>
  <div class="hello">
    <md-app md-mode="reveal">
      <md-app-toolbar class="flex md-primary">
        <div class="header-title">
          <img class="logo-img" src="../assets/cat.png" alt="logo" />
        </div>
        <div class="input-container">
          <input
            class="input-feild"
            type="text"
            v-model="search"
            placeholder="Search Cat Breed..."
            @change="onChangeSearch($event.target.value)"
          />
        </div>
      </md-app-toolbar>
    </md-app>
    <div v-if="this.load">
      <Loader />
    </div>
    <div v-if="this.catData[0]">
      <md-card v-for="data in paginatedData" :key="data.id">
        <md-card-media>
          <img
            :src="
              'https://cdn2.thecatapi.com/images/' +
              data.reference_image_id +
              '.jpg'
            "
            alt="People"
          />
        </md-card-media>

        <md-card-header>
          <div class="md-title">{{ data.name }}</div>
          <div class="md-subhead">{{ data.origin }}</div>
        </md-card-header>

        <md-card-content>
          {{ data.description }}
        </md-card-content>
      </md-card>
    </div>
    <div v-if="this.catData.length >0">
      <md-button
        :disabled="pageNumber === 0"
        @click="prevPage"
        class="md-raised md-primary"
      >
        Prev
      </md-button>
      <md-button
        class="md-raised md-primary"
        :disabled="pageNumber >= pageCount - 1"
        @click="nextPage"
        >Next</md-button
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "./Loader";
export default {
  name: "HelloWorld",
  components: {
    Loader,
  },
 
  data: () => {
    return {
      search: "",
      catData: [],
      imgURL: "",
      load: false,
      pageNumber: 0,
      size: 1,
    };
  },
  computed: {
    pageCount() {
      let l = this.catData.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.catData.slice(start, end);
    },
  },
  methods: {
    onChangeSearch(e) {
      
      if (this.search.length >= 4) {
        this.load = true;
        axios
          .get("https://api.thecatapi.com/v1/breeds/search?q=" + e)
          .then((res) => {
            this.catData = res.data;
            this.load = false;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.md-card-example .md-subhead .md-icon {
  width: 16px;
  min-width: 16px;
  height: 16px;
  font-size: 16px !important;
}
.md-card-example .md-subhead span {
  vertical-align: middle;
}
.md-card-example .card-reservation {
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.md-card-example .card-reservation .md-icon {
  margin: 8px;
}
.md-card-example .md-button-group {
  display: flex;
}
.md-card-example .md-button-group .md-button {
  min-width: 60px;
  border-radius: 2px;
}
.input-container {
  display: flex;
  align-items: center;
  width: 40%;
  /* height:30px; */
}
.input-feild {
  border: none;
  flex: 100%;
  height: 40px;
  padding: 10px;
  font-size: 20px;
  border-radius: 4px;
}
.input-feild:hover {
  background-color: #ffffff;
  box-shadow: 0px 0px 14px 0.3px #00000096;
}

.input-feild:focus {
  outline: none;
  box-shadow: 0px 0px 12px 0.8px #000000b2;
}
.header-title {
  width: 30%;
  float: left;
  display: flex;
  font-size: 35px;
  font-weight: 600;
}
.logo-img {
  width: 70px;
  height: 70px;
}
@media (max-width: 600px) {
  .header-title {
    font-size: 20px;
  }
  .input-feild {
    font-size: 15px;
  }
  .input-container {
    margin-left: 20px;
  }
}
</style>
