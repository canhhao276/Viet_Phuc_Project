import React from 'react';
import styles from './HeroSection.module.css';

/**
 * Hero Section: Không gian bảo tàng số Cố Đô lúc hoàng hôn
 */
export default function HeroSection({ onStartStylist, onExploreCostumes }) {
  return (
    <section className={styles.heroWrapper} id="hero">
      {/* Ảnh Panorama Đại Nội Huế lúc hoàng hôn thực tế độ phân giải cao */}
      <img
        src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=2400&q=90"
        alt="Đại Nội Cố Đô Huế Hoàng Hôn"
        className={styles.heroBg}
      />

      <div className={styles.heroGradientOverlay} />
      <div className={styles.fogLayer} />
      <div className={styles.lightRays} />

      {/* Nội dung tiêu đề */}
      <div className={styles.heroContent}>
        <div className={styles.subBadge}>
          <span>✦ BẢO TÀNG SỐ VIỆT PHỤC TRIỀU NGUYỄN ✦</span>
        </div>

        <h1 className={styles.heroHeading}>
          Đánh Thức Tinh Hoa
          <span className={styles.goldText}>Cổ Phục Việt Cùng AI</span>
        </h1>

        <p className={styles.heroDesc}>
          Khám phá và tái hiện nét đẹp vương giả của Áo Ngũ Thân, Áo Tấc và Áo Dài truyền thống
          trên mô hình 3D tương tác đa chiều, kết hợp trí tuệ nhân tạo Gemini phân tích chuẩn mực văn hóa.
        </p>

        <div className={styles.heroActions}>
          <button className="btn-gold" onClick={onStartStylist}>
            <span>✦ TRẢI NGHIỆM AI 3D STYLIST</span>
          </button>
          <button className="btn-outline-gold" onClick={onExploreCostumes}>
            <span>📜 KHÁM PHÁ CỔ PHỤC</span>
          </button>
        </div>

        {/* Thống kê dự án */}
        <div className={styles.heroStatsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>300+</span>
            <span className={styles.statLabel}>Năm Lịch Sử Di Sản</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Chuẩn Điển Chế Cung Đình</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>360°</span>
            <span className={styles.statLabel}>Tương Tác 3D Không Gian</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>AI</span>
            <span className={styles.statLabel}>Luận Sắc & Cảnh Báo Văn Hóa</span>
          </div>
        </div>
      </div>
    </section>
  );
}
