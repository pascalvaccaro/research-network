<script>
import { isLoggedIn } from "../lib/auth";

export default {
  data() {
    return { content: "", showComments: false, isLoggedIn: isLoggedIn() };
  },
  methods: {
    createComment() {
      this.$emit("addComment", this.content);
      this.content = "";
    },
  },
  props: ["post"],
  emits: ["addLike", "addComment"],
};
</script>

<template>
  <div class="postcard">
    <h2>
      {{ post.title }}
      <button @click="$emit('addLike')">❤ {{ post.likes.length }}</button>
    </h2>
    <small>
      - Par
      <RouterLink :to="`/profile/${post.userId}`">
        {{ post.firstname }} {{ post.lastname }}
      </RouterLink>
      le
      {{ new Intl.DateTimeFormat("fr").format(new Date(post.date)) }}
    </small>
    <p>{{ post.content }}</p>

    <ul v-if="showComments" class="comments">
      <li v-for="comment in post.comments" :key="comment._id" class="comment">
        <p style="text-decoration: underline">
          {{ comment.firstname }} {{ comment.lastname }} a répondu
        </p>
        <p>{{ comment.content }}</p>
      </li>
      <li v-if="isLoggedIn" class="post-comment">
        <textarea v-model="content" rows="2" />
        <button @click="createComment">Commenter</button>
      </li>
    </ul>
    <button
      role="navigation"
      style="text-align: right"
      @click="() => (showComments = !showComments)"
    >
      {{ showComments ? "Masquer" : "Voir" }} les commentaires
    </button>
  </div>
</template>

<style scoped lang="scss">
.postcard {
  display: flex;
  padding: 1rem 2rem;
  gap: 0.85rem;
  flex-direction: column;
  border: 1px solid var(--color-border);
}

.comments {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style-type: none;
  padding: 0;

  .post-comment {
    margin-top: 0.35rem;
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 1rem;

    textarea {
      flex-grow: 1;
      padding: 8px;
    }
    button {
      padding: 8px;
      background: transparent;
      font-weight: normal;
      border: 1px solid var(--color-primary);
      color: var(--color-primary);
      width: 100px;
      border-radius: 8px;
      &:hover {
        background: var(--color-primary);
        color: white;
        font-weight: bold;
      }
    }
  }

  .comment {
    font-size: small;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 1rem;
    border: 1px solid var(--color-border);
    background-color: var(--color-primary-transparent);
    border-radius: 8px;
  }
}
</style>
