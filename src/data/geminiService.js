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
  // Sử dụng Gemini 3.1 Flash Lite (mô hình mới nhất, siêu nhanh và phản hồi cực nhạy)
  apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent',
  // Fallback model: Gemini 3.8 Flash
  fallbackUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent',

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
/**
 * Sinh url ảnh minh họa hoàn chỉnh cho Lookbook Tạp Chí.
 * Ưu tiên 1: Hugging Face Spaces (FLUX.1-schnell qua @gradio/client) - 100% MIỄN PHÍ, chất lượng 8K photorealistic.
 * Ưu tiên 2: Segmind SDXL (nếu có API Key & credits).
 * Fallback: Bộ sưu tập ảnh bìa tạp chí Di Sản Hoàng Gia chuẩn mực 100% văn hóa triều đại.
 */
export async function generateOutfitImage(
  { costumeId, costumeName, bottomName, tradAccName, genzAccName, occasionName, colorPalette },
  apiKey,
  segmindApiKey,
  hfToken
) {
  // Bộ sưu tập ảnh bìa tạp chí Lookbook di sản chuẩn mực 100% văn hóa triều đại
  const LOOKBOOK_CURATED = {
    ao_ngu_than: '/lookbook/ao_ngu_than.jpg',
    ao_tac: '/lookbook/ao_tac.jpg',
    ao_nhat_binh: '/lookbook/ao_nhat_binh.jpg',
    ao_tu_than: '/lookbook/ao_tu_than.jpg',
    ao_dai: '/lookbook/ao_dai.jpg',
    ao_doi_kham: '/lookbook/ao_doi_kham.jpg',
    ao_giao_linh: '/lookbook/ao_giao_linh.jpg'
  };

  const curatedFallback = (costumeId && LOOKBOOK_CURATED[costumeId]) || '/lookbook/ao_ngu_than.jpg';

  let imagePrompt = `A high-end editorial fashion photography of a young Vietnamese model wearing traditional royal ${costumeName || 'Vietnamese costume'} with ${bottomName || 'flowing silk trousers'}, styled with modern ${genzAccName || 'fashion accessories'} for ${occasionName || 'celebration'}, Vogue magazine photoshoot, authentic Vietnamese dynasty heritage aesthetic, intricate embroidery patterns, cinema lighting, 8k resolution, photorealistic.`;

  // B1: Nếu có Gemini API Key, nhờ Gemini tạo prompt tiếng Anh điện ảnh hoàn hảo
  if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    try {
      const geminiUrl = `${GEMINI_CONFIG.apiUrl}?key=${apiKey}`;
      const geminiBody = {
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ parts: [{ text: buildImageGenerationPrompt({ costumeName, bottomName, tradAccName, genzAccName, occasionName, colorPalette }) }] }],
        generationConfig: GEMINI_CONFIG.generationConfig
      };

      const geminiRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiBody)
      });

      if (geminiRes.ok) {
        const data = await geminiRes.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = parseGeminiResponse(text);
          if (parsed && parsed.imagePrompt) imagePrompt = parsed.imagePrompt;
        }
      }
    } catch (err) {
      console.warn('Gemini prompt generation skipped, using curated prompt template:', err);
    }
  }

  // B2: Gọi Hugging Face Spaces (FLUX.1-schnell qua @gradio/client) - Hoàn toàn MIỄN PHÍ
  try {
    const { Client } = await import('@gradio/client');
    const clientOptions = hfToken && hfToken !== 'your_hf_token_here' ? { hf_token: hfToken } : {};

    // Timeout 25s phòng trường hợp ZeroGPU bị xếp hàng lâu
    const connectPromise = Client.connect('black-forest-labs/FLUX.1-schnell', clientOptions);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Hugging Face Space Timeout (25s)')), 25000)
    );

    const client = await Promise.race([connectPromise, timeoutPromise]);

    const predictPromise = client.predict('/infer', {
      prompt: imagePrompt,
      seed: Math.floor(Math.random() * 1000000),
      randomize_seed: true,
      width: 768,
      height: 1024,
      num_inference_steps: 4
    });

    const result = await Promise.race([predictPromise, timeoutPromise]);
    const generatedUrl = result?.data?.[0]?.url;

    if (generatedUrl) {
      return {
        prompt: imagePrompt,
        imageUrl: generatedUrl,
        engine: 'Hugging Face Spaces (FLUX.1-schnell ZeroGPU)',
        isAiGenerated: true
      };
    }
  } catch (hfErr) {
    console.warn('Hugging Face Spaces generation unavailable, checking fallbacks:', hfErr);
  }

  // B3: Thử Segmind SDXL nếu người dùng có key Segmind
  if (segmindApiKey && segmindApiKey !== 'your_segmind_api_key_here') {
    try {
      const segmindResponse = await fetch('https://api.segmind.com/v1/sdxl1.0-txt2img', {
        method: 'POST',
        headers: {
          'x-api-key': segmindApiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: imagePrompt,
          negative_prompt: 'ugly, blurry, bad anatomy, bad resolution, deformed, disfigured, text, watermark',
          style: 'base',
          samples: 1,
          scheduler: 'UniPC',
          num_inference_steps: 25,
          guidance_scale: 8,
          strength: 1,
          seed: Math.floor(Math.random() * 1000000000),
          img_width: 1024,
          img_height: 1024,
          refiner: true
        })
      });

      if (segmindResponse.ok) {
        const imageBlob = await segmindResponse.blob();
        return {
          prompt: imagePrompt,
          imageUrl: URL.createObjectURL(imageBlob),
          engine: 'Segmind SDXL',
          isAiGenerated: true
        };
      }
    } catch (segErr) {
      console.warn('Segmind fallback failed:', segErr);
    }
  }

  // B4: Fallback mượt mà: Ảnh Lookbook di sản chuẩn mực hoàng gia
  return {
    prompt: imagePrompt,
    imageUrl: curatedFallback,
    engine: 'Bộ Sưu Tập Di Sản Chuẩn Mực',
    isAiGenerated: false
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
