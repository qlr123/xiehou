<template>
  <div class="home">
    <H></H>
    <router-view />
    <F></F>
  </div>
</template>

<script>
// @ is an alias to /src
import H from "../components/Tou";
import F from "../components/Foot";
export default {
  name: "home",
  components: { H, F },
  methods: {}
};
</script>
