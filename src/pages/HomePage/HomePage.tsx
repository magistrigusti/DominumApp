import Link from "next/link";
// import styles from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <div>
      <h5>We build without weekends and holidays. Follow the news</h5>

      <img src="/img/workering.png" alt="" />

      {/* 🔙 Кнопка назад */}
      <div style={{ alignSelf: 'flex-start' }}>
        <Link href="/" style={{
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
