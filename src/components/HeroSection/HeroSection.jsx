import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Compass, 
  ShieldCheck, 
  Flame,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HeroSection.module.css';

export default function HeroSection({ onStartStyling, onExploreLookbooks }) {
  // 0: Vibe vietphuc.net (Panoramic Gen Z at Citadel)
  // 1: Vibe vietphuccuoi.com (Royal Crimson Red & Glowing Lantern)
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-switch slides every 8 seconds for a lively lookbook feel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev === 0 ? 1 : 0));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.heroSection}>
      {/* Slider Controls */}
      <button 
        className={`${styles.navArrow} ${styles.prevArrow}`}
        onClick={() => setActiveSlide(prev => (prev === 0 ? 1 : 0))}
        aria-label="Slide trước"
      >
        <ChevronLeft size={28} />
      </button>

      <button 
        className={`${styles.navArrow} ${styles.nextArrow}`}
        onClick={() => setActiveSlide(prev => (prev === 0 ? 1 : 0))}
        aria-label="Slide sau"
      >
        <ChevronRight size={28} />
      </button>

      <AnimatePresence mode="wait">
        {/* =========================================================================
            SLIDE 0: CẢM HỨNG VIETPHUC.NET - TOÀN CẢNH GEN Z RẠNG RỠ TRÊN LẦU HOÀNG THÀNH
           ========================================================================= */}
        {activeSlide === 0 ? (
          <motion.div 
            key="slide-panoramic"
            className={styles.slidePanoramic}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Background High-res Panoramic Photo */}
            <div className={styles.panoramicBackdrop}>
              <img 
                src="/images/hero_banner_panoramic.jpg" 
                alt="Gen Z Việt Phục Remix trên Hoàng Thành" 
                className={styles.panoramicImg}
              />
              <div className={styles.panoramicOverlay}></div>
            </div>

            {/* Authentic Red Seal Stamp in Photo Corner */}
            <div className={styles.cornerSeal}>
              <div className={styles.sealBox}>
                <span>CỔ</span>
                <span>PHỤC</span>
                <div className={styles.sealLine}></div>
                <span>VIỆT</span>
                <span>NAM</span>
              </div>
            </div>

            {/* Content Floating on Top */}
            <div className={`container ${styles.slideContent}`}>
              <div className={styles.heroBadgeGold}>
                <Sparkles size={14} />
                <span>Audition 2026 • Khám Phá Việt Phục Theo Phong Cách Mới</span>
              </div>

              <h1 className={styles.mainHeading}>
                VIỆT PHỤC REMIX
                <span className={styles.subHeading}>Gìn Nét Xưa • Bật Chất Nay</span>
              </h1>

              <p className={styles.description}>
                Không gian sáng tạo dành riêng cho học sinh, sinh viên khám phá chiều sâu văn hóa của 
                <strong> Áo Ngũ Thân, Áo Tấc, Nhật Bình và Tứ Thân</strong>. 
                Trải nghiệm quẹt thẻ phối đồ hiện đại, tự tin hòa nhịp thời trang đường phố cùng Trợ lý Nghê Thần.
              </p>

              <div className={styles.ctaRow}>
                <button className={styles.btnGoldShimmer} onClick={onStartStyling}>
                  <span>Bắt đầu phòng phối đồ</span>
                  <ArrowRight size={18} />
                </button>
                <button className={styles.btnWhiteGlass} onClick={onExploreLookbooks}>
                  <Compass size={18} />
                  <span>Khám phá Lookbook</span>
                </button>
              </div>

              {/* Value proposition badges */}
              <div className={styles.trustBadges}>
                <div className={styles.trustItem}>
                  <ShieldCheck size={16} className={styles.trustIconGold} />
                  <span>100% Chuẩn mực nghiên cứu di sản</span>
                </div>
                <div className={styles.trustItem}>
                  <Flame size={16} className={styles.trustIconFlame} />
                  <span>Cơ chế quẹt thẻ Tinder-style Gen Z</span>
                </div>
              </div>
            </div>

            {/* Bottom Silk Wave Curve */}
            <div className={styles.waveCurve}>
              <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
                <path d="M0,32L80,42.7C160,53,320,75,480,69.3C640,64,800,32,960,26.7C1120,21,1280,43,1360,53.3L1440,64L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z" fill="#FAF7F2"></path>
              </svg>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
              SLIDE 1: CẢM HỨNG VIETPHUCCUOI.COM - SẮC ĐỎ HOÀNG KIM & LỒNG ĐÈN CUNG ĐÌNH
             ========================================================================= */
          <motion.div 
            key="slide-royal-crimson"
            className={styles.slideRoyal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Hanging Ornate Imperial Lantern */}
            <div className={styles.lanternWrapper}>
              <img 
                src="/images/lantern.jpg" 
                alt="Lồng đèn cung đình thêu phụng" 
                className={styles.lanternImg}
              />
            </div>

            <div className={`container ${styles.royalGrid}`}>
              {/* Left Column: Bold Royal Typography */}
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
                  Với thế hệ trẻ, đó là niềm tự hào mang cốt cách dân tộc hòa cùng nhịp sống đương đại.”
                </blockquote>

                <div className={styles.ctaRow}>
                  <button className={styles.btnGoldShimmer} onClick={onStartStyling}>
                    <span>Thử nghiệm phối đồ ngay</span>
                    <ArrowRight size={18} />
                  </button>
                  <button className={styles.btnWhiteGlass} onClick={onExploreLookbooks}>
                    <Compass size={18} />
                    <span>Xem Tủ Lookbook</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Featured Circular Framed Visual */}
              <div className={styles.royalVisualCol}>
                <div className={styles.circularFrameGlow}></div>
                <div className={styles.circularFrame}>
                  <img 
                    src="/costumes/ao_nhat_binh.jpg" 
                    alt="Áo Nhật Bình Hoàng Tộc" 
                    className={styles.circularImg}
                  />
                  <div className={styles.frameTag}>
                    <span className={styles.frameTagTitle}>Đại Lễ Phục Nhật Bình</span>
                    <span className={styles.frameTagSub}>Hoàng tộc Triều Nguyễn</span>
                  </div>
                </div>

                {/* Floating Mascot Sticker */}
                <div className={styles.mascotPill}>
                  <span className={styles.mascotEmoji}>🦁</span>
                  <div>
                    <strong>Trợ lý Nghê Thần</strong>
                    <small>Đồng hành gìn giữ cốt cách</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Silk Wave Transition like vietphuccuoi.com */}
            <div className={styles.waveCurve}>
              <svg viewBox="0 0 1440 90" fill="none" preserveAspectRatio="none">
                <path d="M0,40 C320,100 420,-10 740,40 C1040,90 1200,10 1440,50 L1440,90 L0,90 Z" fill="#FAF7F2"></path>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide Switcher Pagination Dots */}
      <div className={styles.paginationDots}>
        <button 
          className={`${styles.dotBtn} ${activeSlide === 0 ? styles.dotActive : ''}`}
          onClick={() => setActiveSlide(0)}
        >
          <span>1. Gen Z Rạng Rỡ Phố Cổ</span>
        </button>
        <button 
          className={`${styles.dotBtn} ${activeSlide === 1 ? styles.dotActive : ''}`}
          onClick={() => setActiveSlide(1)}
        >
          <span>2. Sắc Đỏ Hoàng Kim Cố Đô</span>
        </button>
      </div>
    </section>
  );
}
