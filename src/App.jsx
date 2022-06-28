import AppRoutes from "./config/AppRoutes";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";
function App() {
  return (
    <div className="App">
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
