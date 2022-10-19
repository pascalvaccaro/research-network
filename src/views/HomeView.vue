<script setup>
import ReadPost from "@/components/ReadPost.vue";
import CreatePost from "@/components/CreatePost.vue";
</script>

<script>
import * as postApi from "@/lib/posts";
import { isLoggedIn } from "@/lib/auth";

export default {
  data() {
    return {
      posts: [],
    };
  },
  computed: {
    canCreatePost: function () {
      return isLoggedIn();
    },
  },
  mounted: async function () {
    await this.getPosts();
  },
  methods: {
    async getPosts() {
      const result = await postApi.getPosts();
      console.log(result);
      if (result && result.posts) {
        this.posts = result.posts;
      }
    },
    async createPost(post) {
      if (!this.canCreatePost) return;
      const result = await postApi.createPost(post);
      if (result.success) await this.getPosts();
    },
    async addLike(postId) {
      if (!this.canCreatePost) return;
      const result = await postApi.addLike(postId);
      if (result.success) await this.getPosts();
    },
    async addComment(postId, content) {
      if (!this.canCreatePost) return;
      const result = await postApi.addComment(postId, content);
      if (result.success) await this.getPosts();
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <h1>Bienvenue sur le réseau des chercheurs !</h1>
    <CreatePost v-if="canCreatePost" :on-create-post="createPost" />

    <div class="postlist">
      <ReadPost
        v-for="post in posts"
        :post="post"
        :key="post._id"
        @add-like="addLike(post._id)"
        @add-comment="(content) => addComment(post._id, content)"
      />
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 2rem;
}
.postlist {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
