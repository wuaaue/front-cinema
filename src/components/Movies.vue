<template>
  <div id="movies">
    <h1>Выберите фильм</h1>
    <div v-for="movie in movies" :key="movie.id">
      <div  class="movie-item">
        <img v-if="movie.id == 1"  src="../assets/poster1.jpg" alt="Постер фильма">
        <img v-if="movie.id == 2"  src="../assets/poster2.jpg" alt="Постер фильма">
        <img v-if="movie.id == 3"  src="../assets/poster3.jpg" alt="Постер фильма">
        <img v-if="movie.id == 4"  src="../assets/poster4.jpg" alt="Постер фильма">
        <h2> </h2>
        <div class="movie-details">
          <h2>{{ movie.title }}</h2>
          <button @click="getScreenings(movie.id)">Показать сеансы</button>
        </div>
      </div>
      <h2> </h2>
    </div>
      <div class="screenings-list" v-if="screenings.length > 0">
        <h3>Сеансы</h3>
        <div v-for="screening in screenings" :key="screening.id" class="screening-item">
          <p>{{ screening.startTime }}</p>
          <p>Доступные места: {{ screening.availableSeats }}</p>
          <button @click="showReservationForm(screening.id)">Забронировать</button>
        </div>
      </div>
    </div>
    <div v-if="showForm" class="reservation-form">
      <h3>Бронирование</h3>
      <form @submit.prevent="makeReservation">
        <label for="customerName">Имя:</label>
        <input type="text" id="customerName" v-model="customerName" required>
        <label for="seatsBooked">Количество мест:</label>
        <input type="number" id="seatsBooked" v-model="seatsBooked" min="1" required>
        <button type="submit">Забронировать</button>
      </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movies: [],
      screenings: [],
      showForm: false,
      selectedScreeningId: null,
      customerName: '',
      seatsBooked: 1
    };
  },
  methods: {
    getMoviePoster(id) {
      return `/assets/poster${id}.jpg`; // Используем относительный путь
    },
    fetchMovies() {
      axios.get('http://localhost:8080/api/movies')
          .then(response => {
            this.movies = response.data;
          })
          .catch(error => {
            console.error('Ошибка при получении списка фильмов:', error);
          });
    },
    getScreenings(movieId) {
      axios.get(`http://localhost:8080/api/screenings/${movieId}`)
          .then(response => {
            this.screenings = response.data;
          })
          .catch(error => {
            console.error('Ошибка при получении сеансов:', error);
          });
    },
    showReservationForm(screeningId) {
      this.showForm = true;
      this.selectedScreeningId = screeningId;
    },
    makeReservation() {
      const data = {
        screeningId: this.selectedScreeningId,
        customerName: this.customerName,
        seatsBooked: parseInt(this.seatsBooked)
      };
      axios.post('http://localhost:8080/api/reservations/make', data)
          .then(response => {
            alert(response.data); // Показать результат попытки бронирования
            this.showForm = false;
            this.customerName = '';
            this.seatsBooked = 1;
          })
          .catch(error => {
            console.error('Ошибка при бронировании:', error);
          });
    }
  },
  created() {
    this.fetchMovies();
  },
};
</script>

<style>
#movies {
  font-family: 'Roboto', sans-serif;
  padding: 20px;
  background-color: #ffffff;
}

.content {
  display: flex;
  justify-content: space-between;
}

.movies-list {
  flex: 2;
}

.screenings-list {
  flex: 1;
  margin-left: 20px;
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.screening-item {
  margin-bottom: 10px;
}

img {
  max-width: 100px;
}

h1, h2, h3 {
  margin-bottom: 15px;
  color: #333;
}

button {
  margin-right: 10px;
  padding: 8px 15px;
  font-size: 16px;
  color: #fff;
  background-color: #A79986;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #803E2F;
}

input[type="text"],
input[type="number"] {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form label {
  margin-right: 10px;
  font-size: 16px;
  color: #333;
}

form button[type="submit"] {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #A79986;
}

form button[type="submit"]:hover {
  background-color: #803E2F;
}

.reservation-form {
  margin-top: 20px;
}
</style>
