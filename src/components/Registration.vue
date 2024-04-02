<template>
  <div id="registration">
    <h2>Регистрация клиента</h2>
    <form @submit.prevent="registerCustomer">
      <label for="firstName">Имя:</label>
      <input type="text" id="firstName" v-model="firstName" required><br>
      <label for="lastName">Фамилия:</label>
      <input type="text" id="lastName" v-model="lastName" required><br>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required><br>
      <label for="phone">Телефон:</label>
      <input type="text" id="phone" v-model="phone" required><br>
      <label for="password">Пароль:</label>
      <input type="password" id="password" v-model="password" required><br>
      <button type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: ''
    };
  },
  methods: {
    async registerCustomer() {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        password: this.password
      };
      try {
        const response = await axios.post('http://localhost:8080/api/customers/register', data);
        alert(response.data);
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = '';
        this.password = '';
        this.$router.push('/movies');
      } catch (error) {
        console.error('Ошибка при регистрации:', error);
      }
    }
  }
};
</script>

<style scoped>
#registration {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #803E2F;
  border-radius: 5px;
}

h2 {
  margin-bottom: 20px;
}

form label {
  display: block;
  margin-bottom: 10px;
}

form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
