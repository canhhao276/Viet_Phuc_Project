import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Compass, 
  Sparkles, 
  Award 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HeroSection.module.css';

export default function HeroSection({ onStartStyling, onExploreLookbooks }) {
  // 0: Slide Toàn Cảnh Gen Z (Panoramic Photo)
  // 1: Slide Sắc Đỏ Hoàng Kim (Royal Crimson Red)
  const [activeSlide, setActiveSlide] = useState(0);

  // Tự động chuyển đổi mượt mà giữa 2 slide sau 8 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev === 0 ? 1 : 0));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.heroSection}>
      {/* Nút điều hướng slide trái / phải tối giản */}
      <button 
        className={`${styles.navArrow} ${styles.prevArrow}`}
        onClick={() => setActiveSlide(prev => (prev === 0 ? 1 : 0))}
        aria-label="Slide trước"
      >
        <ChevronLeft size={24} />
      </button>

      <button 
        className={`${styles.navArrow} ${styles.nextArrow}`}
        onClick={() => setActiveSlide(prev => (prev === 0 ? 1 : 0))}
        aria-label="Slide sau"
      >
        <ChevronRight size={24} />
      </button>

      <AnimatePresence mode="wait">
        {/* =========================================================================
            SLIDE 0: TOÀN CẢNH GEN Z RẠNG RỠ TRÊN LẦU HOÀNG THÀNH (ẢNH BẠN THÍCH)
           ========================================================================= */}
        {activeSlide === 0 ? (
          <motion.div 
            key="slide-panoramic-photo"
            className={styles.slidePanoramic}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Ảnh toàn cảnh nhóm bạn Gen Z mặc Việt phục */}
            <img 
              src="/images/hero_banner_panoramic.jpg" 
              alt="Gen Z Việt Phục Remix trên lầu Hoàng Thành" 
              className={styles.bannerImage}
            />
            <div className={styles.bannerVignette}></div>

            {/* Nội dung tối giản, thanh lịch - Không có box thừa đè lên ảnh */}
            <div className={`container ${styles.contentContainer}`}>
              <div className={styles.panoramicContentCol}>
                <div className={styles.taglineBadge}>
                  <Sparkles size={14} />
                  <span>Audition 2026 • Việt Phục Remix Gen Z</span>
                </div>

                <h1 className={styles.mainTitle}>
                  HỒN CỔ PHỤC <br />
                  <span className={styles.goldText}>NHỊP THỞ GEN Z</span>
                </h1>

                <p className={styles.description}>
                  Khám phá và tự do sáng tạo cách phối Áo Ngũ Thân, Áo Tấc, Nhật Bình hay Tứ Thân 
                  vừa hiện đại, trẻ trung vừa tôn vinh trọn vẹn giá trị di sản văn hóa Việt.
                </p>

                <div className={styles.buttonRow}>
                  <button className={styles.btnPrimary} onClick={onStartStyling}>
                    <span>Bắt đầu phối đồ</span>
                    <ArrowRight size={18} />
                  </button>
                  <button className={styles.btnSecondary} onClick={onExploreLookbooks}>
                    <Compass size={18} />
                    <span>Xem Lookbook</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
              SLIDE 1: PHÔNG NỀN SẮC ĐỎ HOÀNG KIM CỐ ĐÔ (TỐI GIẢN, KHÔNG RỐI BOX)
             ========================================================================= */
          <motion.div 
            key="slide-royal-crimson"
            className={styles.slideRoyal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Lồng đèn cung đình phát sáng tao nhã */}
            <div className={styles.lanternWrapper}>
              <img 
                src="/images/lantern.jpg" 
                alt="Lồng đèn cung đình phát sáng" 
                className={styles.lanternImg}
              />
            </div>

            <div className={`container ${styles.royalGrid}`}>
              {/* Cột chữ: Thanh lịch, thoáng mắt, không hộp đè */}
              <div className={styles.royalTextCol}>
                <div className={styles.royalBadge}>
                  <Award size={14} />
                  <span>Di Sản Hoàng Triều Đại Việt</span>
                </div>

                <h1 className={styles.royalHeading}>
                  VIỆT PHỤC REMIX
                </h1>
                <h2 className={styles.royalSubTitle}>
                  Khơi Nguồn Di Sản • Đậm Chất Thời Trang
                </h2>

                <blockquote className={styles.royalQuote}>
                  “Mỗi nếp áo truyền thống là một câu chuyện vàng son của lịch sử. 
                  Với thế hệ trẻ, đó là niềm tự hào mang hồn Việt bước ra thế giới.”
                </blockquote>

                <div className={styles.buttonRow}>
                  <button className={styles.btnPrimary} onClick={onStartStyling}>
                    <span>Bắt đầu phối đồ</span>
                    <ArrowRight size={18} />
                  </button>
                  <button className={styles.btnSecondary} onClick={onExploreLookbooks}>
                    <Compass size={18} />
                    <span>Xem Lookbook</span>
                  </button>
                </div>
              </div>

              {/* Cột ảnh tròn: Đơn giản, tinh tế, không sticker rườm rà */}
              <div className={styles.royalVisualCol}>
                <div className={styles.circularFrameGlow}></div>
                <div className={styles.circularFrame}>
                  <img 
                    src="/costumes/ao_nhat_binh.jpg" 
                    alt="Đại Lễ Phục Nhật Bình Hoàng Tộc" 
                    className={styles.circularImg}
                  />
                  <div className={styles.cleanCaptionTag}>
                    <span>Đại Lễ Phục Nhật Bình</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dải lượn sóng lụa mượt mà dưới đáy */}
            <div className={styles.waveCurve}>
              <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
                <path d="M0,35 C320,95 420,-10 740,35 C1040,85 1200,10 1440,45 L1440,80 L0,80 Z" fill="#FFFFFF"></path>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bộ chấm chuyển slide tối giản dưới đáy banner - không chữ rối mắt */}
      <div className={styles.slideSwitcher}>
        <button 
          className={`${styles.switchDot} ${activeSlide === 0 ? styles.switchDotActive : ''}`}
          onClick={() => setActiveSlide(0)}
          aria-label="Slide 1: Toàn cảnh Gen Z"
        />
        <button 
          className={`${styles.switchDot} ${activeSlide === 1 ? styles.switchDotActive : ''}`}
          onClick={() => setActiveSlide(1)}
          aria-label="Slide 2: Sắc đỏ Hoàng Kim"
        />
      </div>
    </section>
  );
}
