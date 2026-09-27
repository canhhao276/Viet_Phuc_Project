import React, { useState } from 'react';
import TabBody from './TabBody';
import TabWardrobe from './TabWardrobe';
import TabAI from './TabAI';
import styles from './ControlPanel.module.css';

/**
 * Control Panel điều khiển chính: Body, Wardrobe, AI Stylist
 */
export default function ControlPanel({
  bodyMeasurements,
  onMeasurementChange,
  onResetBodyDefaults,
  selectedCostume,
  onSelectCostume,
  selectedColor,
  onSelectColor,
  selectedOccasion,
  onSelectOccasion,
  selectedAccessories,
  onToggleAccessory,
  isAnalyzing,
  aiResult,
  onTriggerAI,
  onSaveToLookbook,
  isSaved,
  onOpenWarningModal
}) {
  const [activeTab, setActiveTab] = useState('wardrobe'); // Mặc định mở Wardrobe để trải nghiệm phong phú ngay

  return (
    <div className={styles.panelContainer}>
      {/* Thanh chuyển Tabs */}
      <div className={styles.tabsNav}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'body' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('body')}
        >
          <span className={styles.tabIcon}>👤</span>
          <span>1. Dáng Người (Body)</span>
        </button>

        <button
          className={`${styles.tabBtn} ${activeTab === 'wardrobe' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('wardrobe')}
        >
          <span className={styles.tabIcon}>👘</span>
          <span>2. Tủ Đồ (Wardrobe)</span>
        </button>

        <button
          className={`${styles.tabBtn} ${activeTab === 'ai' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('ai')}
        >
          <span className={styles.tabIcon}>✦</span>
          <span>3. AI Stylist</span>
        </button>
      </div>

      {/* Nội dung Tab */}
      <div className={styles.panelBody}>
        {activeTab === 'body' && (
          <TabBody
            bodyMeasurements={bodyMeasurements}
            onMeasurementChange={onMeasurementChange}
            onResetDefaults={onResetBodyDefaults}
          />
        )}

        {activeTab === 'wardrobe' && (
          <TabWardrobe
            selectedCostume={selectedCostume}
            onSelectCostume={onSelectCostume}
            selectedColor={selectedColor}
            onSelectColor={onSelectColor}
            selectedOccasion={selectedOccasion}
            onSelectOccasion={onSelectOccasion}
            selectedAccessories={selectedAccessories}
            onToggleAccessory={onToggleAccessory}
          />
        )}

        {activeTab === 'ai' && (
          <TabAI
            isAnalyzing={isAnalyzing}
            aiResult={aiResult}
            onTriggerAI={onTriggerAI}
            onSaveToLookbook={onSaveToLookbook}
            isSaved={isSaved}
            onOpenWarningModal={onOpenWarningModal}
          />
        )}
      </div>
    </div>
  );
}
