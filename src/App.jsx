import React, { useState } from 'react';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import FeaturedShowcase from './components/FeaturedShowcase/FeaturedShowcase';
import ContextSelector from './components/ContextSelector/ContextSelector';
import SwipeStudio from './components/SwipeStudio/SwipeStudio';
import NgheThanModal from './components/NgheThanMascot/NgheThanModal';
import LookbookModal from './components/Lookbook/LookbookModal';
import LookbookGallery from './components/LookbookGallery/LookbookGallery';
import Footer from './components/Footer/Footer';
import { OCCASIONS, INITIAL_LOOKBOOKS } from './data/mockData';

export default function App() {
  // Active styling context (Occasion)
  const [selectedOccasion, setSelectedOccasion] = useState(OCCASIONS[0]);

  // Gallery of Lookbooks ("Lookbook Chuyền Tay")
  const [lookbooks, setLookbooks] = useState(INITIAL_LOOKBOOKS);

  // Modal states
  const [activeWarningRule, setActiveWarningRule] = useState(null);
  const [activeLookModal, setActiveLookModal] = useState(null);

  // Smooth scroll helper
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Callback when outfit is completed
  const handleFinishLook = (completedLook) => {
    setActiveLookModal(completedLook);
  };

  // Save lookbook to community gallery
  const handleSaveToGallery = (look) => {
    const newEntry = {
      id: `lb-${Date.now()}`,
      title: `${look.costume.name} - ${look.occasion.name}`,
      creator: 'Bạn (Gen Z Designer)',
      likes: 1,
      remixes: 0,
      costumeName: look.costume.name,
      costumeImg: look.costume.image,
      occasionName: look.occasion.name,
      palette: look.costume.colorScheme,
      mixFormula: `${look.costume.name} + ${look.bottom.name} + ${look.tradAcc.name} + ${look.genzAcc.name}`,
      harmonyScore: look.harmonyScore,
      storySnippet: look.costume.story
    };

    setLookbooks(prev => [newEntry, ...prev]);
    alert('✨ Tuyệt vời! Bộ phối của bạn đã được lưu vào Lookbook Chuyền Tay của cộng đồng!');
  };

  // Remix a lookbook from community
  const handleRemixLook = (lookItem) => {
    // Find matching occasion
    const matchOccasion = OCCASIONS.find(o => o.name === lookItem.occasionName) || OCCASIONS[0];
    setSelectedOccasion(matchOccasion);
    scrollTo('studio');
  };

  // Like a lookbook
  const handleLikeLook = (id) => {
    setLookbooks(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, likes: item.likes + 1 };
      }
      return item;
    }));
  };

  return (
    <div className="app-layout">
      {/* 1. Header Navigation */}
      <Header 
        onStartStyling={() => scrollTo('studio')}
        lookbookCount={lookbooks.length}
      />

      {/* 2. Hero Section */}
      <HeroSection 
        onStartStyling={() => scrollTo('studio')}
        onExploreLookbooks={() => scrollTo('lookbook-community')}
      />

      {/* 3. Featured Categories Showcase (3 Box Tràn Viền Chuẩn vietphuc.net) */}
      <FeaturedShowcase 
        onSelectCategory={() => scrollTo('studio')}
      />

      {/* 4. Context & Occasion Selector */}
      <ContextSelector 
        selectedOccasion={selectedOccasion}
        onSelectOccasion={(occ) => {
          setSelectedOccasion(occ);
          scrollTo('studio');
        }}
      />

      {/* 4. Core Swipe Studio (Tinder-style outfit composer) */}
      <SwipeStudio 
        selectedOccasion={selectedOccasion}
        onFinishLook={handleFinishLook}
        onTriggerWarning={(rule) => setActiveWarningRule(rule)}
      />

      {/* 5. Community Lookbook Board ("Chuyền Tay") */}
      <LookbookGallery 
        lookbooks={lookbooks}
        onRemixLook={handleRemixLook}
        onLikeLook={handleLikeLook}
      />

      {/* 6. Footer & Credits */}
      <Footer />

      {/* Modals & Overlays */}
      <NgheThanModal 
        warningRule={activeWarningRule}
        onClose={() => setActiveWarningRule(null)}
      />

      <LookbookModal 
        lookData={activeLookModal}
        onClose={() => setActiveLookModal(null)}
        onSaveToGallery={handleSaveToGallery}
        onRemix={handleRemixLook}
      />
    </div>
  );
}
