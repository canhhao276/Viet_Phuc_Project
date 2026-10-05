import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Sparkles, X, Lightbulb } from 'lucide-react';
import styles from './NgheThanModal.module.css';

export default function NgheThanModal({ warningRule, onClose, onApplySuggestion }) {
  if (!warningRule) return null;

  return (
    <AnimatePresence>
      <div className={styles.backdrop} onClick={onClose}>
        <motion.div 
          className={styles.modalCard}
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button className={styles.closeBtn} onClick={onClose} aria-label="Đóng cảnh báo">
            <X size={20} />
          </button>

          {/* Mascot & Crown Visual */}
          <div className={styles.mascotContainer}>
            <div className={styles.mascotAura}></div>
            <div className={styles.mascotAvatar}>
              <span className={styles.mascotEmoji}>🦁</span>
            </div>
            <div className={styles.mascotTag}>
              <Sparkles size={12} />
              <span>Trợ Lý Văn Hóa • Nghê Thần</span>
            </div>
          </div>

          {/* Warning Content */}
          <div className={styles.contentSection}>
            <div className={styles.speechBubble}>
              <div className={styles.bubbleHeader}>
                <AlertCircle size={18} className={styles.alertIcon} />
                <h3 className={styles.warningTitle}>{warningRule.title}</h3>
              </div>
              <p className={styles.warningMessage}>
                "{warningRule.message}"
              </p>
            </div>

            {/* Smart Suggestion box */}
            {warningRule.suggestion && (
              <div className={styles.suggestionBox}>
                <div className={styles.suggestionHeader}>
                  <Lightbulb size={16} className={styles.bulbIcon} />
                  <strong>Gợi ý từ Nghê Thần:</strong>
                </div>
                <p className={styles.suggestionText}>{warningRule.suggestion}</p>
              </div>
            )}
          </div>

          {/* Modal Actions */}
          <div className={styles.actions}>
            <button className="btn btn-outline" onClick={onClose}>
              <span>Tôi hiểu rồi</span>
            </button>
            <button className="btn btn-primary" onClick={onClose}>
              <Sparkles size={16} />
              <span>Chỉnh lại cho chuẩn</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
