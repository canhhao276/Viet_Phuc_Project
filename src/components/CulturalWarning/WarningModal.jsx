import React from 'react';
import styles from './WarningModal.module.css';

/**
 * Modal hiển thị chi tiết Cảnh Báo Sai Lệch Văn Hóa & Hướng dẫn phối chuẩn mực
 */
export default function WarningModal({ isOpen, onClose, warnings = [], suggestions = [] }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.headerTitleGroup}>
            <span className={styles.warningIconBig}>⚠️</span>
            <h3 className={styles.modalTitle}>Quy Chuẩn Di Sản & Cảnh Báo Phối Đồ</h3>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.modalBody}>
          <p className={styles.introText}>
            Hệ thống <strong>Heritage AI Guardrails</strong> nhận diện thấy một số chi tiết trong bản phối của bạn có thể làm sai lệch tinh thần và vẻ đẹp tôn nghiêm của cổ phục Việt:
          </p>

          {warnings.map((w, index) => (
            <div key={index} className={styles.warningBlock}>
              <span className={styles.warningItemTitle}>✦ {w.title}</span>
              <p className={styles.warningItemDesc}>{w.description}</p>
            </div>
          ))}

          <div className={styles.solutionBox}>
            <h4 className={styles.solutionTitle}>💡 Đề xuất chỉnh sửa từ Chuyên Gia Văn Hóa:</h4>
            <p className={styles.solutionDesc}>
              {suggestions.length > 0
                ? suggestions.join(' ')
                : 'Nên ưu tiên kết hợp cùng Khăn Đóng, Hài cong mũi lượn nhung gấm hoặc Quạt trầm để giữ trọn cốt cách nho nhã, thuần Việt.'}
            </p>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className="btn-gold" style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={onClose}>
            Đã Hiểu & Tiếp Tục Tinh Chỉnh
          </button>
        </div>
      </div>
    </div>
  );
}
