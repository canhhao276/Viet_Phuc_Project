import React from 'react';
import styles from './Footer.module.css';

/**
 * Footer mang phong cách bảo tàng số cao cấp
 */
export default function Footer() {
  return (
    <footer className={styles.footerWrapper} id="about">
      <div className={styles.footerContainer}>
        {/* Cột 1: Thông tin thương hiệu */}
        <div className={styles.footerBrandCol}>
          <div className={styles.footerLogoRow}>
            <div className={styles.logoCircle}>VP</div>
            <h3 className={styles.footerBrandTitle}>Heritage AI Stylist</h3>
          </div>
          <p className={styles.footerBrandDesc}>
            Dự án nghiên cứu và phát triển hệ sinh thái số hóa Việt Phục kết hợp công nghệ 3D thời gian thực
            và Trí tuệ nhân tạo Gemini AI. Đề tài tham dự cuộc thi sáng tạo công nghệ Audition.
          </p>
        </div>

        {/* Cột 2: Cổ phục trọng tâm */}
        <div>
          <h4 className={styles.footerColTitle}>Kho Di Sản</h4>
          <ul className={styles.footerLinksList}>
            <li className={styles.footerLinkItem}>Áo Ngũ Thân Lập Lĩnh</li>
            <li className={styles.footerLinkItem}>Áo Tấc Đại Lễ Triều Nguyễn</li>
            <li className={styles.footerLinkItem}>Áo Dài Truyền Thống Cổ Điển</li>
            <li className={styles.footerLinkItem}>Khăn Đóng & Phụ Kiện Cung Đình</li>
          </ul>
        </div>

        {/* Cột 3: Công nghệ */}
        <div>
          <h4 className={styles.footerColTitle}>Công Nghệ</h4>
          <ul className={styles.footerLinksList}>
            <li className={styles.footerLinkItem}>React Three Fiber & Three.js 3D</li>
            <li className={styles.footerLinkItem}>Google Gemini AI Styling Engine</li>
            <li className={styles.footerLinkItem}>Real-time Parametric Mannequin</li>
            <li className={styles.footerLinkItem}>Cultural Guardrails & Harmony Scoring</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomCopyrightBar}>
        <span>© 2026 Heritage AI Stylist • Việt Phục Remix. Bảo lưu mọi quyền di sản.</span>
        <span>Thiết kế & Lập trình bởi Nhóm Sinh Viên Sáng Tạo AI</span>
      </div>
    </footer>
  );
}
