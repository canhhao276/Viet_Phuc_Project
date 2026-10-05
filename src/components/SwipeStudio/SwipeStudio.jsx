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
  Info
} from 'lucide-react';
import { 
  COSTUMES, 
  BOTTOMS, 
  ACCESSORIES_TRADITIONAL, 
  ACCESSORIES_GENZ,
  CULTURAL_RULES 
} from '../../data/mockData';
import styles from './SwipeStudio.module.css';

export default function SwipeStudio({ 
  selectedOccasion, 
  onFinishLook, 
  onTriggerWarning 
}) {
  // Current active step: 0 = Áo chính, 1 = Quần/Váy, 2 = Phụ kiện Cổ truyền, 3 = Phụ kiện Remix Gen Z
  const [currentStep, setCurrentStep] = useState(0);

  // Selections
  const [selectedCostume, setSelectedCostume] = useState(COSTUMES[0]);
  const [selectedBottom, setSelectedBottom] = useState(BOTTOMS[0]);
  const [selectedTradAcc, setSelectedTradAcc] = useState(ACCESSORIES_TRADITIONAL[0]);
  const [selectedGenzAcc, setSelectedGenzAcc] = useState(ACCESSORIES_GENZ[0]);

  // Card index tracking for Swipe deck in Step 0 (Costumes)
  const [costumeDeckIndex, setCostumeDeckIndex] = useState(0);

  // Check cultural rules whenever selection changes
  const checkRules = (costume, bottom, genzAcc) => {
    for (const rule of CULTURAL_RULES) {
      if (rule.costumeId === costume.id) {
        if (rule.prohibitedBottom && bottom && rule.prohibitedBottom === bottom.id) {
          onTriggerWarning(rule);
          return false;
        }
        if (rule.prohibitedGenz && genzAcc && rule.prohibitedGenz === genzAcc.id) {
          if (!rule.triggerWhenOccasion || rule.triggerWhenOccasion === selectedOccasion.id) {
            onTriggerWarning(rule);
            return false;
          }
        }
      }
    }
    return true;
  };

  // Handle Swipe Left (Reject / Next)
  const handleSwipeLeft = () => {
    if (costumeDeckIndex < COSTUMES.length - 1) {
      setCostumeDeckIndex(prev => prev + 1);
      setSelectedCostume(COSTUMES[costumeDeckIndex + 1]);
    } else {
      setCostumeDeckIndex(0);
      setSelectedCostume(COSTUMES[0]);
    }
  };

  // Handle Swipe Right (Accept / Lock in)
  const handleSwipeRight = () => {
    // Lock in costume and move to step 1
    setCurrentStep(1);
  };

  // Calculate harmony score
  const calculateHarmony = () => {
    let score = 95;
    if (selectedOccasion.recommendedCostumes.includes(selectedCostume.id)) {
      score += 4;
    }
    return Math.min(score, 100);
  };

  const handleCompleteLook = () => {
    const isClean = checkRules(selectedCostume, selectedBottom, selectedGenzAcc);
    if (!isClean) return;

    onFinishLook({
      costume: selectedCostume,
      bottom: selectedBottom,
      tradAcc: selectedTradAcc,
      genzAcc: selectedGenzAcc,
      occasion: selectedOccasion,
      harmonyScore: calculateHarmony()
    });
  };

  const currentCostumeCard = COSTUMES[costumeDeckIndex];

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
              <Compass size={16} />
              <span>3. Phụ kiện Cổ truyền</span>
            </button>
            <button 
              className={`${styles.stepTab} ${currentStep === 3 ? styles.stepTabActive : ''}`}
              onClick={() => setCurrentStep(3)}
            >
              <Glasses size={16} />
              <span>4. Remix Gen Z</span>
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
                <h4 className={styles.stepTitle}>Chọn Quần / Váy phối cùng {selectedCostume.name}</h4>
                <div className={styles.optionsList}>
                  {BOTTOMS.map((bottom) => {
                    const isSelected = selectedBottom.id === bottom.id;
                    return (
                      <div 
                        key={bottom.id}
                        className={`${styles.optionCard} ${isSelected ? styles.optionCardActive : ''}`}
                        onClick={() => {
                          setSelectedBottom(bottom);
                          checkRules(selectedCostume, bottom, selectedGenzAcc);
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
                  <span>Tiếp tục: Phụ kiện Cổ truyền</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* STEP 2: SELECT TRADITIONAL ACCESSORIES */}
            {currentStep === 2 && (
              <div className={styles.gridSelection}>
                <h4 className={styles.stepTitle}>Chọn Phụ kiện Truyền thống tôn nét quý phái</h4>
                <div className={styles.optionsList}>
                  {ACCESSORIES_TRADITIONAL.map((acc) => {
                    const isSelected = selectedTradAcc.id === acc.id;
                    return (
                      <div 
                        key={acc.id}
                        className={`${styles.optionCard} ${isSelected ? styles.optionCardActive : ''}`}
                        onClick={() => setSelectedTradAcc(acc)}
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
                  <span>Tiếp tục: Phụ kiện Remix Gen Z</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* STEP 3: SELECT GEN Z REMIX ACCENTS */}
            {currentStep === 3 && (
              <div className={styles.gridSelection}>
                <h4 className={styles.stepTitle}>Thêm Chất Gen Z • Tạo Điểm Nhấn Phá Cách</h4>
                <div className={styles.optionsList}>
                  {ACCESSORIES_GENZ.map((acc) => {
                    const isSelected = selectedGenzAcc.id === acc.id;
                    return (
                      <div 
                        key={acc.id}
                        className={`${styles.optionCard} ${isSelected ? styles.optionCardActive : ''}`}
                        onClick={() => {
                          setSelectedGenzAcc(acc);
                          checkRules(selectedCostume, selectedBottom, acc);
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
                <span className={styles.rowLabel}>Cổ truyền:</span>
                <span className={styles.rowValue}>{selectedTradAcc.name}</span>
              </div>
              <div className={styles.breakdownRow}>
                <span className={styles.rowLabel}>Gen Z Remix:</span>
                <span className={styles.rowValueBadge}>{selectedGenzAcc.name}</span>
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
