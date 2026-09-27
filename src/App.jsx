import React, { useState } from 'react';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import StylistStudio from './components/StylistStudio/StylistStudio';
import CostumeCatalogSection from './components/Showcase/CostumeCatalogSection';
import LandmarksGallerySection from './components/Showcase/LandmarksGallerySection';
import LookbookModal from './components/Lookbook/LookbookModal';
import WarningModal from './components/CulturalWarning/WarningModal';
import Footer from './components/Footer/Footer';
import { useStylistState } from './hooks/useStylistState';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const {
    bodyMeasurements,
    handleMeasurementChange,
    handleResetBodyDefaults,
    selectedCostume,
    handleSelectCostume,
    selectedColor,
    setSelectedColor,
    selectedOccasion,
    setSelectedOccasion,
    selectedAccessories,
    handleToggleAccessory,
    isAnalyzing,
    aiResult,
    triggerAIAnalysis,
    lookbookList,
    handleSaveToLookbook,
    isCurrentSaved,
    isLookbookOpen,
    setIsLookbookOpen,
    handleDeleteLook,
    handleApplyLook,
    isWarningModalOpen,
    setIsWarningModalOpen
  } = useStylistState();

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCostumeFromCatalog = (costumeId) => {
    handleSelectCostume(costumeId);
    handleNavigate('stylist');
  };

  return (
    <div className="heritage-app">
      {/* Lớp hoa văn di sản nền mờ ảo */}
      <div className="heritage-pattern-overlay" />

      {/* Thanh Header bảo tàng số */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        lookbookCount={lookbookList.length}
        onOpenLookbook={() => setIsLookbookOpen(true)}
      />

      {/* 1. Hero Section Panorama Hoàng Hôn Cố Đô */}
      <HeroSection
        onStartStylist={() => handleNavigate('stylist')}
        onExploreCostumes={() => handleNavigate('costumes')}
      />

      {/* 2. Interactive 3D Heritage Studio (Avatar 360° + Bảng điều khiển) */}
      <StylistStudio
        bodyMeasurements={bodyMeasurements}
        onMeasurementChange={handleMeasurementChange}
        onResetBodyDefaults={handleResetBodyDefaults}
        selectedCostume={selectedCostume}
        onSelectCostume={handleSelectCostume}
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
        selectedOccasion={selectedOccasion}
        onSelectOccasion={setSelectedOccasion}
        selectedAccessories={selectedAccessories}
        onToggleAccessory={handleToggleAccessory}
        isAnalyzing={isAnalyzing}
        aiResult={aiResult}
        onTriggerAI={triggerAIAnalysis}
        onSaveToLookbook={handleSaveToLookbook}
        isSaved={isCurrentSaved}
        onOpenWarningModal={() => setIsWarningModalOpen(true)}
      />

      {/* 3. Bộ sưu tập Kho tàng Cổ phục Triều Nguyễn */}
      <CostumeCatalogSection onSelectFor3D={handleSelectCostumeFromCatalog} />

      {/* 4. Thư viện Danh thắng & Di tích Cố Đô thực tế */}
      <LandmarksGallerySection />

      {/* 5. Footer Bảo tàng số */}
      <Footer />

      {/* Modal Lookbook & So sánh */}
      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        lookbookList={lookbookList}
        onDeleteLook={handleDeleteLook}
        onApplyLook={handleApplyLook}
      />

      {/* Modal Cảnh báo sai lệch văn hóa */}
      <WarningModal
        isOpen={isWarningModalOpen}
        onClose={() => setIsWarningModalOpen(false)}
        warnings={aiResult?.warnings || []}
        suggestions={aiResult?.suggestions || []}
      />
    </div>
  );
}
