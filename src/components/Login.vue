<template>
  <div id="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label>Email:</label>
      <input type="email" v-model="email" required>
      <label>Password:</label>
      <input type="password" v-model="password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      const userData = {
        email: this.email,
        password: this.password
      };

      const url = 'http://localhost:8080/api/login';

      axios.post(url, userData)
          .then(response => {
            console.log(response.data);
            this.$router.push('/dashboard');
          })
          .catch(error => {
            console.error('Ошибка входа:', error.response.data);
            alert('Ошибка входа: ' + error.response.data.message);
          });
    }
  }
}
</script>
