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
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-icon v-show="item.show" left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
//import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  data() {
    return {
      ww: true,
      appTitle: "Awesome App",
      sidebar: false,
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
          show: true,
        },
        { title: "  Анализ", path: "/about", icon: "face", show: true },
        { title: "Тех. поддержка", path: "/about", icon: "face", show: true },
        { title: "Контакты", path: "/about", icon: "face", show: true },
        { title: "О компании", path: "/about", icon: "face", show: true },
        { title: "О методологии", path: "/about", icon: "face", show: true },
        { title: "ЛК", path: "/about", icon: "face", show: true },
        { title: "Войти", path: "/signin", icon: "lock_open", show: true },
        {
          title: "Управление пользователями",
          path: "/signin",
          icon: "lock_open",
          show: true,
        },
      ];
    },
  },
};
</script>
<style></style>
