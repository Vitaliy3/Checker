<template>
  <v-app>
    <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <span class="hidden-sm-and-up">
        <!-- <v-toolbar-side-icon @click="sidebar = !sidebar"> </v-toolbar-side-icon> -->
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text v-for="item in menuItems" :key="item.title" :to="item.path" v-show="item.show">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

        <v-menu open-on-hover offset-y transition="slide-x-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              Тех. поддержка
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item v-for="(item, index) in techSupport" :key="index" router :to="item.link">
              <v-list-item-action>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu open-on-hover offset-y transition="slide-x-transition" offset-x>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon large>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item v-for="(item, index) in account" :key="index" router :to="item.link">
              <v-list-item-action>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-menu>

      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      ww: true,
      appTitle: "Awesome App",
      sidebar: false,
      techSupport: [{
        title: "Инструкция",
        link: "/instruction"
      },
        {
          title: "Требования",
          link: "/requirements"
        },
        {
          title: "Общение",
          link: "/communication"
        }
      ],
      account: [{
        title: "Личный кабинет",
        link: "/privateOffice"
      },
        {
          title: "Выйти из аккаунта",
          link: "/logout"
        }
      ]
    };
  },
  computed: {
    menuItems() {
      return [
        { title: "Главная", path: "/", icon: "home" },
        {
          title: "Заключение договора",
          path: "/about",
          icon: "face",
          show: true
        },
        { title: "  Анализ", path: "/about", icon: "face", show: true },
        { title: "Контакты", path: "/about", icon: "face", show: true },
        { title: "О компании", path: "/about", icon: "face", show: true },
        { title: "О методологии", path: "/about", icon: "face", show: true },
        { title: "Войти", path: "/signIn", icon: "lock_open", show: true }
      ];
    }
  }
};
</script>
<style></style>
