// ============================================================================
// BỘ PROMPT GEMINI — VIỆT PHỤC REMIX
// Tác giả: Thành viên 2 (Data & Logic)
// Mục đích: Prompt templates ổn định cho Gemini API, đảm bảo output
//           ngắn gọn, đúng format, dễ hiển thị trên giao diện
// ============================================================================

// ---------------------------------------------------------------------------
// 1. SYSTEM PROMPT (Chung cho tất cả request)
// ---------------------------------------------------------------------------
export const SYSTEM_PROMPT = `Bạn là "Nghê Thần AI" — trợ lý tư vấn phối trang phục truyền thống Việt Nam (Việt phục) cho ứng dụng Việt Phục Remix.

NGUYÊN TẮC BẮT BUỘC:
1. Trả lời bằng tiếng Việt (TRỪ KHI có yêu cầu đặc biệt như viết prompt tiếng Anh)
2. Giọng điệu: thân thiện, trẻ trung, Gen Z, KHÔNG dài dòng
3. Mỗi câu trả lời PHẢI ngắn gọn (tối đa 3-4 câu cho mỗi phần)
4. PHẢI trả về đúng JSON format được yêu cầu
5. Nội dung văn hóa phải chính xác, dựa trên lịch sử Việt Nam
6. Khi cảnh báo: nhẹ nhàng, hài hước, KHÔNG phê bình
7. Luôn đưa ra giải pháp thay thế kèm lý do
8. Sử dụng emoji phù hợp (1-2 emoji/đoạn, không spam)

KIẾN THỨC CỐT LÕI:
- Áo Ngũ Thân (Tay Chẽn): 5 thân, 5 khuy, triều Nguyễn, thường phục
- Áo Tấc (Ngũ Thân Tay Thụng): lễ phục triều Nguyễn, tay rộng trang nghiêm
- Áo Tứ Thân: dân gian Bắc Bộ, 4 vạt, liền chị quan họ Kinh Bắc
- Áo Dài: quốc phục cận-hiện đại, tà dài thướt tha
- Áo Nhật Bình: đại lễ phục cung đình, cổ chữ nhật, Hoàng gia
- Áo Đối Khâm: cổ phong Lý-Trần-Lê, 2 vạt đối xứng

QUY TẮC PHẨM CẤP (KHÔNG ĐƯỢC PHỐI CHÉO):
- Cung đình: Nhật Bình, Áo Tấc
- Quý tộc: Đối Khâm
- Thường phục: Ngũ Thân tay chẽn, Áo Dài
- Dân gian: Tứ Thân`;

// ---------------------------------------------------------------------------
// 2. PROMPT: GỢI Ý OUTFIT
// ---------------------------------------------------------------------------

/**
 * Tạo prompt gợi ý outfit phối đồ.
 * @param {Object} params
 * @param {string} params.costumeName - Tên trang phục
 * @param {string} params.occasionName - Tên bối cảnh/sự kiện
 * @param {string} params.style - Phong cách mong muốn (truyền thống / cách tân / remix)
 * @param {string} params.colorPreference - Màu sắc ưa thích (optional)
 * @returns {string} Prompt hoàn chỉnh
 */
export function buildOutfitSuggestionPrompt({ costumeName, occasionName, style = 'remix', colorPreference = '' }) {
  return `Gợi ý bộ phối Việt phục hoàn chỉnh.

INPUT:
- Trang phục chính: ${costumeName}
- Bối cảnh: ${occasionName}
- Phong cách: ${style}
${colorPreference ? `- Màu ưa thích: ${colorPreference}` : ''}

YÊU CẦU OUTPUT (JSON):
{
  "lookName": "Tên look sáng tạo (3-5 từ, có chất thơ)",
  "outfit": {
    "main": "Tên trang phục chính + màu sắc",
    "bottom": "Quần/Váy phù hợp",
    "tradAccessory": "Phụ kiện truyền thống",
    "modernAccent": "Phụ kiện hiện đại (nếu style remix)"
  },
  "colorPalette": ["#hex1", "#hex2", "#hex3"],
  "reason": "Lý do phù hợp (1-2 câu ngắn gọn)",
  "harmonyLevel": "excellent / good / fair",
  "culturalNote": "Ghi chú văn hóa ngắn (1 câu)",
  "stylingTip": "Mẹo phối thêm (1 câu)"
}

CHỈ TRẢ VỀ JSON, KHÔNG có text khác.`;
}

