<template>
  <v-card>
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
          @click:row="handleClick"
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
              <v-list-item-icon> </v-list-item-icon>
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
            Select a User
          </div>
          <v-card
            v-else
            :key="selected.id"
            class="pt-6 mx-auto"
            flat
            max-width="400"
          >
            <v-card-text>
              <v-avatar v-if="avatar" size="88">
                <v-img
                  :src="`https://avataaars.io/${avatar}`"
                  class="mb-6"
                ></v-img>
              </v-avatar>
              <h3 class="headline mb-2">
                {{ selected.name }}
              </h3>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>
        </v-scroll-y-transition>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
        color="primary"
        class="ma-2"
        dark
        @click="dialog2 = true"
        v-if="selected"
      >
        Open Dialog 2
      </v-btn>
    </v-row>

    <div data-app>
      <v-dialog v-model="dialog2" max-width="500px">
        <v-card>
          <v-card-title>
            Dialog 2
          </v-card-title>
          <v-card-text>
            <v-text-field
              label="Main input"
              :rules="rules"
              hide-details="auto"
              v-on:input="doWhatever($event)"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="dialog2 = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-card>
</template>

<script>
import AnalyseModel from "@/requests/AnalyseModel";
const avatars = [
  "?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban",
  "?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun",
  "?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong",
  "?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair",
  "?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly",
];

export default {
  data: () => ({
    avatar: null,
    selected: [],
    dialog2: false,
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
    selectedItem: 1,
  }),

  computed: {
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
          tasks: [{
            text:'task1'
          }],
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

  watch: {
    selected: "randomAvatar",
  },

  methods: {
    handleClick(e) {
      console.log(typeof this.dialog2);
      
      return (this.selected = e);
    },

    doWhatever(event) {
      console.log(event);
    },

    randomAvatar() {
      this.avatar = avatars[Math.floor(Math.random() * avatars.length)];
    },
  },
};
</script>
