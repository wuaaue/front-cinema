<template>
  <div id="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label>Email:</label>
      <input type="email" v-model="email" >
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
    async login() {
      const userData = {
        email: this.email,
        password: this.password
      };

      console.log("User data being sent: ", userData);

      const url = 'http://localhost:8080/api/login';

      try {
        const response = await axios.post(url, userData);
        console.log(response.data);
        if (response.data === 'Success') {
          this.$router.push('/movies');
        } else {
          alert('Ошибка входа: Неверный email или пароль');
        }
      } catch (error) {
        console.error('Ошибка входа:', error.response.data);
        alert('Ошибка входа: ' + error.response.data.message);
      }
    }
  }
}
</script>

