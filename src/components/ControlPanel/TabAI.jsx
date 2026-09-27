import React from 'react';
import styles from './ControlPanel.module.css';

/**
 * Tab 3: Trợ lý AI Stylist phân tích trang phục, văn hóa & cảnh báo sai lệch
 */
export default function TabAI({
  isAnalyzing,
  aiResult,
  onTriggerAI,
  onSaveToLookbook,
  isSaved,
  onOpenWarningModal
}) {
  return (
    <div className={styles.tabContent}>
      {/* Nút Phối đồ cùng AI */}
      <div className={styles.aiActionBox}>
        <button
          className={`btn-gold ${styles.aiGenerateBtn}`}
          onClick={onTriggerAI}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <span className={styles.spinner} />
              <span>Gemini AI đang luận sắc...</span>
            </>
          ) : (
            <>
              <span className={styles.aiSparkleIcon}>✦</span>
              <span>PHỐI ĐỒ CÙNG AI STYLIST</span>
            </>
          )}
        </button>
        <p className={styles.aiSubtext}>
          Hệ thống AI phân tích dựa trên điển chế triều Nguyễn & tỷ lệ cơ thể thực tế
        </p>
      </div>

      {/* Hiệu ứng Skeleton Loading lúc AI đang suy nghĩ */}
      {isAnalyzing && (
        <div className={styles.aiLoadingState}>
          <div className="shimmer-loader" style={{ height: '70px', marginBottom: '16px' }} />
          <div className="shimmer-loader" style={{ height: '110px', marginBottom: '16px' }} />
          <div className="shimmer-loader" style={{ height: '90px' }} />
        </div>
      )}

      {/* Kết quả phân tích của AI */}
      {!isAnalyzing && aiResult && (
        <div className={styles.aiResultWrapper}>
          {/* Card Điểm Phù Hợp & Tên Look */}
          <div className={styles.scoreCard}>
            <div className={styles.scoreLeft}>
              <span className={styles.lookNameBadge}>OUTFIT DI SẢN</span>
              <h3 className={styles.outfitTitle}>{aiResult.outfitName}</h3>
              <p className={styles.outfitMeta}>
                Dành cho {aiResult.costumeName} • {aiResult.occasionName}
              </p>
            </div>
            <div className={styles.scoreCircle}>
              <span className={styles.scoreNumber}>{aiResult.suitabilityScore}</span>
              <span className={styles.scoreLabel}>Độ Hài Hòa</span>
            </div>
          </div>

          {/* CẢNH BÁO SAI LỆCH VĂN HÓA (NẾU CÓ) */}
          {aiResult.warnings && aiResult.warnings.length > 0 && (
            <div className={styles.culturalWarningBanner}>
              <div className={styles.warningHeader}>
                <span className={styles.warningIcon}>⚠️</span>
                <span className={styles.warningTitle}>CẢNH BÁO SAI LỆCH VĂN HÓA</span>
              </div>
              <div className={styles.warningList}>
                {aiResult.warnings.map((w, index) => (
                  <div key={index} className={styles.warningItem}>
                    <strong>{w.title}: </strong>
                    <span>{w.description}</span>
                  </div>
                ))}
              </div>
              <button
                className={styles.viewDetailWarningBtn}
                onClick={onOpenWarningModal}
              >
                Xem chi tiết quy chuẩn di sản →
              </button>
            </div>
          )}

          {/* Ý NGHĨA VĂN HÓA CỦA TRANG PHỤC */}
          <div className={styles.meaningCard}>
            <div className={styles.cardHeaderSmall}>
              <span className={styles.iconSmall}>📜</span>
              <h4>Ý Nghĩa Lịch Sử & Văn Hóa</h4>
            </div>
            <p className={styles.meaningText}>{aiResult.culturalExplanation}</p>
          </div>

          {/* KHUYẾN NGHỊ TỶ LỆ DÁNG NGƯỜI */}
          <div className={styles.recommendationCard}>
            <div className={styles.cardHeaderSmall}>
              <span className={styles.iconSmall}>✨</span>
              <h4>Lời Khuyên Dáng Người & Phom Áo</h4>
            </div>
            <p className={styles.recommendationText}>{aiResult.bodyRecommendation}</p>
          </div>

          {/* HÀNH ĐỘNG: LƯU VÀO LOOKBOOK */}
          <div className={styles.saveActionRow}>
            <button
              className={`btn-outline-gold ${styles.saveLookbookBtn}`}
              onClick={onSaveToLookbook}
            >
              {isSaved ? '✓ Đã Lưu Vào Lookbook' : '+ Lưu Bộ Này Vào Lookbook'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
