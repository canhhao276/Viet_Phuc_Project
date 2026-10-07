// ============================================================================
// GEMINI API SERVICE — VIỆT PHỤC REMIX
// Tác giả: Thành viên 2 (Data & Logic)
// Mục đích: Kết nối Gemini API, xử lý request/response, fallback khi lỗi
// ============================================================================

import {
  SYSTEM_PROMPT,
  buildOutfitSuggestionPrompt,
  buildOutfitDescriptionPrompt,
  buildCultureFlashcardPrompt,
  buildCulturalWarningPrompt,
  buildLookbookContentPrompt,
  buildRemixSuggestionPrompt,
  buildImageGenerationPrompt,
  parseGeminiResponse,
  validateGeminiOutput
} from './geminiPrompts.js';

// ---------------------------------------------------------------------------
// 1. CẤU HÌNH GEMINI API
// ---------------------------------------------------------------------------

// API Key nên được đặt trong .env hoặc truyền từ bên ngoài
// KHÔNG hardcode API key trong source code
const GEMINI_CONFIG = {
  // Sử dụng Gemini 2.0 Flash (miễn phí, nhanh, phù hợp cho demo)
  apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
  // Fallback model
  fallbackUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',

  generationConfig: {
    temperature: 0.7,        // Cân bằng giữa sáng tạo và nhất quán
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 1024,   // Giới hạn output ngắn gọn
    responseMimeType: 'application/json' // Force JSON output
  }
};

// ---------------------------------------------------------------------------
// 2. HÀM GỌI GEMINI API CƠ BẢN
// ---------------------------------------------------------------------------

/**
 * Gọi Gemini API với prompt cho trước.
 * @param {string} prompt - User prompt
 * @param {string} apiKey - Gemini API key
 * @param {Object} options - Tùy chọn bổ sung
 * @returns {Object|null} Parsed JSON response hoặc null
 */
async function callGeminiAPI(prompt, apiKey, options = {}) {
  if (!apiKey) {
    console.warn('[GeminiService] No API key provided, using fallback data.');
    return null;
  }

  const url = `${options.apiUrl || GEMINI_CONFIG.apiUrl}?key=${apiKey}`;

  const requestBody = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      ...GEMINI_CONFIG.generationConfig,
      ...(options.generationConfig || {})
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      console.error(`[GeminiService] API error: ${response.status} ${response.statusText}`);

      // Thử fallback model nếu model chính lỗi
      if (!options.isFallback && response.status !== 401) {
        console.log('[GeminiService] Trying fallback model...');
        return callGeminiAPI(prompt, apiKey, {
          ...options,
          apiUrl: GEMINI_CONFIG.fallbackUrl,
          isFallback: true
        });
      }
      return null;
    }

    const data = await response.json();

    // Extract text from Gemini response structure
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      console.error('[GeminiService] No text in response');
      return null;
    }

    return parseGeminiResponse(text);
  } catch (error) {
    console.error('[GeminiService] Network error:', error.message);
    return null;
  }
}

// ---------------------------------------------------------------------------
// 3. FALLBACK DATA (Khi không có API key hoặc API lỗi)
// ---------------------------------------------------------------------------

