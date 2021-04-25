<template>
  <v-card style="min-height:100%">
    <v-card-title class="indigo white--text headline">
      Анализ результатов тестирования
    </v-card-title>
    <v-row class="pa-4" justify="space-between">
      <v-col cols="6">
        <v-data-table
          :headers="header"
          :items="banks"
          :items-per-page="5"
          class="elevation-1"
          @click:row="analyseRowClick"
        ></v-data-table>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col cols="3">
        <div
          v-if="!selectedBank"
          class="title grey--text text--lighten-1 font-weight-light"
          style="text-align: center;margin-top:50px"
        >
          Выберите один из результатов тестирования для отображения заданий
        </div>
        <v-list v-else :key="selectedBank.id" flat>
          <v-subheader>Задания</v-subheader>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item
              v-for="(item, i) in tasks"
              :key="i"
              @click="ClickOnTask(selectedBank.id, item.id)"
            >
              <v-list-item-icon></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.id"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col class="d-flex text-center">
        <v-scroll-y-transition mode="out-in">
          <div
            v-if="!selectedTask"
            class="title grey--text text--lighten-1 font-weight-light"
            style="align-self: center;"
          >
            Выберите одно из заданий в таблице для отображения графика
          </div>
          <v-card class="pt-6 mx-auto" flat max-width="400">
            <v-card-text>
              <h3 class="headline mb-2"></h3>
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

    <div class="buttons">
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
            :disabled="!selectedBank"
          >
            Переименовать
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <v-btn
            color="primary"
            class="ma-2"
            @click="dialog2 = true"
            :disabled="!selectedBank"
          >
            Отправить на почту
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            color="primary"
            class="ma-2"
            @click="downloadRawBank"
            :disabled="!selectedBank"
          >
            Скачать исходные данные
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn
            :disabled="!selectedBank"
            color="primary"
            class="ma-2"
            @click="downloadAnalysedBank"
          >
            Скачать проанализированные <br />
            данные
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div data-app>
      <v-col>
        <edit-analyse-dialog
          :dialog="dialog2"
          v-on:closeEditDialog="toggleHeader($event)"
        />
      </v-col>
    </div>
    <div class="message"></div>
    <FlashMessage></FlashMessage>
  </v-card>
</template>

<script>
import Vue from "vue"
import FlashMessage from "@smartweb/vue-flash-message"
Vue.use(FlashMessage)
import axios from "axios"
import editAnalyseDialog from "./editAnalyseDialog.vue"
import Analyse, { Task } from "@/entities/analyse"
export default {
  components: { editAnalyseDialog },
  data: () => ({
    banks: [],
    chartOptions: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true,
        },
        animations: {
          enabled: true,
        },
      },
      stroke: {
        width: [1, 1, 2, 2],
        curve: "straight",
        dashArray: [2, 2, 4, 0],
      },

      xaxis: {
        type: "numeric",

        categories: [
          -2,
          -1.75,
          -1.5,
          -1.25,
          -1,
          -0.75,
          -0.5,
          -0.25,
          0,
          0.25,
          0.5,
          0.75,
          1,
          1.25,
          1.5,
          1.75,
          2,
        ],

        title: {
          text: "Уровень подготовленности",
        },
      },
      yaxis: {
        title: {
          text: "частота удачного выполнения задания ",
        },
      },
    },

    prevSelectedRow: null,
    selectedBank: null,
    selectedTask: null,
    tasks: [],
    dialog2: false,
    defaultButtonText: "Загрузить данные", // текст по умолчанию на кнопке загрузки файла
    selectedFile: null, // выбранный загружаемый файл
    isSelecting: false, // состояние загрузки

    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
    selectedItem: null,
  }),

  computed: {
    series() {
      return [
        {
          name: "B+",
          data: [
            0.25,
            0.3,
            0.37,
            0.43,
            0.48,
            0.53,
            0.56,
            0.63,
            0.7,
            0.73,
            0.79,
            0.85,
            1,
            1.25,
            null,
            null,
            null,
          ],
        },
        {
          name: "B-",
          data: [
            0.05,
            0.1,
            0.17,
            0.23,
            0.28,
            0.33,
            0.36,
            0.43,
            0.5,
            0.53,
            0.59,
            0.65,
            0.75,
            0.9,
            null,
            null,
            null,
          ],
        },
        {
          name: "Бинрбаум",
          data: [
            0.09,
            0.2,
            0.27,
            0.33,
            0.38,
            0.43,
            0.46,
            0.53,
            0.6,
            0.63,
            0.69,
            0.75,
            0.9,
            1.05,
            null,
            null,
            null,
          ],
        },
        {
          name: "Вероятность",
          data: [
            null,
            null,
            null,
            null,
            0.6,
            0.5,
            0.4,
            0.25,
            0.3,
            0.3,
            0,
            null,
            null,
            null,
            null,
            null,
            null,
          ],
        },
      ]
    },

    // текст на кпопке загрузки файла после выбора файла
    buttonText() {
      return this.selectedFile ? this.selectedFile.name : this.defaultButtonText
    },

    header() {
      const header = [
        { text: "Название бтз", sortable: true, value: "name" },
        { text: "Дата загрузки", value: "loadDate" },
        { text: "Кол-во тестируемых", value: "countUsers" },
        { text: "Кол-во заданий", value: "countTasks" },
        { text: "Статус анализа", value: "status" },
      ]

      return header
    },
  },
  created() {
    const model = new Analyse()

    model.getAllBanks().then((data) => {
      this.banks = data
    })
  },

  methods: {
    downloadRawBank() {
      console.log("ddd")
    },
    downloadAnalysedBank() {
      console.log("ddd")
    },
    ClickOnTask(bankId, taskId) {
      this.tasks.find((task) => {
        if (task.id == taskId) {
          this.selectedTask = task
        }
      })
    },
    toggleHeader(event) {
      this.flashMessage.success({
        title: "Уведомление",
        message: "Действие выполнено успешно",
      })
      this.dialog2 = false
    },
    // метод по нажатию на кнопку загрузки файла
    onButtonClick() {
      this.isSelecting = true
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false
        },
        { once: true }
      )

      this.$refs.uploader.click()
    },
    // метод,который срабатывает после выбора файла
    onFileChanged(e) {
      this.selectedFile = e.target.files[0]

      const formData = new FormData()
      formData.append("file", this.selectedFile)
      axios.post("google.com", formData)
    },

    analyseRowClick(e, row) {
      this.flashMessage.show({
        status: "error",
        title: "Error Message Title",
        message: "Oh, you broke my heart! Shame on you!",
      })

      if (this.prevSelectedRow) this.prevSelectedRow.select(false)
      this.prevSelectedRow = row
      row.select(true)

      const taskModel = new Task()
      taskModel.getTasksByBankId(1).then((data) => {
        this.tasks = data
      })

      return (this.selectedBank = e)
    },

    doWhatever(event) {
      console.log(event)
    },
  },
}
</script>
<style lang="css">
.buttons {
  position: absolute;
  bottom: 0;
}
</style>
