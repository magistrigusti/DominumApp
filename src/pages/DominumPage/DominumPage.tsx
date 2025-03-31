import mineBg from "../../assets/Dominum/astral_mine_ship.jpg"
import { Link } from "react-router-dom";

export const DominumPage = () => {
  return (
    <div>
      <img src={mineBg} alt="" />

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