// ---------------------------------------------------------------------------
// 3. PROMPT: VIẾT MÔ TẢ NGẮN CHO OUTFIT
// ---------------------------------------------------------------------------

/**
 * Tạo prompt viết mô tả ngắn cho outfit đã phối.
 * @param {Object} params
 * @param {string} params.costumeName - Tên trang phục
 * @param {string} params.bottomName - Tên quần/váy
 * @param {string} params.tradAccName - Tên phụ kiện truyền thống
 * @param {string} params.genzAccName - Tên phụ kiện Gen Z
 * @param {string} params.occasionName - Tên bối cảnh
 * @returns {string} Prompt hoàn chỉnh
 */
export function buildOutfitDescriptionPrompt({ costumeName, bottomName, tradAccName, genzAccName, occasionName }) {
  return `Viết mô tả ngắn cho bộ phối Việt phục sau.

BỘ PHỐI:
- Áo chính: ${costumeName}
- Quần/Váy: ${bottomName}
- Phụ kiện cổ truyền: ${tradAccName}
- Phụ kiện Gen Z: ${genzAccName}
- Bối cảnh: ${occasionName}

YÊU CẦU OUTPUT (JSON):
{
  "title": "Tiêu đề look (3-5 từ, sáng tạo, có chất thơ)",
  "shortDesc": "Mô tả 1-2 câu, style tạp chí thời trang, dùng từ gợi cảm xúc",
  "storySnippet": "Câu chuyện ngắn 1-2 câu về cảm hứng phối đồ",
  "hashtags": ["#tag1", "#tag2", "#tag3"],
  "moodKeyword": "1 từ khóa tâm trạng (VD: thanh lịch, phóng khoáng, mộc mạc)"
}

CHỈ TRẢ VỀ JSON, KHÔNG có text khác.`;
}

// ---------------------------------------------------------------------------
// 4. PROMPT: SINH THẺ VĂN HÓA (FLASHCARD)
// ---------------------------------------------------------------------------

/**
 * Tạo prompt sinh thẻ văn hóa cho trang phục.
 * @param {Object} params
 * @param {string} params.costumeName - Tên trang phục
 * @param {string} params.costumeId - ID trang phục
 * @param {string} params.topic - Chủ đề cụ thể (optional): 'origin', 'symbolism', 'styling', 'funfact'
 * @returns {string} Prompt hoàn chỉnh
 */
export function buildCultureFlashcardPrompt({ costumeName, costumeId, topic = 'general' }) {
  const topicGuide = {
    origin: 'nguồn gốc lịch sử và thời kỳ',
    symbolism: 'ý nghĩa biểu tượng và triết lý',
    styling: 'cách phối đồ và mẹo thời trang',
    funfact: 'fact thú vị ít người biết',
    general: 'bất kỳ khía cạnh nào thú vị'
  };

  return `Tạo một thẻ văn hóa (flashcard) ngắn gọn về Việt phục.

TRANG PHỤC: ${costumeName} (ID: ${costumeId})
CHỦ ĐỀ: ${topicGuide[topic] || topicGuide.general}

YÊU CẦU OUTPUT (JSON):
{
  "title": "Tiêu đề hấp dẫn (dạng câu hỏi hoặc tuyên bố gây tò mò)",
  "content": "Nội dung chính (2-3 câu, chính xác về lịch sử, dễ hiểu)",
  "funFact": "Fun fact thú vị (1 câu, style Gen Z, có emoji)",
  "category": "origin / symbolism / styling / funfact"
}

NGUYÊN TẮC:
- Nội dung PHẢI chính xác về mặt lịch sử
- Viết cho Gen Z đọc — ngắn, dễ hiểu, có điểm nhấn
- Fun fact nên gây bất ngờ hoặc tạo liên kết với đời sống hiện đại
- KHÔNG dài dòng, KHÔNG giáo điều

CHỈ TRẢ VỀ JSON, KHÔNG có text khác.`;
}

// ---------------------------------------------------------------------------
// 5. PROMPT: CẢNH BÁO VĂN HÓA (Nghê Thần)
// ---------------------------------------------------------------------------

/**
 * Tạo prompt cảnh báo văn hóa khi phối sai.
 * @param {Object} params
 * @param {string} params.costumeName - Tên trang phục
 * @param {string} params.mismatchItem - Món đồ phối sai
 * @param {string} params.mismatchType - Loại vi phạm: 'bottom', 'accessory', 'color', 'occasion'
 * @param {string} params.occasionName - Bối cảnh sử dụng
 * @returns {string} Prompt hoàn chỉnh
 */
