<script>
export default {
  props: ["onCreatePost"],
  data() {
    return {
      title: "",
      content: "",
    };
  },
  emits: ["createPost"],
  methods: {
    onSubmit: async function () {
      try {
        await this.onCreatePost({ title: this.title, content: this.content });
        this.title = "";
        this.content = "";
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <label>
      <p>Titre</p>
      <input v-model="title" />
    </label>
    <label>
      <p>Contenu</p>
      <textarea rows="4" v-model="content" />
    </label>
    <button type="submit">Poster</button>
  </form>
</template>

<style scoped lang="scss">
form {
  gap: 1rem;

  label p {
    font-size: 0.6rem;
    margin: 0;
    padding: 0;
    align-items: flex-start;
  }
  textarea {
    resize: vertical;
  }
  button[type="submit"] {
    align-self: flex-end;
    padding: 1rem 2rem;
  }
}
</style>
