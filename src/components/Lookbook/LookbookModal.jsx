import React, { useRef, useEffect, useState } from 'react';
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
import GeminiService from '../../data/geminiService';
import styles from './LookbookModal.module.css';

export default function LookbookModal({ 
  lookData, 
  onClose, 
  onSaveToGallery, 
  onRemix 
}) {
  const magazineRef = useRef(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (lookData) {
      // Reset state & trigger AI Gen
      setGeneratedImageUrl(null);
      setIsGenerating(true);

      const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const hfKey = import.meta.env.VITE_HF_API_KEY;

      GeminiService.generateOutfitImage({
        costumeName: lookData.costume.name,
        bottomName: lookData.bottom.name,
        tradAccName: lookData.footwear.name,
        genzAccName: lookData.headwear.name,
        occasionName: lookData.occasion.name,
        colorPalette: lookData.costume.colorScheme
      }, geminiKey, hfKey)
      .then(res => {
        // Gắn URL mới vào state, nhưng chưa tắt loading.
        // Tắt loading sẽ do thẻ <img> đảm nhận (onLoad/onError).
        setGeneratedImageUrl(res.imageUrl);
      })
      .catch(err => {
        console.error("AI Gen Failed:", err);
        setIsGenerating(false);
      });

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

  const { costume, bottom, footwear, headwear, occasion, harmonyScore } = lookData;

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
                {isGenerating && (
                  <div className={styles.aiLoadingPlaceholder} style={{ position: 'absolute', top: 0, left: 0, zIndex: 10, width: '100%', height: '100%', minHeight: '400px', backgroundColor: '#e2d5c3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <span className={styles.spinnerEmoji} style={{ fontSize: '2rem', animation: 'spin 2s linear infinite' }}>🎨</span>
                    <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#582F0E' }}>Nghê Thần đang vẽ ảnh AI...</p>
                    <small style={{ marginTop: '5px', color: '#888', textAlign: 'center', padding: '0 10px' }}>
                      (Nếu dùng server miễn phí có thể mất tới 30 giây, vui lòng đợi...)
                    </small>
                  </div>
                )}
                
                <img 
                  src={generatedImageUrl || costume.image} 
                  alt={costume.name} 
                  className={styles.magImg}
                  style={{ display: isGenerating ? 'none' : 'block' }}
                  onLoad={() => {
                    // Nếu ảnh load thành công (bao gồm cả ảnh AI hoặc ảnh gốc)
                    setIsGenerating(false);
                  }}
                  onError={(e) => {
                    console.error("Lỗi load ảnh:", e.target.src);
                    setGeneratedImageUrl(null); // Fallback về ảnh gốc
                    setIsGenerating(false);
                  }}
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
                  <span className={styles.itemLabel}>Giày dép</span>
                  <strong className={styles.itemName}>{footwear.name}</strong>
                </div>
                <div className={styles.gridItem}>
                  <span className={styles.itemLabel}>Mũ / Phụ Kiện</span>
                  <strong className={styles.itemNameRemix}>{headwear.name}</strong>
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
