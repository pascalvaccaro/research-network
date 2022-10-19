<script>
import { login, register } from "@/lib/auth";

export default {
  data() {
    return {
      isRegistering: false,
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    };
  },
  methods: {
    onSubmit: async function () {
      try {
        const userObject = {
          email: this.email,
          password: this.password,
        };
        if (this.isRegistering) {
          userObject.firstname = this.firstname;
          userObject.lastname = this.lastname;
          const success = await register(userObject);
          this.isRegistering = !success;
        } else {
          const success = await login(userObject);
          if (success) this.$router.push("/");
        }
      } catch (err) {
        console.error(err);
        this.errorMessage = err.message;
      }
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <h1>Ravi de vous revoir !</h1>
    <p>
      {{ isRegistering ? "Déjà enregistré " : "Pas encore de compte " }}?
      <button role="navigation" @click="() => (isRegistering = !isRegistering)">
        {{ isRegistering ? "Me connecter " : "Créez-en un" }} !
      </button>
    </p>
    <form @submit.prevent="onSubmit">
      <label>
        <p>Email</p>
        <input type="email" v-model="email" />
      </label>
      <label>
        <p>Password</p>
        <input type="password" v-model="password" />
      </label>
      <label v-if="isRegistering">
        <p>Prénom</p>
        <input type="text" v-model="firstname" />
      </label>
      <label v-if="isRegistering">
        <p>Nom de famille</p>
        <input type="text" v-model="lastname" />
      </label>
      <button type="submit">Envoyer</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    padding: 1rem;
    width: 380px;
    min-height: 500px;
    gap: 2rem;

    label p {
      font-size: 0.6rem;
      margin: 0;
      padding: 0;
      align-items: flex-start;
    }
    label input {
      width: 100%;
      padding: 0.65rem;
      outline: none;
      border: 1px solid var(--color-border);
      border-radius: 4px;
    }
    button {
      width: 100%;
      height: 2.5rem;
    }
  }
}
</style>
