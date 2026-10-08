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
  const [imageMeta, setImageMeta] = useState({ engine: 'Đang tải...', isAi: false });

  useEffect(() => {
    if (lookData) {
      // Reset state & trigger AI Gen
      setGeneratedImageUrl(null);
      setIsGenerating(true);
      setImageMeta({ engine: 'Đang kết nối AI...', isAi: false });

      const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const segmindKey = import.meta.env.VITE_SEGMIND_API_KEY;
      const hfToken = import.meta.env.VITE_HF_TOKEN;

      GeminiService.generateOutfitImage({
        costumeId: lookData.costume.id,
        costumeName: lookData.costume.name,
        bottomName: lookData.bottom.name,
        tradAccName: lookData.footwear.name,
        genzAccName: lookData.headwear.name,
        occasionName: lookData.occasion.name,
        colorPalette: lookData.costume.colorScheme
      }, geminiKey, segmindKey, hfToken)
      .then(res => {
        if (res && res.imageUrl) {
          setGeneratedImageUrl(res.imageUrl);
          setImageMeta({
            engine: res.engine || (res.isAiGenerated ? 'AI FLUX.1 ZeroGPU' : 'Tuyệt Tác Di Sản'),
            isAi: !!res.isAiGenerated
          });
        } else {
          setGeneratedImageUrl(lookData.costume.image);
          setImageMeta({ engine: 'Tuyệt Tác Di Sản', isAi: false });
        }
      })
      .catch(err => {
        console.error("AI Gen Failed:", err);
        setGeneratedImageUrl(lookData.costume.image);
        setImageMeta({ engine: 'Tuyệt Tác Di Sản', isAi: false });
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
          {/* Full-screen Loading Overlay */}
          {isGenerating && (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(250, 248, 245, 0.96)', zIndex: 9999, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: 'inherit', backdropFilter: 'blur(8px)' }}>
              <span style={{ fontSize: '4rem', animation: 'spin 2s linear infinite', display: 'inline-block' }}>🎨</span>
              <h2 style={{ color: '#9E2A2B', marginTop: '20px', fontSize: '1.8rem', textAlign: 'center', fontFamily: "'Cinzel Decorative', serif" }}>Đang sáng tác Lookbook Tạp Chí...</h2>
              <p style={{ color: '#582F0E', marginTop: '10px', textAlign: 'center', maxWidth: '80%', fontSize: '1.05rem', lineHeight: '1.6' }}>
                Hệ thống AI đang kết nối GPU ZeroGPU (FLUX.1-schnell) để phác họa vẻ đẹp trang phục của bạn.<br/>Quá trình sáng tác mất khoảng 5 - 15 giây.
              </p>
              
              <style>
                {`
                  @keyframes spin {
                    0% { transform: rotate(0deg) scale(1); }
                    50% { transform: rotate(180deg) scale(1.18); }
                    100% { transform: rotate(360deg) scale(1); }
                  }
                `}
              </style>
            </div>
          )}

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
                {/* Floating Source Badge: AI FLUX hoặc Tuyệt Tác Di Sản */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  zIndex: 12,
                  backgroundColor: imageMeta.isAi ? 'rgba(31, 78, 70, 0.92)' : 'rgba(158, 42, 43, 0.92)',
                  color: '#FFFFFF',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  letterSpacing: '0.5px',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid rgba(255,255,255,0.25)'
                }}>
                  <span>{imageMeta.isAi ? '⚡' : '👑'}</span>
                  <span>{imageMeta.engine || (imageMeta.isAi ? 'AI FLUX.1 • ZeroGPU' : 'Tuyệt Tác Di Sản Hoàng Gia')}</span>
                </div>
                
                <img 
                  src={generatedImageUrl || costume.image} 
                  alt={costume.name} 
                  className={styles.magImg}
                  crossOrigin="anonymous"
                  style={{ display: isGenerating ? 'none' : 'block', opacity: 1 }}
                  onLoad={() => {
                    // Khi ảnh load xong, tắt overlay loading
                    setIsGenerating(false);
                  }}
                  onError={(e) => {
                    console.error("Lỗi load ảnh:", e.target.src);
                    setGeneratedImageUrl(costume.image);
                    setImageMeta({ engine: 'Di Sản Hoàng Gia', isAi: false });
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