export function buildCulturalWarningPrompt({ costumeName, mismatchItem, mismatchType, occasionName }) {
  const typeContext = {
    bottom: 'quần/váy phối cùng',
    accessory: 'phụ kiện phối cùng',
    color: 'màu sắc phối',
    occasion: 'bối cảnh sử dụng'
  };

  return `Tạo cảnh báo văn hóa nhẹ nhàng cho bộ phối Việt phục chưa hợp lý.

TÌNH HUỐNG:
- Trang phục: ${costumeName}
- Vấn đề: ${typeContext[mismatchType] || 'chi tiết'} "${mismatchItem}" chưa phù hợp
- Bối cảnh: ${occasionName}

YÊU CẦU OUTPUT (JSON):
{
  "title": "Tiêu đề cảnh báo (ngắn, không quá nghiêm trọng)",
  "message": "Giải thích tại sao chưa phù hợp (2 câu, nhẹ nhàng, có dẫn chứng lịch sử ngắn)",
  "suggestion": "Gợi ý thay thế cụ thể (1-2 câu)",
  "severity": "critical / warning / info",
  "ngheThanQuote": "1 câu nói hài hước kiểu Gen Z của Nghê Thần (có emoji)",
  "ngheThanMood": "shocked / worried / thinking / gentle"
}

NGUYÊN TẮC QUAN TRỌNG:
- Giọng điệu: bạn bè, KHÔNG phê bình, KHÔNG giáo điều
- Luôn kèm giải pháp thay thế
- Nghê Thần nói như Gen Z nhưng kiến thức đúng
- KHÔNG dùng từ "sai", "xấu", "không được" — thay bằng "chưa phù hợp", "có thể hay hơn"

CHỈ TRẢ VỀ JSON, KHÔNG có text khác.`;
}

// ---------------------------------------------------------------------------
// 6. PROMPT: TẠO NỘI DUNG LOOKBOOK
// ---------------------------------------------------------------------------

/**
 * Tạo prompt viết nội dung cho lookbook.
 * @param {Object} params
 * @param {string} params.costumeName - Tên trang phục
 * @param {string} params.bottomName - Tên quần/váy
 * @param {string} params.tradAccName - Tên phụ kiện truyền thống
 * @param {string} params.genzAccName - Tên phụ kiện Gen Z
 * @param {string} params.occasionName - Tên bối cảnh
 * @param {number} params.harmonyScore - Điểm hài hòa
 * @returns {string} Prompt hoàn chỉnh
 */
export function buildLookbookContentPrompt({ costumeName, bottomName, tradAccName, genzAccName, occasionName, harmonyScore }) {
  return `Tạo nội dung lookbook cho bộ phối Việt phục.

BỘ PHỐI:
- Áo: ${costumeName}
- Quần/Váy: ${bottomName}
- Phụ kiện truyền thống: ${tradAccName}
- Phụ kiện Gen Z: ${genzAccName}
- Bối cảnh: ${occasionName}
- Điểm hài hòa: ${harmonyScore}%

YÊU CẦU OUTPUT (JSON):
{
  "lookbookTitle": "Tên lookbook (3-5 từ, có chất thơ / editorial)",
  "caption": "Caption ngắn cho social media (1-2 câu, catchy)",
  "shareDescription": "Mô tả khi chia sẻ (1-2 câu, gợi cảm hứng cho người xem muốn remix)",
  "remixSuggestion": "Gợi ý cách remix (1 câu, VD: 'Thử đổi phụ kiện sang...')",
  "editorNote": "Ghi chú biên tập viên (1 câu, style tạp chí)"
}

NGUYÊN TẮC:
- Style editorial / tạp chí thời trang Gen Z
- Ngắn gọn, catchy, đáng share
- Mang tinh thần "vừa truyền thống vừa phá cách"

CHỈ TRẢ VỀ JSON, KHÔNG có text khác.`;
}

// ---------------------------------------------------------------------------
// 7. PROMPT: GỢI Ý REMIX
// ---------------------------------------------------------------------------

/**
 * Tạo prompt gợi ý remix từ một lookbook có sẵn.
 * @param {Object} params
 * @param {string} params.originalLookName - Tên look gốc
 * @param {string} params.mixFormula - Công thức phối gốc
 * @param {string} params.desiredChange - Thay đổi mong muốn (optional)
 * @returns {string} Prompt hoàn chỉnh
 */