const FALLBACK_DATA = {
  outfitSuggestion: {
    lookName: 'Phong Hoa Đương Thời',
    outfit: {
      main: 'Áo Ngũ Thân Tay Chẽn đỏ gạch',
      bottom: 'Quần lụa trắng ống suông',
      tradAccessory: 'Quạt xếp trầm hương',
      modernAccent: 'Kính mát Y2K'
    },
    colorPalette: ['#8C2D19', '#FFFFFF', '#D4AF37'],
    reason: 'Sự kết hợp giữa truyền thống triều Nguyễn và phong cách Gen Z, vừa chuẩn mực vừa cá tính.',
    harmonyLevel: 'good',
    culturalNote: '5 thân áo tượng trưng cho tứ thân phụ mẫu và bản thân người mặc.',
    stylingTip: 'Thêm quạt xếp để tạo nét phong lưu khi chụp ảnh.'
  },

  outfitDescription: {
    title: 'Hồn Cổ Hơi Thở Mới',
    shortDesc: 'Sự giao hòa tinh tế giữa cốt cách triều Nguyễn và năng lượng phóng khoáng của tuổi trẻ đương đại.',
    storySnippet: 'Khi nét mực thước của ngũ thân hòa cùng sự phá cách Gen Z, tạo nên một phong cách độc bản không ai có.',
    hashtags: ['#VietPhucRemix', '#GenZHeritage', '#NguThan'],
    moodKeyword: 'phóng khoáng'
  },

  cultureFlashcard: {
    title: 'Tại sao gọi là "Ngũ Thân"?',
    content: 'Áo gồm 5 thân vải ghép lại, mang ý nghĩa Ngũ Thường trong triết lý Á Đông: Nhân, Lễ, Nghĩa, Trí, Tín.',
    funFact: '5 thân áo cũng tượng trưng cho cha mẹ đôi bên + bản thân — mỗi lần khoác áo là mang cả gia đình bên mình! 💫',
    category: 'symbolism'
  },

  culturalWarning: {
    title: 'Chưa phù hợp lắm bạn ơi!',
    message: 'Bộ phối này có điểm cần cân nhắc về mặt văn hóa. Hãy xem gợi ý bên dưới nhé!',
    suggestion: 'Thử đổi sang lựa chọn truyền thống hơn để chuẩn mực văn hóa.',
    severity: 'warning',
    ngheThanQuote: 'Nghê Thần thấy có thể hay hơn nè! 🤔',
    ngheThanMood: 'thinking'
  },

  lookbookContent: {
    lookbookTitle: 'Phong Hoa Đương Thời',
    caption: 'Khi cổ phong gặp Gen Z — một cuộc hội ngộ đẹp không ngờ ✨',
    shareDescription: 'Khám phá cách phối Việt phục siêu ấn tượng! Thử remix theo style của bạn nhé!',
    remixSuggestion: 'Thử đổi phụ kiện sang mũ beret để có vibe Indochine hơn!',
    editorNote: 'Bản phối thể hiện sự tôn trọng truyền thống trong ngôn ngữ thời trang hiện đại.'
  },

  remixSuggestion: {
    remixName: 'Cổ Phong Tân Thời',
    changes: [
      {
        item: 'Phụ kiện Gen Z',
        from: 'Kính Y2K',
        to: 'Mũ Beret',
        reason: 'Tạo vibe Indochine thơ mộng hơn'
      }
    ],
    remixVibe: 'Đông Dương hoài niệm pha lẫn nét lãng mạn Paris cổ điển',
    culturalCheck: 'OK — Phối hợp hài hòa, không vi phạm phẩm cấp'
  },
  
  imageGeneration: {
    imagePrompt: 'A cinematic full-body fashion shot of a young Vietnamese person wearing a traditional Ngu Than tunic and loose silk pants, styled with modern Y2K sunglasses and holding a wooden fan. Shot in golden hour lighting, vibrant, showing from head to toe, 8k resolution, photorealistic.'
  }
};

// ---------------------------------------------------------------------------
// 4. CÁC HÀM SERVICE CHÍNH (Public API)
// ---------------------------------------------------------------------------

/**
 * Gợi ý outfit phối đồ qua Gemini.
 */
export async function getOutfitSuggestion({ costumeName, occasionName, style, colorPreference }, apiKey) {
  const prompt = buildOutfitSuggestionPrompt({ costumeName, occasionName, style, colorPreference });
  const result = await callGeminiAPI(prompt, apiKey);

  if (result) {
    const validation = validateGeminiOutput(result, ['lookName', 'outfit', 'reason']);
    if (validation.isValid) return validation.data;
  }

  // Fallback
  return { ...FALLBACK_DATA.outfitSuggestion, lookName: `${costumeName} × ${occasionName}` };
}

/**
 * Viết mô tả ngắn cho outfit qua Gemini.
 */
export async function getOutfitDescription({ costumeName, bottomName, tradAccName, genzAccName, occasionName }, apiKey) {
  const prompt = buildOutfitDescriptionPrompt({ costumeName, bottomName, tradAccName, genzAccName, occasionName });
  const result = await callGeminiAPI(prompt, apiKey);

  if (result) {
    const validation = validateGeminiOutput(result, ['title', 'shortDesc']);
    if (validation.isValid) return validation.data;
  }

  return FALLBACK_DATA.outfitDescription;
}

/**
 * Sinh thẻ văn hóa (flashcard) qua Gemini.
 */
export async function getCultureFlashcard({ costumeName, costumeId, topic }, apiKey) {
  const prompt = buildCultureFlashcardPrompt({ costumeName, costumeId, topic });
  const result = await callGeminiAPI(prompt, apiKey);

  if (result) {
    const validation = validateGeminiOutput(result, ['title', 'content']);
    if (validation.isValid) return validation.data;
  }

  return FALLBACK_DATA.cultureFlashcard;
}

