import React from 'react';
import { Sparkles } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ onStartStyling }) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.navContainer}`}>
        {/* Authentic Vietnamese Seal Logo (Con Dấu Triện Đỏ) */}
        <a href="#" className={styles.brandGroup}>
          <div className={styles.sealLogo}>
            <div className={styles.sealInner}>
              <span>VIỆT</span>
              <div className={styles.sealDivider}></div>
              <span>PHỤC</span>
            </div>
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>VIỆT PHỤC REMIX</span>
            <span className={styles.brandTagline}>Gìn nét xưa • Bật chất nay</span>
          </div>
        </a>

        {/* Clean Minimalist Navigation */}
        <nav className={styles.navMenu}>
          <a href="#featured-showcase" className={styles.navItem}>BỘ SƯU TẬP</a>
          <a href="#context" className={styles.navItem}>BỐI CẢNH</a>
          <a href="#studio" className={styles.navItem}>PHÒNG PHỐI ĐỒ</a>
          <a href="#lookbook-community" className={styles.navItem}>LOOKBOOK CHUYỀN TAY</a>
        </nav>

        {/* Action Button */}
        <button className={styles.ctaButton} onClick={onStartStyling}>
          <Sparkles size={16} />
          <span>Phối đồ ngay</span>
        </button>
      </div>
    </header>
  );
}
