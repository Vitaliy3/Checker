<template>
  <v-card style="min-height:100%">
    <v-card-title class="indigo white--text headline">
      User Directory
    </v-card-title>
    <v-row class="pa-4" justify="space-between">
      <v-col cols="5">
        <v-data-table
          :headers="header"
          :items="items"
          :items-per-page="5"
          class="elevation-1"
          @click:row="analyseRowClick"
        ></v-data-table>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col cols="3">
        <div
          v-if="!selected"
          class="title grey--text text--lighten-1 font-weight-light"
          style="align-self: center;"
        >
          Select a User
        </div>
        <v-list v-else :key="selected.id" flat>
          <v-subheader>REPORTS</v-subheader>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in selected.tasks" :key="i">
              <v-list-item-icon></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col class="d-flex text-center">
        <v-scroll-y-transition mode="out-in">
          <div
            v-if="!selected"
            class="title grey--text text--lighten-1 font-weight-light"
            style="align-self: center;"
          >
            Выберите один из результатов анализа в таблице для отображения
            графика
          </div>
          <v-card
            v-else
            :key="selected.id"
            class="pt-6 mx-auto"
            flat
            max-width="400"
          >
            <v-card-text>
              <h3 class="headline mb-2">
                {{ selected.name }}
              </h3>
              <apexchart
                type="line"
                height="350"
                :options="chartOptions"
                :series="series"
              ></apexchart>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>
        </v-scroll-y-transition>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="auto">
        <v-btn
          color="primary"
          class="ma-2"
          instead
          depressed
          :loading="isSelecting"
          @click="onButtonClick"
        >
          <v-icon left>
            cloud_upload
          </v-icon>
          {{ buttonText }}
        </v-btn>
        <input
          ref="uploader"
          class="d-none"
          type="file"
          accept="image/*"
          @change="onFileChanged"
        />
      </v-col>

      <v-col cols="auto">
        <v-btn
          color="primary"
          class="ma-2"
          @click="dialog2 = true"
          :disabled="!selected"
        >
          Переименовать
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
          color="primary"
          class="ma-2"
          @click="dialog2 = true"
          :disabled="!selected"
        >
          Отправить на почту
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
          color="primary"
          class="ma-2"
          @click="dialog2 = true"
          :disabled="!selected"
        >
          Скачать исходные данные
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn
          :disabled="!selected"
          color="primary"
          class="ma-2"
          @click="dialog2 = true"
        >
          Скачать проанализированные <br />
          данные
        </v-btn>
      </v-col>
    </v-row>

    <div data-app>
      <v-col>
        <edit-analyse-dialog
          :dialog="dialog2"
          v-on:closeEditDialog="toggleHeader($event)"
        />
      </v-col>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
import editAnalyseDialog from "./editAnalyseDialog.vue";
export default {
  components: { editAnalyseDialog },
  data: () => ({
    series: [
      {
        name: "Peter",
        data: [5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9],
      },
      {
        name: "Johnny",
        data: [
          10,
          15,
          null,
          12,
          null,
          10,
          12,
          15,
          null,
          null,
          12,
          null,
          14,
          null,
          null,
          null,
        ],
      },
      {
        name: "David",
        data: [
          null,
          null,
          null,
          null,
          3,
          4,
          1,
          3,
          4,
          6,
          7,
          9,
          5,
          null,
          null,
          null,
        ],
      },
    ],
    chartOptions: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        animations: {
          enabled: false,
        },
      },
      stroke: {
        width: [5, 5, 4],
        curve: "straight",
      },
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      title: {
        text: "Missing data (null values)",
      },
      xaxis: {},
    },
    prevSelectedRow: null,
    selected: null,
    dialog2: false,
    defaultButtonText: "Загрузить данные", // текст по умолчанию на кнопке загрузки файла
    selectedFile: null, // выбранный загружаемый файл
    isSelecting: false, // состояние загрузки

    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
    selectedItem: 1,
  }),

  computed: {
    // текст на кпопке загрузки файла после выбора файла
    buttonText() {
      return this.selectedFile
        ? this.selectedFile.name
        : this.defaultButtonText;
    },

    header() {
      const header = [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "loadDate", value: "loadDate" },
      ];

      return header;
    },
    items() {
      const desserts = [
        {
          id: 1,
          name: "Frozen Yogurt",
          loadDate: "2020-01-01",
          tasks: [
            {
              text: "task1",
            },
          ],
        },
        {
          id: 2,
          name: "Ice cream sandwich",
          loadDate: "2020-01-01",
        },
      ];
      return desserts;
    },
  },

  methods: {
    toggleHeader(event) {
      this.dialog2=false
      console.log(event);
    },
    // метод по нажатию на кнопку загрузки файла
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      this.$refs.uploader.click();
    },
    // метод,который срабатывает после выбора файла
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];

      const formData = new FormData();
      formData.append("file", this.selectedFile);
      axios.post("google.com", formData);
    },

    analyseRowClick(e, row) {
      if (this.prevSelectedRow) this.prevSelectedRow.select(false);
      this.prevSelectedRow = row;
      row.select(true);
      return (this.selected = e);
    },

    doWhatever(event) {
      console.log(event);
    },
  },
};
</script>
