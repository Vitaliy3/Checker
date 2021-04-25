<template>
  <v-dialog :value="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title> </v-card-title>
      <v-card-text>
        <v-text-field
          label="Main input"
          :rules="rules"
          hide-details="auto"
          v-on:input="confirmEdit($event)"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="close()">
          Ок
        </v-btn>
        <v-btn color="primary" text @click="send()">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog"],
  data: () => ({
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
  }),

  computed: {},

  methods: {
    send() {
      this.$emit("closeEditDialog1", "false")
    },
    close() {
      this.$emit("closeEditDialog", "false")
    },
    confirmEdit(event) {
      console.log(event)
    },
  },
}
</script>