/**
 * Tạo cảnh báo văn hóa qua Gemini.
 */
export async function getCulturalWarning({ costumeName, mismatchItem, mismatchType, occasionName }, apiKey) {
  const prompt = buildCulturalWarningPrompt({ costumeName, mismatchItem, mismatchType, occasionName });
  const result = await callGeminiAPI(prompt, apiKey);

  if (result) {
    const validation = validateGeminiOutput(result, ['title', 'message', 'suggestion']);
    if (validation.isValid) return validation.data;
  }

  return FALLBACK_DATA.culturalWarning;
}

/**
 * Tạo nội dung lookbook qua Gemini.
 */
export async function getLookbookContent({ costumeName, bottomName, tradAccName, genzAccName, occasionName, harmonyScore }, apiKey) {
  const prompt = buildLookbookContentPrompt({ costumeName, bottomName, tradAccName, genzAccName, occasionName, harmonyScore });
  const result = await callGeminiAPI(prompt, apiKey);

  if (result) {
    const validation = validateGeminiOutput(result, ['lookbookTitle', 'caption']);
    if (validation.isValid) return validation.data;
  }

  return FALLBACK_DATA.lookbookContent;
}

/**
 * Gợi ý remix lookbook qua Gemini.
 */
export async function getRemixSuggestion({ originalLookName, mixFormula, desiredChange }, apiKey) {
  const prompt = buildRemixSuggestionPrompt({ originalLookName, mixFormula, desiredChange });
  const result = await callGeminiAPI(prompt, apiKey);

  if (result) {
    const validation = validateGeminiOutput(result, ['remixName', 'changes']);
    if (validation.isValid) return validation.data;
  }

  return FALLBACK_DATA.remixSuggestion;
}

/**
 * Sinh url ảnh minh họa hoàn chỉnh bằng AI Image Generator.
 * Sử dụng pollinations.ai (Free, không cần API Key) làm engine sinh ảnh.
 */
export async function generateOutfitImage({ costumeName, bottomName, tradAccName, genzAccName, occasionName, colorPalette }, apiKey, hfApiKey) {
  // B1: Gọi Gemini để dịch thông tin tiếng Việt thành câu prompt tiếng Anh xịn xò
  const prompt = buildImageGenerationPrompt({ costumeName, bottomName, tradAccName, genzAccName, occasionName, colorPalette });
  const result = await callGeminiAPI(prompt, apiKey);

  let imagePrompt = FALLBACK_DATA.imageGeneration.imagePrompt;
  
  if (result && result.imagePrompt) {
    imagePrompt = result.imagePrompt;
  }

  // B2: Gọi API sinh ảnh miễn phí của Pollinations (Bỏ enhance để gen cực nhanh 3-5s)
  const encodedPrompt = encodeURIComponent(imagePrompt);
  let imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=768&height=1024&nologo=true`;

  // Nếu có HuggingFace API Key, dùng model FLUX hoặc SDXL xịn xò
  if (hfApiKey && hfApiKey !== 'your_huggingface_api_key_here') {
    try {
      const hfResponse = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
        {
          headers: {
            Authorization: `Bearer ${hfApiKey}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: imagePrompt }),
        }
      );
      
      if (hfResponse.ok) {
        const imageBlob = await hfResponse.blob();
        imageUrl = URL.createObjectURL(imageBlob);
      } else {
        console.warn('[GeminiService] HuggingFace API failed. Falling back to Pollinations.');
      }
    } catch (err) {
      console.warn('[GeminiService] HuggingFace API network error. Falling back to Pollinations.');
    }
  }

  return {
    prompt: imagePrompt,
    imageUrl: imageUrl
  };
}

// ---------------------------------------------------------------------------
// 5. EXPORT DEFAULT SERVICE OBJECT
// ---------------------------------------------------------------------------

const GeminiService = {
  getOutfitSuggestion,
  getOutfitDescription,
  getCultureFlashcard,
  getCulturalWarning,
  getLookbookContent,
  getRemixSuggestion,
  generateOutfitImage,

  // Utility
  parseGeminiResponse,
  validateGeminiOutput,

  // Config (for testing)
  GEMINI_CONFIG,
  FALLBACK_DATA
};

export default GeminiService;
