import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  Share2, 
  Sparkles, 
  RotateCcw, 
  Heart, 
  BookmarkCheck,
  CheckCircle,
  Palette,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import styles from './LookbookModal.module.css';

export default function LookbookModal({ 
  lookData, 
  onClose, 
  onSaveToGallery, 
  onRemix 
}) {
  const magazineRef = useRef(null);

  useEffect(() => {
    if (lookData) {
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#9E2A2B', '#C99700', '#F4D35E', '#1F4E46']
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [lookData]);

  if (!lookData) return null;

  const { costume, bottom, tradAcc, genzAcc, occasion, harmonyScore } = lookData;

  // Handle Export Lookbook as Image (html2canvas)
  const handleDownloadImage = async () => {
    if (!magazineRef.current) return;
    try {
      const canvas = await html2canvas(magazineRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FAF8F5'
      });
      const link = document.createElement('a');
      link.download = `viet-phuc-remix-${costume.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to export lookbook image:', err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Việt Phục Remix - ${costume.name}`,
        text: `Xem bản phối Việt Phục phong cách Gen Z của mình cho dịp ${occasion.name}!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép link Lookbook vào clipboard!');
    }
  };

  return (
    <AnimatePresence>
      <div className={styles.backdrop} onClick={onClose}>
        <motion.div 
          className={styles.modalContainer}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Action bar */}
          <div className={styles.topBar}>
            <div className={styles.topStatus}>
              <span className={styles.confettiEmoji}>🎉</span>
              <div>
                <strong>Bản Phối Hoàn Thiện!</strong>
                <small>Điểm hài hòa văn hóa: {harmonyScore}%</small>
              </div>
            </div>

            <button className={styles.closeBtn} onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {/* Editorial Magazine Lookbook Canvas (Target for html2canvas) */}
          <div className={styles.magazineWrapper}>
            <div ref={magazineRef} className={styles.magazineCard}>
              
              {/* Editorial Header */}
              <div className={styles.magHeader}>
                <div className={styles.magLogo}>VIỆT PHỤC REMIX</div>
                <div className={styles.magMeta}>ISSUE 2026 • GEN Z HERITAGE EDITION</div>
              </div>

              {/* Main Photo Showcase */}
              <div className={styles.magPhotoFrame}>
                <img 
                  src={costume.image} 
                  alt={costume.name} 
                  className={styles.magImg}
                />
                <div className={styles.magOverlay}></div>
                
                {/* Floating Stamp */}
                <div className={styles.heritageStamp}>
                  <span>NGHÊ THẦN</span>
                  <small>BẢO CHỨNG</small>
                </div>

                <div className={styles.photoCaption}>
                  <span className={styles.occasionPill}>{occasion.name}</span>
                  <h2 className={styles.costumeTitle}>{costume.name}</h2>
                  <p className={styles.dynastyYear}>{costume.dynasty}</p>
                </div>
              </div>

              {/* Outfit Breakdown Section */}
              <div className={styles.outfitGrid}>
                <div className={styles.gridItem}>
                  <span className={styles.itemLabel}>Lớp trong / Quần</span>
                  <strong className={styles.itemName}>{bottom.name}</strong>
                </div>
                <div className={styles.gridItem}>
                  <span className={styles.itemLabel}>Phụ kiện Cổ truyền</span>
                  <strong className={styles.itemName}>{tradAcc.name}</strong>
                </div>
                <div className={styles.gridItem}>
                  <span className={styles.itemLabel}>Điểm nhấn Gen Z</span>
                  <strong className={styles.itemNameRemix}>{genzAcc.name}</strong>
                </div>
              </div>

              {/* Cultural Flashcard Story Box */}
              <div className={styles.flashcardBox}>
                <div className={styles.flashcardHeader}>
                  <BookOpen size={16} />
                  <span>Ý NGHĨA VĂN HÓA & NGUỒN GỐC</span>
                </div>
                <p className={styles.flashcardContent}>
                  {costume.story}
                </p>
              </div>

              {/* Magazine Footer */}
              <div className={styles.magFooter}>
                <div className={styles.colorPalette}>
                  {costume.colorScheme.map((c, i) => (
                    <span 
                      key={i} 
                      className={styles.paletteDot} 
                      style={{ backgroundColor: c }}
                      title={`Màu ${c}`}
                    />
                  ))}
                  <span className={styles.paletteLabel}>Hệ màu di sản</span>
                </div>
                <div className={styles.brandSignature}>
                  vietphuc-remix.vn
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className={styles.bottomBar}>
            <button className="btn btn-outline" onClick={handleDownloadImage}>
              <Download size={18} />
              <span>Tải ảnh bìa lookbook</span>
            </button>
            <button className="btn btn-outline" onClick={handleShare}>
              <Share2 size={18} />
              <span>Chia sẻ</span>
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => {
                onSaveToGallery(lookData);
                onClose();
              }}
            >
              <BookmarkCheck size={18} />
              <span>Lưu vào Lookbook Chuyền Tay</span>
            </button>
            <button 
              className="btn btn-gold" 
              onClick={() => {
                onRemix(lookData);
                onClose();
              }}
            >
              <RotateCcw size={18} />
              <span>Remix lại look này</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
