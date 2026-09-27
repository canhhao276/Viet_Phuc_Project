import { useState, useCallback, useEffect } from 'react';
import { COSTUMES } from '../data/costumes';
import { OCCASIONS } from '../data/occasions';
import { ACCESSORIES } from '../data/accessories';
import { generateAIStylingRecommendation } from '../services/aiStylistService';
import confetti from 'canvas-confetti';

const DEFAULT_BODY = {
  height: 170,
  shoulder: 40,
  chest: 86,
  waist: 68,
  hip: 92,
  arm: 60
};

export function useStylistState() {
  // Trạng thái cơ thể
  const [bodyMeasurements, setBodyMeasurements] = useState(DEFAULT_BODY);

  // Trạng thái trang phục
  const [selectedCostume, setSelectedCostume] = useState('ao_ngu_than_tay_chen');
  const [selectedColor, setSelectedColor] = useState('#1A365D');
  const [selectedOccasion, setSelectedOccasion] = useState('tet_nguyen_dan');
  const [selectedAccessories, setSelectedAccessories] = useState([
    ACCESSORIES.find(a => a.id === 'khan_dong'),
    ACCESSORIES.find(a => a.id === 'quat_tram_huong')
  ].filter(Boolean));

  // Trạng thái AI
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Trạng thái Lookbook
  const [lookbookList, setLookbookList] = useState([
    {
      id: 'sample_look_1',
      outfitName: 'Hương Sắc Kinh Kỳ',
      suitabilityScore: 98,
      costumeId: 'ao_ngu_than_tay_chen',
      costumeName: 'Áo Ngũ Thân Tay Chẽn',
      costumeColor: '#1A365D',
      occasionName: 'Tết Cổ Truyền & Du Xuân',
      accessories: [ACCESSORIES[0], ACCESSORIES[2]],
      culturalExplanation: 'Dáng áo ngũ thân suông thẳng, sắc xanh lam chàm trang nhã tôn vinh nét nho nhã, uyên bác của nam nhân Cố Đô.'
    },
    {
      id: 'sample_look_2',
      outfitName: 'Uy Nghi Hoàng Tộc',
      suitabilityScore: 96,
      costumeId: 'ao_tac_tay_thung',
      costumeName: 'Áo Tấc (Ngũ Thân Tay Thụng)',
      costumeColor: '#8C1D18',
      occasionName: 'Lễ Hội Văn Hóa & Ngoại Giao',
      accessories: [ACCESSORIES[0], ACCESSORIES[3]],
      culturalExplanation: 'Đại lễ phục tay thụng rộng màu đỏ gấm hoa cát tường, thể hiện khí độ uy nghiêm và lòng hiếu đạo đối với tiền nhân.'
    }
  ]);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);

  // Trạng thái Modal Cảnh Báo Văn Hóa
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  // Thay đổi chỉ số cơ thể
  const handleMeasurementChange = useCallback((key, value) => {
    setBodyMeasurements(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleResetBodyDefaults = useCallback(() => {
    setBodyMeasurements(DEFAULT_BODY);
  }, []);

  // Đổi trang phục -> tự cập nhật màu mặc định tương ứng
  const handleSelectCostume = useCallback((costumeId) => {
    setSelectedCostume(costumeId);
    const costume = COSTUMES.find(c => c.id === costumeId);
    if (costume && costume.availableColors.length > 0) {
      // Giữ nguyên màu nếu màu hiện tại có trong trang phục mới, ngược lại dùng màu mặc định
      const hasColor = costume.availableColors.some(col => col.hex === selectedColor);
      if (!hasColor) {
        setSelectedColor(costume.defaultColor || costume.availableColors[0].hex);
      }
    }
  }, [selectedColor]);

  // Bật/tắt phụ kiện
  const handleToggleAccessory = useCallback((accessory) => {
    setSelectedAccessories(prev => {
      const exists = prev.some(a => a.id === accessory.id);
      if (exists) {
        return prev.filter(a => a.id !== accessory.id);
      } else {
        return [...prev, accessory];
      }
    });
  }, []);

  // Gọi AI Stylist phân tích
  const triggerAIAnalysis = useCallback(async () => {
    setIsAnalyzing(true);
    const costume = COSTUMES.find(c => c.id === selectedCostume) || COSTUMES[0];
    const occasion = OCCASIONS.find(o => o.id === selectedOccasion) || OCCASIONS[0];

    try {
      const result = await generateAIStylingRecommendation({
        costume,
        occasion,
        colorHex: selectedColor,
        accessories: selectedAccessories,
        bodyMeasurements
      });

      setAiResult(result);

      // Nếu điểm cao và chuẩn mực, bắn pháo hoa lấp lánh (Confetti)
      if (result.suitabilityScore >= 90 && result.isAuthentic) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#D4AF37', '#8C1D18', '#2E6F68', '#FFFFFF']
        });
      }
    } catch (err) {
      console.error('Error generating AI styling:', err);
    } finally {
      setIsAnalyzing(false);
    }
  }, [selectedCostume, selectedOccasion, selectedColor, selectedAccessories, bodyMeasurements]);

  // Tự động phân tích lần đầu khi tải ứng dụng
  useEffect(() => {
    triggerAIAnalysis();
  }, []);

  // Lưu vào Lookbook
  const handleSaveToLookbook = useCallback(() => {
    if (!aiResult) return;
    const costume = COSTUMES.find(c => c.id === selectedCostume) || COSTUMES[0];
    const occasion = OCCASIONS.find(o => o.id === selectedOccasion) || OCCASIONS[0];

    const newLook = {
      id: 'look_' + Date.now(),
      outfitName: aiResult.outfitName,
      suitabilityScore: aiResult.suitabilityScore,
      costumeId: costume.id,
      costumeName: costume.name,
      costumeColor: selectedColor,
      occasionName: occasion.name,
      accessories: [...selectedAccessories],
      culturalExplanation: aiResult.culturalExplanation
    };

    setLookbookList(prev => [newLook, ...prev]);
  }, [aiResult, selectedCostume, selectedColor, selectedOccasion, selectedAccessories]);

  const isCurrentSaved = lookbookList.some(
    item => item.outfitName === aiResult?.outfitName && item.costumeColor === selectedColor
  );

  const handleDeleteLook = useCallback((id) => {
    setLookbookList(prev => prev.filter(i => i.id !== id));
  }, []);

  const handleApplyLook = useCallback((look) => {
    setSelectedCostume(look.costumeId);
    setSelectedColor(look.costumeColor);
    if (look.accessories) {
      setSelectedAccessories(look.accessories);
    }
  }, []);

  return {
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
  };
}