export function buildRemixSuggestionPrompt({ originalLookName, mixFormula, desiredChange = '' }) {
  return `Gợi ý cách remix bộ phối Việt phục có sẵn.

LOOK GỐC:
- Tên: ${originalLookName}
- Công thức: ${mixFormula}
${desiredChange ? `- Thay đổi mong muốn: ${desiredChange}` : '- Thay đổi: tự đề xuất sáng tạo'}

YÊU CẦU OUTPUT (JSON):
{
  "remixName": "Tên phiên bản remix (sáng tạo, khác biệt với bản gốc)",
  "changes": [
    {
      "item": "Tên món cần đổi",
      "from": "Từ...",
      "to": "Sang...",
      "reason": "Lý do đổi (1 câu ngắn)"
    }
  ],
  "remixVibe": "Mô tả vibe mới (1 câu)",
  "culturalCheck": "OK / Cần lưu ý + chi tiết ngắn"
}

NGUYÊN TẮC:
- Remix phải khác biệt rõ với bản gốc
- Vẫn phải đảm bảo tính văn hóa
- Tối đa 2-3 thay đổi (không đổi hết)
- Gợi ý phải thực tế, dùng các phụ kiện có trong hệ thống

CHỈ TRẢ VỀ JSON, KHÔNG có text khác.`;
}

// ---------------------------------------------------------------------------
// 8. PROMPT: TẠO PROMPT GEN ẢNH (TIẾNG ANH)
// ---------------------------------------------------------------------------

/**
 * Tạo prompt tiếng Anh chuyên sâu để gửi cho Image Generation API (như Midjourney, DALL-E, Pollinations).
 */
export function buildImageGenerationPrompt({ costumeName, bottomName, tradAccName, genzAccName, occasionName, colorPalette }) {
  return `Write a highly detailed English prompt for an AI Image Generator (like Midjourney or DALL-E) to generate a realistic full-body fashion lookbook photo of a young Vietnamese person wearing a modernized traditional outfit.

OUTFIT DETAILS:
- Main Costume: ${costumeName} (Translate to descriptive English, e.g., "Ao Dai", "Ngu Than traditional tunic")
- Bottom: ${bottomName} (Very important to show the pants/skirt in the image)
- Footwear: ${tradAccName}
- Headwear & Accessories: ${genzAccName}
- Colors: ${colorPalette ? colorPalette.join(', ') : 'harmonious colors'}
- Vibe/Context: ${occasionName}

REQUIREMENTS OUTPUT (JSON):
{
  "imagePrompt": "The highly descriptive english prompt. Must include: subject description, outfit details, lighting, camera angle, and background context. Start with 'A cinematic full-body fashion shot of...' and explicitly mention seeing the bottom/pants and footwear. (max 50-70 words)"
}

CHỈ TRẢ VỀ JSON, KHÔNG CÓ TEXT KHÁC.`;
}

// ---------------------------------------------------------------------------
// 9. HÀM TIỆN ÍCH: PARSE RESPONSE TỪ GEMINI
// ---------------------------------------------------------------------------

/**
 * Parse response từ Gemini, xử lý edge cases.
 * @param {string} rawResponse - Response raw từ Gemini API
 * @returns {Object|null} Parsed JSON hoặc null nếu lỗi
 */
export function parseGeminiResponse(rawResponse) {
  if (!rawResponse) return null;

  try {
    // Thử parse trực tiếp
    return JSON.parse(rawResponse);
  } catch (e) {
    // Thử tìm JSON trong response (Gemini đôi khi wrap trong markdown)
    const jsonMatch = rawResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch && jsonMatch[1]) {
      try {
        return JSON.parse(jsonMatch[1].trim());
      } catch (e2) {
        // ignore
      }
    }

    // Thử tìm JSON object trực tiếp
    const objectMatch = rawResponse.match(/\{[\s\S]*\}/);
    if (objectMatch) {
      try {
        return JSON.parse(objectMatch[0]);
      } catch (e3) {
        // ignore
      }
    }
  }

  return null;
}

/**
 * Validate output từ Gemini theo schema mong đợi.
 * @param {Object} parsed - Object đã parse
 * @param {Array} requiredFields - Danh sách field bắt buộc
 * @returns {Object} { isValid, missingFields, data }
 */
export function validateGeminiOutput(parsed, requiredFields = []) {
  if (!parsed || typeof parsed !== 'object') {
    return { isValid: false, missingFields: requiredFields, data: null };
  }

  const missingFields = requiredFields.filter(field => !(field in parsed));

  return {
    isValid: missingFields.length === 0,
    missingFields,
    data: parsed
  };
}
