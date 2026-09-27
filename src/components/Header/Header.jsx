import React from 'react';
import styles from './Header.module.css';

/**
 * Header thanh định hướng bảo tàng số
 */
export default function Header({
  activeSection,
  onNavigate,
  lookbookCount = 0,
  onOpenLookbook
}) {
  const menuItems = [
    { id: 'hero', label: 'Trang Chủ' },
    { id: 'stylist', label: 'AI 3D Stylist' },
    { id: 'costumes', label: 'Bộ Sưu Tập Cổ Phục' },
    { id: 'landmarks', label: 'Bối Cảnh Di Sản' },
    { id: 'about', label: 'Giới Thiệu Dự Án' }
  ];

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        {/* LOGO TRÁI */}
        <a href="#hero" className={styles.logoLink} onClick={(e) => { e.preventDefault(); onNavigate('hero'); }}>
          <div className={styles.logoBadge}>
            <span className={styles.logoMonogram}>VP</span>
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Heritage AI Stylist</span>
            <span className={styles.brandSub}>VIỆT PHỤC REMIX • BẢO TÀNG SỐ</span>
          </div>
        </a>

        {/* MENU PHẢI */}
        <nav className={styles.navMenu}>
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`${styles.navItem} ${activeSection === item.id ? styles.navItemActive : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
              }}
            >
              {item.label}
            </a>
          ))}

          {/* Nút Lookbook nhanh */}
          <button className={styles.lookbookNavBtn} onClick={onOpenLookbook}>
            <span>📖 Lookbook</span>
            <span className={styles.lookbookCount}>{lookbookCount}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
