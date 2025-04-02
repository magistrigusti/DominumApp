
import { Link } from "react-router-dom";
// import styles from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <div>
      <h5>We build without weekends and holidays. Follow the news</h5>

      <img src="/public/img/workering.png" alt="" />

      {/* 🔙 Кнопка назад */}
      <div style={{ alignSelf: 'flex-start' }}>
        <Link to="/" style={{
          textDecoration: 'none',
          color: '#fff',
          fontSize: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span style={{ fontSize: '1.5rem' }}>←</span> Назад
        </Link>
      </div>
    </div>
  )
}