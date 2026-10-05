import React from 'react';
import { Sparkles, Search, Compass, Shirt, BookOpen, Heart } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ onStartStyling, lookbookCount = 4 }) {
  return (
    <header className={styles.header}>
      {/* Top micro announcement bar */}
      <div className={styles.topAnnounce}>
        <div className={`container ${styles.announceContainer}`}>
          <div className={styles.announceText}>
            <span className={styles.sparkleIcon}>✨</span>
            <span>AUDITION 2026: THỬ THÁCH SÁNG TẠO "VIỆT PHỤC REMIX — PHONG CÁCH GEN Z"</span>
          </div>
          <div className={styles.topMeta}>
            <span>Bảo chứng chuẩn mực văn hóa</span>
            <span className={styles.dotSeparator}>•</span>
            <span>Trợ lý Nghê Thần AI</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={styles.mainNav}>
        <div className={`container ${styles.navContainer}`}>
          {/* Authentic Vietnamese Seal Logo (Con Dấu Triện) */}
          <a href="#" className={styles.brandGroup}>
            <div className={styles.sealLogo}>
              <div className={styles.sealInner}>
                <span className={styles.sealWord}>VIỆT</span>
                <span className={styles.sealDivider}></span>
                <span className={styles.sealWord}>PHỤC</span>
              </div>
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandTitle}>VIỆT PHỤC REMIX</span>
              <span className={styles.brandTagline}>DI SẢN TRUYỀN THỐNG • PHONG CÁCH GEN Z</span>
            </div>
          </a>

          {/* Luxury Navigation Links */}
          <nav className={styles.navMenu}>
            <a href="#context" className={styles.navItem}>BỐI CẢNH</a>
            <a href="#studio" className={styles.navItem}>PHÒNG PHỐI ĐỒ</a>
            <a href="#lookbook-community" className={styles.navItem}>LOOKBOOK CHUYỀN TAY</a>
            <a href="#about" className={styles.navItem}>VỀ DI SẢN</a>
          </nav>

          {/* Action Header Items */}
          <div className={styles.actionGroup}>
            <a href="#lookbook-community" className={styles.lookbookPill}>
              <Heart size={14} className={styles.heartIcon} />
              <span>{lookbookCount} Lookbook</span>
            </a>

            <button 
              className={styles.ctaButton}
              onClick={onStartStyling}
            >
              <Sparkles size={16} />
              <span>Phối đồ ngay</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
