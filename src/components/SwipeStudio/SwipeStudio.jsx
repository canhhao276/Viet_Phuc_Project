import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RotateCw, 
  RotateCcw, 
  Check, 
  Sparkles, 
  Shirt, 
  Layers, 
  Glasses, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Clock, 
  Info, 
  Star,
  CheckCircle2,
  ArrowRight,
  Footprints,
  Sparkle
} from 'lucide-react';
import { 
  COSTUMES, 
  BOTTOMS, 
  FOOTWEAR, 
  HEADWEAR, 
  CULTURAL_RULES 
} from '../../data/mockData';
import { calculateDetailedHarmony, checkAllRules } from '../../data/outfitRules';
import { processNgheThanFeedback } from '../../data/ngheThanEngine';
import styles from './SwipeStudio.module.css';

export default function SwipeStudio({ 
  selectedOccasion, 
  onFinishLook,
  onTriggerWarning 
}) {
  // 4 bước quy trình phối đồ
  // 0: Áo Chính (Flashcard 3D)
  // 1: Quần / Xiêm Y
  // 2: Giày Dép
  // 3: Mũ / Phụ Kiện
  const [currentStep, setCurrentStep] = useState(0);

  // Bộ lọc phong cách: 'all' | 'traditional' | 'remix'
  const [activeTab, setActiveTab] = useState('all');

  // Lựa chọn trang phục đang phối
  const [costumeIndex, setCostumeIndex] = useState(0);
  const [selectedCostume, setSelectedCostume] = useState(COSTUMES[0]);
  const [selectedBottom, setSelectedBottom] = useState(BOTTOMS[0]);
  const [selectedFootwear, setSelectedFootwear] = useState(FOOTWEAR[0]);
  const [selectedHeadwear, setSelectedHeadwear] = useState(HEADWEAR[0]);

  // Trạng thái lật thẻ Flashcard 3D (mặt trước: ảnh/tên áo, mặt sau: điển tích/kiến thức)
  const [isFlipped, setIsFlipped] = useState(false);

  // Điều hướng chọn áo trong bộ bài Flashcard
  const handleNextCostume = () => {
    setIsFlipped(false);
    const nextIdx = (costumeIndex + 1) % COSTUMES.length;
    setCostumeIndex(nextIdx);
    setSelectedCostume(COSTUMES[nextIdx]);
  };

  const handlePrevCostume = () => {
    setIsFlipped(false);
    const prevIdx = (costumeIndex - 1 + COSTUMES.length) % COSTUMES.length;
    setCostumeIndex(prevIdx);
    setSelectedCostume(COSTUMES[prevIdx]);
  };

  const handleSelectCostumeById = (costume) => {
    setIsFlipped(false);
    const idx = COSTUMES.findIndex(c => c.id === costume.id);
    if (idx !== -1) {
      setCostumeIndex(idx);
      setSelectedCostume(costume);
    }
  };

  // Kiểm tra vi phạm luật văn hóa bằng Nghê Thần Engine
  const checkRules = (costume, bottom, footwear, headwear) => {
    // 1. Kiểm tra rule từ ngheThanEngine
    const feedback = processNgheThanFeedback({
      costume,
      bottom,
      footwear,
      headwear,
      occasion: selectedOccasion
    }, calculateHarmony());

    if (feedback && feedback.severity === 'critical') {
      onTriggerWarning && onTriggerWarning({
        title: feedback.title,
        message: feedback.message,
        suggestion: feedback.suggestion
      });
      return;
    }

    // 2. Kiểm tra rule từ danh sách CULTURAL_RULES
    const matchedRule = CULTURAL_RULES.find(rule => {
      if (rule.costumeId !== costume.id) return false;
      if (rule.prohibitedBottom && rule.prohibitedBottom === bottom.id) return true;
      if (rule.prohibitedGenz && (footwear.id === rule.prohibitedGenz || headwear.id === rule.prohibitedGenz)) {
        if (rule.triggerWhenOccasion) {
          return rule.triggerWhenOccasion === selectedOccasion.id;
        }
        return true;
      }
      return false;
    });

    if (matchedRule && onTriggerWarning) {
      onTriggerWarning(matchedRule);
    }
  };

  // Tính điểm hài hòa dựa trên engine của Khánh
  const calculateHarmony = () => {
    try {
      const harmony = calculateDetailedHarmony({
        costume: selectedCostume,
        bottom: selectedBottom,
        footwear: selectedFootwear,
        headwear: selectedHeadwear,
        occasion: selectedOccasion
      });
      return harmony.score;
    } catch {
      let score = 92;
      if (selectedOccasion?.recommendedCostumes?.includes(selectedCostume.id)) {
        score += 6;
      }
      return Math.min(score, 100);
    }
  };

  // Hoàn tất bộ phối & gửi ra Lookbook Modal
  const handleCompleteLook = () => {
    onFinishLook({
      costume: selectedCostume,
      bottom: selectedBottom,
      footwear: selectedFootwear,
      headwear: selectedHeadwear,
      occasion: selectedOccasion,
      harmonyScore: calculateHarmony()
    });
  };

  const activeCostume = COSTUMES[costumeIndex];

  // Lọc danh sách theo tab phong cách nếu người dùng chọn
  const filterByTab = (items) => {
    if (activeTab === 'all') return items;
    return items.filter(item => item.type === activeTab);
  };

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
              <Footprints size={16} />
              <span>Giày Dép</span>
            </button>

            <button 
              className={`${styles.stepTab} ${currentStep === 3 ? styles.stepTabActive : ''}`}
              onClick={() => setCurrentStep(3)}
            >
              <div className={styles.stepNumber}>4</div>
              <Glasses size={16} />
              <span>Mũ / Phụ Kiện</span>
            </button>
          </div>

          {/* Bộ lọc phong cách (Tất cả / Truyền thống / Hiện đại) */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '16px' }}>
            <button 
              onClick={() => setActiveTab('all')}
              style={{
                padding: '6px 16px',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: activeTab === 'all' ? '#FFFFFF' : 'rgba(0, 0, 0, 0.35)',
                color: activeTab === 'all' ? '#2B1800' : '#FFFFFF',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '0.82rem',
                transition: 'all 0.2s'
              }}
            >
              Tất Cả Mẫu
            </button>
            <button 
              onClick={() => setActiveTab('traditional')}
              style={{
                padding: '6px 16px',
                borderRadius: '9999px',
                border: '1px solid #F4D35E',
                background: activeTab === 'traditional' ? 'linear-gradient(135deg, #F4D35E, #C99700)' : 'rgba(0, 0, 0, 0.35)',
                color: activeTab === 'traditional' ? '#2B1800' : '#F4D35E',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '0.82rem',
                transition: 'all 0.2s'
              }}
            >
              Truyền Thống
            </button>
            <button 
              onClick={() => setActiveTab('remix')}
              style={{
                padding: '6px 16px',
                borderRadius: '9999px',
                border: '1px solid rgba(238, 150, 165, 0.5)',
                background: activeTab === 'remix' ? '#C83E40' : 'rgba(0, 0, 0, 0.35)',
                color: '#FFFFFF',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '0.82rem',
                transition: 'all 0.2s'
              }}
            >
              Hiện Đại (Remix)
            </button>
          </div>
        </div>

        {/* Workspace Grid Layout */}
        <div className={styles.workspaceGrid}>

          {/* =========================================================================
              CỘT TRÁI: KHU VỰC THỬ ĐỒ & FLASHCARD 3D TƯƠNG TÁC
             ========================================================================= */}
          <div className={styles.interactionArea}>

            {/* -------------------------------------------------------------------------
                BƯỚC 1: FLASHCARD 3D CHỌN ÁO & KHÁM PHÁ ĐIỂN TÍCH (QUIZLET STYLE)
               ------------------------------------------------------------------------- */}
            {currentStep === 0 && (
              <div className={styles.flashcardStudio}>
                
                {/* Status Bar */}
                <div className={styles.cardStatusBar}>
                  <span className={styles.deckCounter}>
                    Mẫu số <strong>{costumeIndex + 1}</strong> / {COSTUMES.length}
                  </span>

                  <div className={styles.flipGuidance}>
                    <RotateCw size={13} className={styles.spinIcon} />
                    <span>Nhấn vào ảnh để lật thẻ xem điển tích văn hóa</span>
                  </div>
                </div>

                {/* SÂN KHẤU FLASHCARD 3D */}
                <div className={styles.flashcardStage}>
                  {/* Mũi tên lùi áo */}
                  <button 
                    className={styles.deckNavArrow} 
                    onClick={handlePrevCostume}
                    title="Mẫu áo trước"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  {/* THẺ 3D FLIP CONTAINER */}
                  <div 
                    className={`${styles.flashcardWrapper} ${isFlipped ? styles.isFlipped : ''}`}
                    onClick={() => setIsFlipped(prev => !prev)}
                  >
                    <div className={styles.flashcardInner}>
                      
                      {/* ---------------- MẶT TRƯỚC (Front: TỐI GIẢN - CHỈ TÊN ÁO & ẢNH ĐẸP) ---------------- */}
                      <div className={styles.cardFront}>
                        <img 
                          src={activeCostume.image} 
                          alt={activeCostume.name}
                          className={styles.frontPhoto}
                        />

                        {/* Gradient bóng mờ chân ảnh */}
                        <div className={styles.frontGradientOverlay}></div>

                        {/* CHỈ HIỂN THỊ DUY NHẤT TÊN ÁO - THEO ĐÚNG YÊU CẦU CỦA BẠN */}
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

                          {/* Tiêu đề & Niên đại */}
                          <div className={styles.backHeadingGroup}>
                            <span className={styles.backDynastyText}>🏛️ {activeCostume.dynasty}</span>
                            <h4 className={styles.backCostumeName}>{activeCostume.name}</h4>
                            <span className={styles.backCategoryText}>{activeCostume.category}</span>
                          </div>

                          {/* Câu chuyện / Điển tích */}
                          <div className={styles.storyCard}>
                            <div className={styles.storyCardHeader}>
                              <BookOpen size={14} />
                              <span>Ý nghĩa văn hóa & Cấu trúc</span>
                            </div>
                            <p className={styles.storyParagraph}>
                              {activeCostume.story}
                            </p>
                          </div>

                          {/* Thông số & Quy chuẩn */}
                          <div className={styles.backSpecsGrid}>
                            <div className={styles.specBox}>
                              <span className={styles.specLabel}>Tính trang trọng:</span>
                              <div className={styles.starsRow}>
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={12} 
                                    fill={i < activeCostume.formality ? '#F4D35E' : 'none'}
                                    color={i < activeCostume.formality ? '#F4D35E' : 'rgba(255,255,255,0.3)'}
                                  />
                                ))}
                              </div>
                            </div>

                            <div className={styles.specBox}>
                              <span className={styles.specLabel}>Phù hợp giới tính:</span>
                              <strong className={styles.specVal}>{activeCostume.gender}</strong>
                            </div>
                          </div>

                          {/* Bảng màu ngũ hành */}
                          <div className={styles.paletteRow}>
                            <span className={styles.paletteLabel}>Màu sắc kinh điển:</span>
                            <div className={styles.paletteSwatches}>
                              {activeCostume.colorScheme.map((color, idx) => (
                                <span 
                                  key={idx} 
                                  className={styles.swatchDot} 
                                  style={{ backgroundColor: color }}
                                  title={`Màu ${color}`}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Thẻ đặc trưng */}
                          <div className={styles.backTagsList}>
                            {activeCostume.tags.map((tag, idx) => (
                              <span key={idx} className={styles.backTagItem}>
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <div className={styles.backPromptNotice}>
                            <Sparkle size={12} />
                            <span>Nhấn lại vào thẻ để lật về ảnh thử đồ</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Mũi tên tiến áo */}
                  <button 
                    className={styles.deckNavArrow} 
                    onClick={handleNextCostume}
                    title="Mẫu áo kế tiếp"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* HÀNG CHỌN MẪU ÁO NHANH BÊN DƯỚI */}
                <div className={styles.quickCostumePicker}>
                  <span className={styles.pickerTitle}>Danh mục Việt phục trong bộ sưu tập:</span>
                  <div className={styles.thumbnailList}>
                    {COSTUMES.map((costume, idx) => {
                      const isActive = idx === costumeIndex;
                      return (
                        <button
                          key={costume.id}
                          className={`${styles.thumbBtn} ${isActive ? styles.thumbBtnActive : ''}`}
                          onClick={() => handleSelectCostumeById(costume)}
                        >
                          <img src={costume.image} alt={costume.name} className={styles.thumbImg} />
                          <span className={styles.thumbLabel}>{costume.name}</span>
                          {isActive && <div className={styles.activeDot}></div>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* NÚT CHỐT ÁO CHUYỂN BƯỚC */}
                <div className={styles.costumeActionRow}>
                  <button 
                    className={styles.btnConfirmCostume}
                    onClick={() => {
                      setSelectedCostume(activeCostume);
                      setCurrentStep(1);
                    }}
                  >
                    <CheckCircle2 size={18} />
                    <span>Chốt {activeCostume.name} • Sang Bước 2: Quần & Xiêm Y</span>
                    <ArrowRight size={18} />
                  </button>
                </div>

              </div>
            )}

            {/* -------------------------------------------------------------------------
                BƯỚC 2: CHỌN QUẦN / XIÊM Y
               ------------------------------------------------------------------------- */}
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
                  {filterByTab(BOTTOMS).map((bottom) => {
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
                        {bottom.image ? (
                          <div 
                            className={styles.colorSwatch}
                            style={{ backgroundImage: `url(${bottom.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: bottom.colorCode || bottom.color }}
                          />
                        ) : (
                          <div 
                            className={styles.colorSwatch} 
                            style={{ backgroundColor: bottom.colorCode || bottom.color }}
                          />
                        )}
                        <div className={styles.optionInfo}>
                          <div className={styles.optionHeaderRow}>
                            <strong>{bottom.name}</strong>
                            <span className={bottom.type === 'traditional' ? styles.typeBadgeTrad : styles.typeBadgeRemix}>
                              {bottom.type === 'traditional' ? 'Truyền thống' : 'Remix Gen Z'}
                            </span>
                          </div>
                          <p>{bottom.desc}</p>
                        </div>
                        {isSelected && <Check size={20} className={styles.selectedIcon} />}
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
                    <span>Tiếp tục: Giày Dép</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------------------
                BƯỚC 3: CHỌN GIÀY DÉP
               ------------------------------------------------------------------------- */}
            {currentStep === 2 && (
              <div className={styles.gridSelection}>
                <div className={styles.stepTitleBar}>
                  <div>
                    <h4 className={styles.stepTitle}>Bước 3: Chọn Giày Dép</h4>
                    <p className={styles.stepSubtitle}>
                      Hài thêu, guốc mộc, sneaker retro... tạo dáng đi thanh thoát hoặc năng động
                    </p>
                  </div>
                  <span className={styles.selectedCountBadge}>Đã chọn: {selectedFootwear.name}</span>
                </div>

                <div className={styles.optionsList}>
                  {filterByTab(FOOTWEAR).map((footwear) => {
                    const isSelected = selectedFootwear.id === footwear.id;
                    return (
                      <div 
                        key={footwear.id}
                        className={`${styles.optionCard} ${isSelected ? styles.optionCardActive : ''}`}
                        onClick={() => {
                          setSelectedFootwear(footwear);
                          checkRules(selectedCostume, selectedBottom, footwear, selectedHeadwear);
                        }}
                      >
                        {footwear.image ? (
                          <img src={footwear.image} alt={footwear.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                        ) : (
                          <div className={footwear.type === 'traditional' ? styles.accBadge : styles.accBadgeGenz}>
                            <Footprints size={20} />
                          </div>
                        )}
                        <div className={styles.optionInfo}>
                          <div className={styles.optionHeaderRow}>
                            <strong>{footwear.name}</strong>
                            <span className={footwear.type === 'traditional' ? styles.typeBadgeTrad : styles.typeBadgeRemix}>
                              {footwear.type === 'traditional' ? 'Cổ truyền' : 'Gen Z Remix'}
                            </span>
                          </div>
                          <p>{footwear.desc}</p>
                        </div>
                        {isSelected && <Check size={20} className={styles.selectedIcon} />}
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
                    <span>Tiếp tục: Mũ & Phụ Kiện</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------------------
                BƯỚC 4: CHỌN MŨ / PHỤ KIỆN
               ------------------------------------------------------------------------- */}
            {currentStep === 3 && (
              <div className={styles.gridSelection}>
                <div className={styles.stepTitleBar}>
                  <div>
                    <h4 className={styles.stepTitle}>Bước 4: Thêm Mũ & Phụ Kiện Đi Kèm</h4>
                    <p className={styles.stepSubtitle}>
                      Khăn đóng, quạt trầm, chuỗi ngọc, kính Y2K... hoàn thiện diện mạo
                    </p>
                  </div>
                  <span className={styles.selectedCountBadge}>Đã chọn: {selectedHeadwear.name}</span>
                </div>

                <div className={styles.optionsList}>
                  {filterByTab(HEADWEAR).map((headwear) => {
                    const isSelected = selectedHeadwear.id === headwear.id;
                    return (
                      <div 
                        key={headwear.id}
                        className={`${styles.optionCard} ${isSelected ? styles.optionCardActive : ''}`}
                        onClick={() => {
                          setSelectedHeadwear(headwear);
                          checkRules(selectedCostume, selectedBottom, selectedFootwear, headwear);
                        }}
                      >
                        {headwear.image ? (
                          <img src={headwear.image} alt={headwear.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                        ) : (
                          <div className={headwear.type === 'traditional' ? styles.accBadge : styles.accBadgeGenz}>
                            <Glasses size={20} />
                          </div>
                        )}
                        <div className={styles.optionInfo}>
                          <div className={styles.optionHeaderRow}>
                            <strong>{headwear.name}</strong>
                            <span className={headwear.type === 'traditional' ? styles.typeBadgeTrad : styles.typeBadgeRemix}>
                              {headwear.type === 'traditional' ? 'Cổ truyền' : 'Gen Z Remix'}
                            </span>
                          </div>
                          <p>{headwear.desc}</p>
                        </div>
                        {isSelected && <Check size={20} className={styles.selectedIcon} />}
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
                    <span>Quay lại: Giày Dép</span>
                  </button>

                  <button 
                    className={styles.btnFinishBig}
                    onClick={handleCompleteLook}
                  >
                    <Sparkles size={18} />
                    <span>Hoàn Tất & Tạo Lookbook Chuyền Tay</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* =========================================================================
              CỘT PHẢI: GƯƠNG THỬ ĐỒ HOÀNG GIA & CHỈ SỐ HÀI HÒA VĂN HÓA
             ========================================================================= */}
          <div className={styles.outfitPreviewCard}>
            
            {/* Header Gương Thử Đồ */}
            <div className={styles.previewHeader}>
              <div className={styles.mirrorHeaderTop}>
                <span className={styles.previewEyebrow}>GƯƠNG THỬ ĐỒ TRỰC TUYẾN</span>
                <span className={styles.mirrorLiveTag}>Live Mix</span>
              </div>
              <h3 className={styles.previewTitle}>{selectedOccasion.name}</h3>
            </div>

            {/* Thumbnail ảnh đại diện */}
            <div className={styles.previewThumbnail}>
              <img 
                src={selectedCostume.image} 
                alt={selectedCostume.name} 
                className={styles.thumbnailImg}
              />
              <div className={styles.thumbnailVignette}></div>
              <div className={styles.thumbnailDynastyBadge}>{selectedCostume.dynasty}</div>
              <div className={styles.previewOverlayBadge}>
                {selectedCostume.name}
              </div>
            </div>

            {/* Bảng chi tiết 4 thành phần */}
            <div className={styles.breakdownList}>
              <div className={styles.breakdownRow}>
                <span className={styles.rowLabel}>1. Áo chính:</span>
                <span className={styles.rowValueHighlight}>{selectedCostume.name}</span>
              </div>
              <div className={styles.breakdownRow}>
                <span className={styles.rowLabel}>2. Xiêm y:</span>
                <span className={styles.rowValue}>{selectedBottom.name}</span>
              </div>
              <div className={styles.breakdownRow}>
                <span className={styles.rowLabel}>3. Giày dép:</span>
                <span className={styles.rowValue}>{selectedFootwear.name}</span>
              </div>
              <div className={styles.breakdownRow}>
                <span className={styles.rowLabel}>4. Mũ / Phụ kiện:</span>
                <span className={styles.rowValueBadge}>{selectedHeadwear.name}</span>
              </div>
            </div>

            {/* Hộp chỉ số hài hòa văn hóa */}
            <div className={styles.harmonyScoreBox}>
              <div className={styles.scoreRow}>
                <span className={styles.scoreLabel}>Chỉ số hài hòa văn hóa:</span>
                <span className={styles.scorePercent}>{calculateHarmony()}%</span>
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
