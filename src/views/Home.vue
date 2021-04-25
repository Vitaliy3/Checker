<template>
  <div class="home">
    <div class="middle">
      <div class="company">TESTER</div>
      <div class="about">
        Анализириум и выяляем подозрительные тестовые задания <br />
        используя актуальные и надежные алгоритмы
      </div>
    </div>
    <div class="double">
      <div class="inform">
        <div>Количество заключенных договоров: {{ countContracts }}</div>
        <div>Количество проверенных тестовых заданий: {{ countTasks }}</div>
        <div>
          Количество выявленных подозрительных заданий:
          {{ countSuspiciousTasks }}
        </div>
      </div>
      <div class="comment"></div>
    </div>

    <footer></footer>
    <!-- <v-layout>
      <v-form>
        <ValidationProvider rules="positive" v-slot="{ errors }">
          <v-text-field
            :name="name"
            v-model="email"
            placeholder="email"
            :error-messages="errors"
          ></v-text-field>
        </ValidationProvider>
      </v-form>
    </v-layout> -->
  </div>
</template>

<script>
import Component from "vue-class-component"
import { Watch } from "vue-property-decorator"
import Vue from "vue"
import HelloWorld from "@/components/HelloWorld.vue" // @ is an alias to /src
import { ValidationProvider, extend } from "vee-validate"
extend("positive", (value) => {
  return value.length > 3
})

export default {
  data: () => ({
    countContracts: 5,
    countTasks: 10,
    countSuspiciousTasks: 10,
  }),
  mounted() {
    console.log(typeof this, this.countSuspiciousTasks)
  },
}
</script>

<style scoped>
.company {
  margin-top: 200px;
  text-align: center;
  font-size: 30pt;
}

.about {
  text-align: center;
  font-size: 18pt;
}

.home {
  height: 100%;
  color: azure;
  display: flex;
  flex-direction: column;
  font-family: "Times new roman", sans-serif;
  background: url(../icons/Circuits.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.middle {
  flex: 1 0 auto;
}

.inform {
  border: solid 1px;
  border-top-left-radius: 5%;
  border-bottom-right-radius: 5%;
  height: 300px;
  width: 500px;
}

.comment {
  border-top-right-radius: 5%;
  border-bottom-left-radius: 5%;

  border: solid 1px;
  height: 300px;
  width: 500px;
}

.double {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  padding: 20px;
}
footer {
  flex: 0 0 auto;
  border: solid 1px;
  width: 100%;
  height: 6%;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: red;
  border-radius: 10px;
}

::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #fff;
  background-image: -webkit-linear-gradient(
    top,
    #e4f5fc 0%,
    #bfe8f9 50%,
    #9fd8ef 51%,
    #2ab0ed 100%
  );
}
</style>
