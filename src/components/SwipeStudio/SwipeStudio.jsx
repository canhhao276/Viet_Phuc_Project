import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RotateCcw, 
  Check, 
  X, 
  Sparkles, 
  Shirt, 
  Layers, 
  Compass, 
  Glasses, 
  Award,
  ChevronRight,
  Info,
  Footprints
} from 'lucide-react';
import { 
  COSTUMES, 
  BOTTOMS, 
  FOOTWEAR, 
  HEADWEAR
} from '../../data/mockData';
import { calculateDetailedHarmony } from '../../data/outfitRules';
import { processNgheThanFeedback } from '../../data/ngheThanEngine';
import styles from './SwipeStudio.module.css';

export default function SwipeStudio({ 
  selectedOccasion, 
  onFinishLook, 
  onTriggerWarning 
}) {
  // Tabs cho Truyền thống / Hiện đại
  const [activeTab, setActiveTab] = useState('traditional'); // 'traditional' | 'remix'

  // Current active step: 0 = Áo, 1 = Quần/Váy, 2 = Giày dép, 3 = Mũ/Phụ kiện
  const [currentStep, setCurrentStep] = useState(0);

  // Selections
  const [selectedCostume, setSelectedCostume] = useState(COSTUMES[0]);
  const [selectedBottom, setSelectedBottom] = useState(BOTTOMS[0]);
  const [selectedFootwear, setSelectedFootwear] = useState(FOOTWEAR[0]);
  const [selectedHeadwear, setSelectedHeadwear] = useState(HEADWEAR[0]);

  // Card index tracking for Swipe deck in Step 0 (Costumes)
  const [costumeDeckIndex, setCostumeDeckIndex] = useState(0);
  const filteredCostumes = COSTUMES.filter(c => c.type === activeTab);

  // Reset deck index when switching tabs
  React.useEffect(() => {
    setCostumeDeckIndex(0);
    if (filteredCostumes.length > 0 && currentStep === 0) {
      setSelectedCostume(filteredCostumes[0]);
    }
  }, [activeTab, currentStep]);

  // Check cultural rules using Data Member's Engine
  const checkRules = (c, b, fw, hw) => {
    const outfitData = {
      costume: c || selectedCostume,
      bottom: b || selectedBottom,
      footwear: fw || selectedFootwear,
      headwear: hw || selectedHeadwear,
      occasion: selectedOccasion
    };
    
    const harmony = calculateDetailedHarmony(outfitData);
    const feedback = processNgheThanFeedback(outfitData, harmony.score);

    if (feedback && feedback.severity !== 'praise') {
      onTriggerWarning(feedback);
      // Nếu là critical thì chặn không cho hoàn tất, warning/info thì cho qua
      return feedback.severity !== 'critical';
    }
    return true;
  };

  // Handle Swipe Left (Reject / Next)
  const handleSwipeLeft = () => {
    if (costumeDeckIndex < filteredCostumes.length - 1) {
      setCostumeDeckIndex(prev => prev + 1);
      setSelectedCostume(filteredCostumes[costumeDeckIndex + 1]);
    } else {
      setCostumeDeckIndex(0);
      setSelectedCostume(filteredCostumes[0]);
    }
  };

  // Handle Swipe Right (Accept / Lock in)
  const handleSwipeRight = () => {
    // Lock in costume and move to step 1
    setCurrentStep(1);
  };

  // Calculate real harmony score using advanced logic
  const calculateHarmony = () => {
    const harmony = calculateDetailedHarmony({
      costume: selectedCostume,
      bottom: selectedBottom,
      footwear: selectedFootwear,
      headwear: selectedHeadwear,
      occasion: selectedOccasion
    });
    return harmony.score;
  };

  const handleCompleteLook = () => {
    const isClean = checkRules(selectedCostume, selectedBottom, selectedFootwear, selectedHeadwear);
    if (!isClean) return;

    onFinishLook({
      costume: selectedCostume,
      bottom: selectedBottom,
      footwear: selectedFootwear,
      headwear: selectedHeadwear,
      occasion: selectedOccasion,
      harmonyScore: calculateHarmony()
    });
  };

  const currentCostumeCard = filteredCostumes[costumeDeckIndex] || COSTUMES[0];

  return (
    <section id="studio" className={styles.studioSection}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.headerBlock}>
          <div className="badge badge-gold">
            <Sparkles size={14} />
            <span>Bước 2: Phòng Phối Đồ Quẹt Thẻ</span>
          </div>
          <h2 className={styles.title}>Quẹt Thẻ • Chọn Nét Riêng</h2>
          <p className={styles.subtitle}>
            Trải nghiệm vuốt chọn từng lớp xiêm y. 
            <span className={styles.swipeTip}>
              <strong>Vuốt phải</strong>: Chốt món • <strong>Vuốt trái</strong>: Đổi món khác
            </span>
          </p>

          {/* Stepper Tabs */}
          <div className={styles.stepperNav}>
            <button 
              className={`${styles.stepTab} ${currentStep === 0 ? styles.stepTabActive : ''}`}
              onClick={() => setCurrentStep(0)}
            >
              <Shirt size={16} />
              <span>1. Áo Chính</span>
            </button>
            <button 
              className={`${styles.stepTab} ${currentStep === 1 ? styles.stepTabActive : ''}`}
              onClick={() => setCurrentStep(1)}
            >
              <Layers size={16} />
              <span>2. Quần / Lớp trong</span>
            </button>
            <button 
              className={`${styles.stepTab} ${currentStep === 2 ? styles.stepTabActive : ''}`}
              onClick={() => setCurrentStep(2)}
            >
              <Footprints size={16} />
              <span>3. Giày Dép</span>
            </button>
            <button 
              className={`${styles.stepTab} ${currentStep === 3 ? styles.stepTabActive : ''}`}
              onClick={() => setCurrentStep(3)}
            >
              <Glasses size={16} />
              <span>4. Mũ / Phụ Kiện</span>
            </button>
          </div>

          {/* Type Tabs Filter (Truyền thống vs Hiện đại) */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' }}>
            <button 
              onClick={() => setActiveTab('traditional')}
              style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #D4AF37', background: activeTab === 'traditional' ? '#D4AF37' : 'transparent', color: activeTab === 'traditional' ? '#fff' : '#D4AF37', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Truyền Thống
            </button>
            <button 
              onClick={() => setActiveTab('remix')}
              style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #9E2A2B', background: activeTab === 'remix' ? '#9E2A2B' : 'transparent', color: activeTab === 'remix' ? '#fff' : '#9E2A2B', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Hiện Đại (Remix)
            </button>
          </div>
        </div>

        {/* Studio Workspace: Left Interactive Deck / Grid, Right Live Outfit Summary */}
        <div className={styles.workspaceGrid}>
          
          {/* Main Interaction Area */}
          <div className={styles.interactionArea}>
            {/* STEP 0: TINDER SWIPE DECK FOR MAIN COSTUME */}
            {currentStep === 0 && (
              <div className={styles.swipeDeckContainer}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCostumeCard.id}
                    className={styles.swipeCard}
                    initial={{ scale: 0.95, opacity: 0, y: 15 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, x: -80 }}
                    transition={{ duration: 0.28 }}
                    drag="x"
                    dragConstraints={{ left: -100, right: 100 }}
                    onDragEnd={(e, { offset }) => {
                      if (offset.x > 80) handleSwipeRight();
                      else if (offset.x < -80) handleSwipeLeft();
                    }}
                  >
                    <div className={styles.cardMedia}>
                      <img 
                        src={currentCostumeCard.image} 
                        alt={currentCostumeCard.name} 
                        className={styles.cardImg}
                      />
                      <div className={styles.mediaOverlay}></div>
                      <div className={styles.dynastyBadge}>
                        {currentCostumeCard.dynasty}
                      </div>
                    </div>

                    <div className={styles.cardDetails}>
                      <div className={styles.cardCategory}>
                        {currentCostumeCard.category}
                      </div>
                      <h3 className={styles.cardTitle}>{currentCostumeCard.name}</h3>
                      <p className={styles.cardStory}>{currentCostumeCard.story}</p>

                      <div className={styles.cardTags}>
                        {currentCostumeCard.tags.map(t => (
                          <span key={t} className={styles.metaTag}>#{t}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Swipe Action Buttons */}
                <div className={styles.swipeActionsBar}>
                  <button 
                    className={`${styles.actionBtn} ${styles.actionBtnPass}`}
                    onClick={handleSwipeLeft}
                    title="Đổi mẫu áo khác"
                  >
                    <X size={26} />
                    <span>Đổi mẫu khác</span>
                  </button>

                  <button 
                    className={`${styles.actionBtn} ${styles.actionBtnPick}`}
                    onClick={handleSwipeRight}
                    title="Chốt mẫu áo này"
                  >
                    <Check size={26} />
                    <span>Chốt áo này</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 1: SELECT BOTTOMS */}
            {currentStep === 1 && (
              <div className={styles.gridSelection}>
                <h4 className={styles.stepTitle}>Chọn Quần / Váy ({activeTab === 'traditional' ? 'Truyền Thống' : 'Hiện Đại'})</h4>
                <div className={styles.optionsList}>
                  {BOTTOMS.filter(b => b.type === activeTab).map((bottom) => {
                    const isSelected = selectedBottom.id === bottom.id;
                    return (
                      <div 
                        key={bottom.id}
                        className={`${styles.optionCard} ${isSelected ? styles.optionCardActive : ''}`}
                        onClick={() => {
                          setSelectedBottom(bottom);
                          checkRules(selectedCostume, bottom, selectedFootwear, selectedHeadwear);
                        }}
                      >
                        <div 
                          className={styles.colorSwatch} 
                          style={{ backgroundColor: bottom.color }}
                        />
                        <div className={styles.optionInfo}>
                          <strong>{bottom.name}</strong>
                          <p>{bottom.description}</p>
                        </div>
                        {isSelected && <Check size={20} className={styles.selectedIcon} />}
                      </div>
                    );
                  })}
                </div>
                <button className="btn btn-primary" onClick={() => setCurrentStep(2)}>
                  <span>Tiếp tục: Giày Dép</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* STEP 2: SELECT FOOTWEAR */}
            {currentStep === 2 && (
              <div className={styles.gridSelection}>
                <h4 className={styles.stepTitle}>Chọn Giày Dép ({activeTab === 'traditional' ? 'Truyền Thống' : 'Hiện Đại'})</h4>
                <div className={styles.optionsList}>
                  {FOOTWEAR.filter(f => f.type === activeTab).map((acc) => {
                    const isSelected = selectedFootwear.id === acc.id;
                    return (
                      <div 
                        key={acc.id}
                        className={`${styles.optionCard} ${isSelected ? styles.optionCardActive : ''}`}
                        onClick={() => {
                          setSelectedFootwear(acc);
                          checkRules(selectedCostume, selectedBottom, acc, selectedHeadwear);
                        }}
                      >
                        <div className={styles.accBadge}>
                          <Sparkles size={20} />
                        </div>
                        <div className={styles.optionInfo}>
                          <strong>{acc.name}</strong>
                          <p>{acc.desc}</p>
                        </div>
                        {isSelected && <Check size={20} className={styles.selectedIcon} />}
                      </div>
                    );
                  })}
                </div>
                <button className="btn btn-primary" onClick={() => setCurrentStep(3)}>
                  <span>Tiếp tục: Mũ / Phụ Kiện</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* STEP 3: SELECT HEADWEAR/ACCESSORIES */}
            {currentStep === 3 && (
              <div className={styles.gridSelection}>
                <h4 className={styles.stepTitle}>Thêm Điểm Nhấn Phụ Kiện ({activeTab === 'traditional' ? 'Truyền Thống' : 'Hiện Đại'})</h4>
                <div className={styles.optionsList}>
                  {HEADWEAR.filter(h => h.type === activeTab).map((acc) => {
                    const isSelected = selectedHeadwear.id === acc.id;
                    return (
                      <div 
                        key={acc.id}
                        className={`${styles.optionCard} ${isSelected ? styles.optionCardActive : ''}`}
                        onClick={() => {
                          setSelectedHeadwear(acc);
                          checkRules(selectedCostume, selectedBottom, selectedFootwear, acc);
                        }}
                      >
                        <div className={styles.accBadgeGenz}>
                          <Glasses size={20} />
                        </div>
                        <div className={styles.optionInfo}>
                          <strong>{acc.name}</strong>
                          <p>{acc.desc}</p>
                        </div>
                        {isSelected && <Check size={20} className={styles.selectedIcon} />}
                      </div>
                    );
                  })}
                </div>
                <button className="btn btn-gold" onClick={handleCompleteLook}>
                  <Sparkles size={18} />
                  <span>Hoàn tất & Xuất Tạp Chí Lookbook</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Live Outfit Summary Card */}
          <div className={styles.outfitPreviewCard}>
            <div className={styles.previewHeader}>
              <span className={styles.previewEyebrow}>OUTFIT ĐANG PHỐI</span>
              <h4 className={styles.previewTitle}>{selectedOccasion.name}</h4>
            </div>

            {/* Visual Thumbnail */}
            <div className={styles.previewThumbnail}>
              <img 
                src={selectedCostume.image} 
                alt={selectedCostume.name} 
                className={styles.thumbnailImg}
              />
              <div className={styles.previewOverlayBadge}>
                {selectedCostume.name}
              </div>
            </div>

            {/* Breakdown List */}
            <div className={styles.breakdownList}>
              <div className={styles.breakdownRow}>
                <span className={styles.rowLabel}>Áo chính:</span>
                <strong className={styles.rowValue}>{selectedCostume.name}</strong>
              </div>
              <div className={styles.breakdownRow}>
                <span className={styles.rowLabel}>Lớp trong:</span>
                <span className={styles.rowValue}>{selectedBottom.name}</span>
              </div>
              <div className={styles.breakdownRow}>
                <span className={styles.rowLabel}>Giày dép:</span>
                <span className={styles.rowValue}>{selectedFootwear.name}</span>
              </div>
              <div className={styles.breakdownRow}>
                <span className={styles.rowLabel}>Mũ/Phụ kiện:</span>
                <span className={styles.rowValueBadge}>{selectedHeadwear.name}</span>
              </div>
            </div>

            {/* Cultural Harmony Score Bar */}
            <div className={styles.harmonyScoreBox}>
              <div className={styles.scoreRow}>
                <span className={styles.scoreLabel}>Chỉ số hài hòa văn hóa</span>
                <strong className={styles.scorePercent}>{calculateHarmony()}%</strong>
              </div>
              <div className={styles.scoreTrack}>
                <div 
                  className={styles.scoreFill} 
                  style={{ width: `${calculateHarmony()}%` }}
                />
              </div>
              <div className={styles.scoreNote}>
                <Info size={13} />
                <span>Đã kiểm định qua dữ liệu Nghi lễ & Cốt cách</span>
              </div>
            </div>

            {/* Quick Finish Button */}
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '12px' }}
              onClick={handleCompleteLook}
            >
              <Sparkles size={18} />
              <span>Chốt Bộ Phối & Tạo Lookbook</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
