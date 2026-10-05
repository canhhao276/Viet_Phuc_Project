import React from 'react';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.brandCol}>
          <div className={styles.brandTitle}>
            <span>🪷</span> VIỆT PHỤC REMIX
          </div>
          <p className={styles.brandDesc}>
            Dự án công nghệ sáng tạo tham gia Cuộc thi Audition 2026. 
            Ứng dụng kết nối thế hệ trẻ với kho tàng trang phục truyền thống Việt Nam qua 
            trải nghiệm quẹt thẻ tương tác và trợ lý văn hóa Nghê Thần.
          </p>
          <div className={styles.contestBadge}>
            <Sparkles size={14} />
            <span>Audition 2026 • Đề thi Việt Phục Remix</span>
          </div>
        </div>

        <div className={styles.teamCol}>
          <h4 className={styles.colTitle}>Nhóm Sáng Tạo (2 Thành Viên)</h4>
          <ul className={styles.teamList}>
            <li>
              <strong>Thành viên 1:</strong> UI/UX • Frontend React.js • Visual Concept
            </li>
            <li>
              <strong>Thành viên 2:</strong> Data Văn Hóa • Gemini Prompt • Logic Phối Đồ
            </li>
          </ul>
        </div>

        <div className={styles.heritageCol}>
          <h4 className={styles.colTitle}>Tôn Chỉ Văn Hóa</h4>
          <div className={styles.heritageBox}>
            <ShieldCheck size={20} className={styles.shieldIcon} />
            <p>
              Mọi tư liệu về Áo Ngũ Thân, Áo Tấc, Nhật Bình, Tứ Thân được nghiên cứu và bảo chứng 
              để đảm bảo không làm sai lệch đặc trưng di sản văn hóa dân tộc.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.copyrightBar}>
        <div className="container">
          <p>© 2026 Việt Phục Remix. Thiết kế với <Heart size={14} className={styles.heart} /> dành cho Di sản Việt Nam.</p>
        </div>
      </div>
    </footer>
  );
}
