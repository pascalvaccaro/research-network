<script>
import { API_TOKEN_NAME } from "../lib/constants";

export default {
  created() {
    localStorage.removeItem(API_TOKEN_NAME);
    this.$router.push("/");
  },
};
</script>

<template>
  <div />
</template>
