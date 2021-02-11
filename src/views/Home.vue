<template>
  <div class="home">
    <v-layout>
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
    </v-layout>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import Vue from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { ValidationProvider, extend } from "vee-validate";
extend("positive", (value) => {
  return value.length > 3;
});

@Component({
  components: {
    HelloWorld,
    ValidationProvider,
  },
})
export default class Home extends Vue {
  email: string = "";
  name: string = "email";
  @Watch("email")
  async onEmailChanged(val: any) {
    if (val) {
      console.log(val);
    }
  }
}
</script>

<style lang="stylus" scoped></style>
