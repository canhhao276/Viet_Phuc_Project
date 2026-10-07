import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RotateCw, 
  RotateCcw, 
  Check, 
  Sparkles, 
  Shirt, 
  Layers, 
  Compass, 
  Glasses, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Clock, 
  Info, 
  Star,
  CheckCircle2,
  ArrowRight,
  Sparkle
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
  // Steps: 0 = Áo chính (Flashcard), 1 = Quần/Váy, 2 = Phụ kiện Cổ truyền, 3 = Remix Gen Z
  const [currentStep, setCurrentStep] = useState(0);

  // Selections
  const [selectedCostume, setSelectedCostume] = useState(COSTUMES[0]);
  const [selectedBottom, setSelectedBottom] = useState(BOTTOMS[0]);
  const [selectedTradAcc, setSelectedTradAcc] = useState(ACCESSORIES_TRADITIONAL[0]);
  const [selectedGenzAcc, setSelectedGenzAcc] = useState(ACCESSORIES_GENZ[0]);

  // Index of active costume in Step 0
  const [costumeIndex, setCostumeIndex] = useState(0);

  // 3D Flip state for the active costume Flashcard
  const [isFlipped, setIsFlipped] = useState(false);

  // Check cultural mismatch rules
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

  // Change costume index safely & reset flip state
  const changeCostume = (newIndex) => {
    const safeIndex = (newIndex + COSTUMES.length) % COSTUMES.length;
    setIsFlipped(false);
    setCostumeIndex(safeIndex);
    setSelectedCostume(COSTUMES[safeIndex]);
  };

  const handlePrevCostume = (e) => {
    e?.stopPropagation();
    changeCostume(costumeIndex - 1);
  };

  const handleNextCostume = (e) => {
    e?.stopPropagation();
    changeCostume(costumeIndex + 1);
  };

  const handleCardClick = () => {
    setIsFlipped(prev => !prev);
  };

  // Calculate harmony score
  const calculateHarmony = () => {
    let score = 94;
    if (selectedOccasion?.recommendedCostumes?.includes(selectedCostume.id)) {
      score += 5;
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

  const activeCostume = COSTUMES[costumeIndex];

  return (
    <section id="studio" className={styles.studioSection}>
      {/* Dải sóng lụa đỏ chuyển cảnh đỉnh cao (theo phong cách vietphuccuoi.com) */}
      <div className={styles.silkWaveTop}>
        <svg viewBox="0 0 1440 90" fill="none" preserveAspectRatio="none">
          <path d="M0,0 L1440,0 L1440,28 C1240,68 1020,12 720,48 C420,84 200,22 0,68 Z" fill="#FFFFFF"></path>
          <path d="M0,68 C200,22 420,84 720,48 C1020,12 1240,68 1440,28 L1440,36 C1220,76 1000,20 700,56 C400,92 180,30 0,76 Z" fill="rgba(244, 211, 94, 0.35)"></path>
        </svg>
      </div>

      <div className="container">

        {/* Section Header */}
        <div className={styles.headerBlock}>
          <div className={styles.badgeStudio}>
            <Sparkles size={15} />
            <span>STUDIO THỬ ĐỒ HOÀNG GIA & GEN Z</span>
          </div>

          <h2 className={styles.title}>
            Phòng Thử Đồ & <span className={styles.goldText}>Khám Phá Di Sản</span>
          </h2>
          
          <p className={styles.subtitle}>
            Trải nghiệm thẻ <strong>Flashcard 3D học điển tích</strong> và tự do mix-match cổ phục cùng chất riêng Gen Z.
          </p>

          <div className={styles.activeOccasionTag}>
            <span>Bối cảnh đang phối:</span>
            <strong>{selectedOccasion.name}</strong>
          </div>

          {/* Stepper Tabs */}
          <div className={styles.stepperNav}>
            <button 
              className={`${styles.stepTab} ${currentStep === 0 ? styles.stepTabActive : ''}`}
              onClick={() => setCurrentStep(0)}
            >
              <div className={styles.stepNumber}>1</div>
              <Shirt size={16} />
              <span>Áo Chính (Flashcard)</span>
            </button>

            <button 
              className={`${styles.stepTab} ${currentStep === 1 ? styles.stepTabActive : ''}`}
              onClick={() => setCurrentStep(1)}
            >
              <div className={styles.stepNumber}>2</div>
              <Layers size={16} />
              <span>Quần / Xiêm Y</span>
            </button>

            <button 
              className={`${styles.stepTab} ${currentStep === 2 ? styles.stepTabActive : ''}`}
              onClick={() => setCurrentStep(2)}
            >
              <div className={styles.stepNumber}>3</div>
              <Compass size={16} />
              <span>Phụ Kiện Cổ Truyền</span>
            </button>

            <button 
              className={`${styles.stepTab} ${currentStep === 3 ? styles.stepTabActive : ''}`}
              onClick={() => setCurrentStep(3)}
            >
              <div className={styles.stepNumber}>4</div>
              <Glasses size={16} />
              <span>Phá Cách Gen Z</span>
            </button>
          </div>
        </div>

        {/* Workspace Grid */}
        <div className={styles.workspaceGrid}>
          
          {/* Main Interaction Area */}
          <div className={styles.interactionArea}>
            
            {/* =========================================================================
                BƯỚC 1: FLASHCARD 3D LẬT THẺ HỌC ĐIỂN TÍCH TRANG PHỤC (QUIZLET STYLE)
               ========================================================================= */}
            {currentStep === 0 && (
              <div className={styles.flashcardStudio}>
                
                {/* Thanh trạng thái phía trên Flashcard */}
                <div className={styles.cardStatusBar}>
                  <div className={styles.deckCounter}>
                    <span>Mẫu số</span>
                    <strong>{costumeIndex + 1} / {COSTUMES.length}</strong>
                  </div>

                  <div className={styles.flipGuidance}>
                    <RotateCw size={14} className={styles.spinIcon} />
                    <span>Nhấn vào ảnh để lật thẻ xem điển tích văn hóa</span>
                  </div>
                </div>

                {/* Khung tương tác Flashcard 3D */}
                <div className={styles.flashcardStage}>
                  {/* Nút lùi mẫu trước */}
                  <button 
                    className={`${styles.deckNavArrow} ${styles.deckNavLeft}`}
                    onClick={handlePrevCostume}
                    aria-label="Mẫu áo trước"
                    title="Mẫu áo trước"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  {/* THẺ 3D FLIP CONTAINER */}
                  <div 
                    className={`${styles.flashcardWrapper} ${isFlipped ? styles.isFlipped : ''}`}
                    onClick={handleCardClick}
                    role="button"
                    tabIndex={0}
                    aria-label={`Thẻ học ${activeCostume.name}. Nhấn để lật thẻ.`}
                  >
                    <div className={styles.flashcardInner}>
                      
                      {/* ---------------- MẶT TRƯỚC (Front: CHỈ ĐỂ DUY NHẤT TÊN ÁO TRÊN ẢNH) ---------------- */}
                      <div className={styles.cardFront}>
                        <img 
                          src={activeCostume.image} 
                          alt={activeCostume.name} 
                          className={styles.frontPhoto}
                        />
                        <div className={styles.frontGradientOverlay}></div>

                        {/* Chỉ để duy nhất Tên áo trên ảnh, không để các chi tiết khác làm rối */}
                        <div className={styles.frontInfoBlock}>
                          <h3 className={styles.costumeNameTitle}>
                            {activeCostume.name}
                          </h3>
                        </div>
                      </div>

                      {/* ---------------- MẶT SAU (Back: Kiến thức di sản, quy chuẩn, điển tích như Quizlet) ---------------- */}
                      <div className={styles.cardBack}>
                        <div className={styles.backScrollDecor}></div>

                        <div className={styles.backInnerContent}>
                          {/* Header mặt sau */}
                          <div className={styles.backHeader}>
                            <div className={styles.sealStamp}>
                              <span>ĐIỂN TÍCH DI SẢN</span>
                            </div>

                            <button 
                              className={styles.flipReturnBtn}
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsFlipped(false);
                              }}
                              title="Lật lại ảnh trang phục"
                            >
                              <RotateCcw size={13} />
                              <span>Lật lại ảnh</span>
                            </button>
                          </div>

                          {/* Tên trang phục & Niên đại mặt sau */}
                          <div className={styles.backHeadingGroup}>
                            <span className={styles.backDynastyText}>{activeCostume.dynasty}</span>
                            <h3 className={styles.backCostumeName}>{activeCostume.name}</h3>
                            <span className={styles.backCategoryText}>{activeCostume.category}</span>
                          </div>

                          {/* Nội dung ý nghĩa lịch sử & cốt cách ngũ thường */}
                          <div className={styles.storyCard}>
                            <div className={styles.storyCardHeader}>
                              <BookOpen size={16} />
                              <span>Ý Nghĩa & Nguồn Gốc Di Sản</span>
                            </div>
                            <p className={styles.storyParagraph}>{activeCostume.story}</p>
                          </div>

                          {/* Bảng thông số quy chuẩn văn hóa */}
                          <div className={styles.backSpecsGrid}>
                            <div className={styles.specBox}>
                              <span className={styles.specLabel}>Độ trang trọng:</span>
                              <div className={styles.starsRow}>
                                <div className={styles.starIcons}>
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      size={14} 
                                      fill={i < activeCostume.formality ? '#F4D35E' : 'none'} 
                                      color={i < activeCostume.formality ? '#F4D35E' : '#735751'} 
                                    />
                                  ))}
                                </div>
                                <span className={styles.formalityNum}>{activeCostume.formality}/5</span>
                              </div>
                            </div>

                            <div className={styles.specBox}>
                              <span className={styles.specLabel}>Phù hợp mặc:</span>
                              <strong className={styles.specValue}>{activeCostume.gender}</strong>
                            </div>
                          </div>

                          {/* Bảng sắc độ màu cổ truyền */}
                          {activeCostume.colorScheme && (
                            <div className={styles.paletteRow}>
                              <span className={styles.paletteLabel}>Sắc độ cổ truyền:</span>
                              <div className={styles.paletteSwatches}>
                                {activeCostume.colorScheme.map((color, idx) => (
                                  <div 
                                    key={idx} 
                                    className={styles.swatchDot} 
                                    style={{ backgroundColor: color }}
                                    title={`Mã màu: ${color}`}
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Tags di sản */}
                          <div className={styles.backTagsList}>
                            {activeCostume.tags.map(tag => (
                              <span key={tag} className={styles.backTagItem}>#{tag}</span>
                            ))}
                          </div>

                          {/* Dòng gợi ý lật lại */}
                          <div className={styles.backPromptNotice}>
                            <RotateCcw size={12} />
                            <span>Chạm vào thẻ để lật trở lại mặt ảnh người mẫu</span>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Nút tiến mẫu tiếp theo */}
                  <button 
                    className={`${styles.deckNavArrow} ${styles.deckNavRight}`}
                    onClick={handleNextCostume}
                    aria-label="Mẫu áo tiếp theo"
                    title="Mẫu áo tiếp theo"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* HÀNG CHỌN NHANH TẤT CẢ CÁC MẪU ÁO (Thumbnail Carousel) */}
                <div className={styles.quickCostumePicker}>
                  <span className={styles.pickerTitle}>Danh mục Việt phục trong bộ sưu tập:</span>
                  
                  <div className={styles.thumbnailList}>
                    {COSTUMES.map((costume, idx) => {
                      const isActive = idx === costumeIndex;
                      return (
                        <button
                          key={costume.id}
                          className={`${styles.thumbBtn} ${isActive ? styles.thumbBtnActive : ''}`}
                          onClick={() => changeCostume(idx)}
                          title={costume.name}
                        >
                          <img 
                            src={costume.image} 
                            alt={costume.name} 
                            className={styles.thumbImg} 
                          />
                          <span className={styles.thumbLabel}>{costume.name}</span>
                          {isActive && <div className={styles.activeDot} />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* NÚT CHỐT ÁO & SANG BƯỚC 2 */}
                <div className={styles.costumeActionRow}>
                  <button 
                    className={styles.btnConfirmCostume}
                    onClick={() => setCurrentStep(1)}
                  >
                    <CheckCircle2 size={20} />
                    <span>Chốt {activeCostume.name} • Sang Bước 2: Quần & Xiêm Y</span>
                    <ArrowRight size={18} />
                  </button>
                </div>

              </div>
            )}

            {/* =========================================================================
                BƯỚC 2: CHỌN QUẦN / XIÊM Y / VÁY
               ========================================================================= */}
            {currentStep === 1 && (
              <div className={styles.gridSelection}>
                <div className={styles.stepTitleBar}>
                  <div>
                    <h4 className={styles.stepTitle}>Bước 2: Chọn Quần / Váy Phối Cùng</h4>
                    <p className={styles.stepSubtitle}>
                      Đang phối cùng <strong>{selectedCostume.name}</strong> ({selectedCostume.dynasty})
                    </p>
                  </div>
                  <span className={styles.selectedCountBadge}>Đã chọn: {selectedBottom.name}</span>
                </div>

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
                          <div className={styles.optionHeaderRow}>
                            <strong>{bottom.name}</strong>
                            <span className={bottom.type === 'remix' ? styles.typeBadgeRemix : styles.typeBadgeTrad}>
                              {bottom.type === 'remix' ? 'Remix Gen Z' : 'Cổ điển'}
                            </span>
                          </div>
                          <p>{bottom.description}</p>
                        </div>
                        {isSelected && <Check size={22} className={styles.selectedIcon} />}
                      </div>
                    );
                  })}
                </div>

                <div className={styles.navStepRow}>
                  <button 
                    className={styles.btnBackStep}
                    onClick={() => setCurrentStep(0)}
                  >
                    <ChevronLeft size={18} />
                    <span>Quay lại: Chọn Áo</span>
                  </button>

                  <button 
                    className={styles.btnNextStep}
                    onClick={() => setCurrentStep(2)}
                  >
                    <span>Tiếp tục: Phụ kiện Cổ truyền</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* =========================================================================
                BƯỚC 3: CHỌN PHỤ KIỆN CỔ TRUYỀN
               ========================================================================= */}
            {currentStep === 2 && (
              <div className={styles.gridSelection}>
                <div className={styles.stepTitleBar}>
                  <div>
                    <h4 className={styles.stepTitle}>Bước 3: Chọn Phụ Kiện Cổ Truyền</h4>
                    <p className={styles.stepSubtitle}>
                      Khăn đóng, quạt trầm, ngọc trai... tôn vinh cốt cách đoan trang
                    </p>
                  </div>
                  <span className={styles.selectedCountBadge}>Đã chọn: {selectedTradAcc.name}</span>
                </div>

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
                        {isSelected && <Check size={22} className={styles.selectedIcon} />}
                      </div>
                    );
                  })}
                </div>

                <div className={styles.navStepRow}>
                  <button 
                    className={styles.btnBackStep}
                    onClick={() => setCurrentStep(1)}
                  >
                    <ChevronLeft size={18} />
                    <span>Quay lại: Quần / Váy</span>
                  </button>

                  <button 
                    className={styles.btnNextStep}
                    onClick={() => setCurrentStep(3)}
                  >
                    <span>Tiếp tục: Phá Cách Gen Z</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* =========================================================================
                BƯỚC 4: CHỌN PHỤ KIỆN REMIX GEN Z
               ========================================================================= */}
            {currentStep === 3 && (
              <div className={styles.gridSelection}>
                <div className={styles.stepTitleBar}>
                  <div>
                    <h4 className={styles.stepTitle}>Bước 4: Thêm Điểm Nhấn Phá Cách Gen Z</h4>
                    <p className={styles.stepSubtitle}>
                      Sneaker, kính mát Y2K, túi tote thư pháp... tạo dấu ấn hiện đại
                    </p>
                  </div>
                  <span className={styles.selectedCountBadge}>Đã chọn: {selectedGenzAcc.name}</span>
                </div>

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
                        {isSelected && <Check size={22} className={styles.selectedIcon} />}
                      </div>
                    );
                  })}
                </div>

                <div className={styles.navStepRow}>
                  <button 
                    className={styles.btnBackStep}
                    onClick={() => setCurrentStep(2)}
                  >
                    <ChevronLeft size={18} />
                    <span>Quay lại: Phụ Kiện Cổ Truyền</span>
                  </button>

                  <button 
                    className={styles.btnFinishBig}
                    onClick={handleCompleteLook}
                  >
                    <Sparkles size={18} />
                    <span>Hoàn Tất & Xuất Tạp Chí Lookbook</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* =========================================================================
              CỘT PHẢI: GƯƠNG THỬ ĐỒ HOÀNG GIA & CHỈ SỐ HÀI HÒA VĂN HÓA
             ========================================================================= */}
          <div className={styles.outfitPreviewCard}>
            <div className={styles.previewHeader}>
              <div className={styles.mirrorHeaderTop}>
                <span className={styles.previewEyebrow}>GƯƠNG THỬ ĐỒ TRỰC TUYẾN</span>
                <span className={styles.mirrorLiveTag}>Live Mix</span>
              </div>
              <h4 className={styles.previewTitle}>{selectedOccasion.name}</h4>
            </div>

            {/* Khung gương visual sang trọng */}
            <div className={styles.previewThumbnail}>
              <img 
                src={selectedCostume.image} 
                alt={selectedCostume.name} 
                className={styles.thumbnailImg}
              />
              <div className={styles.thumbnailVignette}></div>
              
              <div className={styles.thumbnailDynastyBadge}>
                {selectedCostume.dynasty}
              </div>

              <div className={styles.previewOverlayBadge}>
                {selectedCostume.name}
              </div>
            </div>

            {/* Bảng chi tiết 4 lớp trang phục */}
            <div className={styles.breakdownList}>
              <div className={styles.breakdownRow}>
                <span className={styles.rowLabel}>1. Áo chính:</span>
                <strong className={styles.rowValueHighlight}>{selectedCostume.name}</strong>
              </div>
              <div className={styles.breakdownRow}>
                <span className={styles.rowLabel}>2. Xiêm y:</span>
                <span className={styles.rowValue}>{selectedBottom.name}</span>
              </div>
              <div className={styles.breakdownRow}>
                <span className={styles.rowLabel}>3. Cổ truyền:</span>
                <span className={styles.rowValue}>{selectedTradAcc.name}</span>
              </div>
              <div className={styles.breakdownRow}>
                <span className={styles.rowLabel}>4. Gen Z:</span>
                <span className={styles.rowValueBadge}>{selectedGenzAcc.name}</span>
              </div>
            </div>

            {/* Thước đo hài hòa văn hóa */}
            <div className={styles.harmonyScoreBox}>
              <div className={styles.scoreRow}>
                <span className={styles.scoreLabel}>Chỉ số hài hòa văn hóa:</span>
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
                <span>Đã thẩm định qua điển tịch nghi lễ & mỹ học Việt</span>
              </div>
            </div>

            {/* Nút chốt tạo Lookbook */}
            <button 
              className={styles.btnSaveLookbook}
              onClick={handleCompleteLook}
            >
              <Sparkles size={18} />
              <span>Chốt Bộ Phối & Tạo Lookbook</span>
            </button>
          </div>

        </div>

      </div>

      {/* Dải sóng lụa đỏ chuyển cảnh mượt mà sang Lookbook */}
      <div className={styles.silkWaveBottom}>
        <svg viewBox="0 0 1440 90" fill="none" preserveAspectRatio="none">
          <path d="M0,90 L1440,90 L1440,58 C1240,18 1020,74 720,38 C420,2 200,64 0,28 Z" fill="#FFFFFF"></path>
          <path d="M0,28 C200,64 420,2 720,38 C1020,74 1240,18 1440,58 L1440,50 C1220,10 1000,66 700,30 C400,-6 180,56 0,20 Z" fill="rgba(244, 211, 94, 0.35)"></path>
        </svg>
      </div>
    </section>
  );
}
