// Data nguồn gốc cho dự án Việt Phục Remix

export const OCCASIONS = [
  {
    id: 'tet',
    name: 'Tết Du Xuân Phố Cổ',
    tagline: 'Rực rỡ sắc đỏ may mắn, chụp ảnh dạo phố ngắm hoa',
    icon: 'Sparkles',
    recommendedCostumes: ['ao_dai', 'ao_tac', 'ao_ngu_than'],
    accentColor: '#9E2A2B'
  },
  {
    id: 'ky_yeu',
    name: 'Kỷ Yếu & Thanh Xuân',
    tagline: 'Trẻ trung, gọn gàng, lưu giữ khoảnh khắc học đường đáng nhớ',
    icon: 'GraduationCap',
    recommendedCostumes: ['ao_dai', 'ao_ngu_than'],
    accentColor: '#1F4E46'
  },
  {
    id: 'le_hoi',
    name: 'Lễ Hội & Không Gian Di Sản',
    tagline: 'Trang trọng, chuẩn mực khi viếng đình, chùa, đền di tích',
    icon: 'Landmark',
    recommendedCostumes: ['ao_tac', 'ao_tu_than', 'ao_nhat_binh'],
    accentColor: '#C99700'
  },
  {
    id: 'indie',
    name: 'Dạo Phố Nghệ Thuật (Indie Look)',
    tagline: 'Phá cách Gen Z: Việt phục mix cùng phụ kiện đương đại',
    icon: 'Camera',
    recommendedCostumes: ['ao_ngu_than', 'ao_doi_kham', 'ao_dai'],
    accentColor: '#EE96A5'
  },
  {
    id: 'da_tiec',
    name: 'Dạ Tiệc & Sự Kiện Cố Đô',
    tagline: 'Quyền quý, lộng lẫy và nổi bật giữa ánh đèn sự kiện',
    icon: 'Crown',
    recommendedCostumes: ['ao_nhat_binh', 'ao_tac', 'ao_doi_kham'],
    accentColor: '#1B2E4B'
  }
];

export const COSTUMES = [
  // -------------------------------------------------------------------------
  // 1. NHÓM TRANG PHỤC TRUYỀN THỐNG (3 MẪU)
  // -------------------------------------------------------------------------
  {
    id: 'ao_ngu_than',
    name: 'Áo Ngũ Thân Tay Chẽn',
    dynasty: 'Thời Nguyễn (Thế kỷ 18-19)',
    image: '/ao_viet_phuc/áo ngũ thân tay chẽn.jpg',
    category: 'Thường phục / Lễ phục nhẹ',
    story: 'Áo ngũ thân tay chẽn có 5 thân tượng trưng cho tứ thân phụ mẫu và chính mình, 5 khuy cài tượng trưng cho ngũ thường (Nhân - Lễ - Nghĩa - Trí - Tín). Ống tay ôm sát gọn gàng, cổ đứng chữ V, dáng dài thon thả. (Physical shape: authentic Vietnamese traditional tunic with narrow tight sleeves, high standing collar, 5 buttons fastened on the right, knee-length flowing panels, form-fitting silhouette).',
    gender: 'Unisex',
    formality: 4,
    colorScheme: ['#8C2D19', '#1A365D', '#D4AF37'],
    tags: ['Truyền Thống', 'Ngũ Thường', 'Gọn gàng'],
    type: 'traditional'
  },
  {
    id: 'ao_tac',
    name: 'Áo Tấc (Ngũ Thân Tay Thụng)',
    dynasty: 'Thời Nguyễn',
    image: '/ao_viet_phuc/áo tấc tay thụng.jpg',
    category: 'Lễ phục trang trọng',
    story: 'Được mệnh danh là lễ phục quốc dân thời Nguyễn. Điểm nhấn là tay áo thụng rộng 30-40cm buông dài duyên dáng qua bàn tay, cổ đứng ngay ngắn. Khi chắp tay vái lễ tạo nên phong thái trang nghiêm, thanh thoát đậm cốt cách Á Đông. (Physical shape: authentic Vietnamese traditional formal robe with very wide loose flowing sleeves, high standing collar, ankle or below-knee length panels).',
    gender: 'Unisex',
    formality: 5,
    colorScheme: ['#9E2A2B', '#E6C687', '#22577A'],
    tags: ['Truyền Thống', 'Trang nghiêm', 'Lễ hội'],
    type: 'traditional'
  },
  {
    id: 'ao_nhat_binh',
    name: 'Áo Nhật Bình',
    dynasty: 'Hoàng tộc triều Nguyễn',
    image: '/ao_viet_phuc/áo nhật bình.jpg',
    category: 'Đại lễ phục cung đình',
    story: 'Nhật Bình là triều phục của Hoàng hậu, Công chúa và mệnh phụ triều Nguyễn. Cổ áo hình chữ nhật viền hoa văn phượng hoàng tinh xảo, dải dệt ngũ hành ở cổ tay rực rỡ tượng trưng cho quyền quý và đoan trang bậc nhất. (Physical shape: authentic royal Vietnamese court robe with prominent rectangular embroidered collar, multi-colored rainbow striped cuffs, flowing imperial silk panels).',
    gender: 'Nữ',
    formality: 5,
    colorScheme: ['#C99700', '#B83232', '#38A3A5'],
    tags: ['Truyền Thống', 'Quý phái', 'Vương giả'],
    type: 'traditional'
  },

  // -------------------------------------------------------------------------
  // 2. NHÓM TRANG PHỤC CÁCH TÂN (3 MẪU)
  // -------------------------------------------------------------------------
  {
    id: 'ao_dai',
    name: 'Áo Dài Cách Tân',
    dynasty: 'Đương đại (Gen Z)',
    image: '/ao_viet_phuc/áo dài cách tân.jpg',
    category: 'Dáng lửng hiện đại',
    story: 'Thiết kế áo dài cách tân tà lửng trẻ trung, ống tay lỡ cách điệu phồng nhẹ, tà áo ngắn ngang bắp chân giúp người mặc tự do dạo phố, chụp ảnh mà vẫn thướt tha duyên dáng. (Physical shape: modern modernized Vietnamese Ao Dai with knee-length or midi tunic panels, contemporary tailored cut, soft puff sleeves).',
    gender: 'Nữ',
    formality: 3,
    colorScheme: ['#FFFFFF', '#D90429', '#F4D35E'],
    tags: ['Cách Tân', 'Dạo phố', 'Năng động'],
    type: 'cach_tan'
  },
  {
    id: 'ao_yem_cach_tan',
    name: 'Áo Yếm Lụa Hiện Đại',
    dynasty: 'Đương đại (Gen Z)',
    image: '/ao_viet_phuc/áo yếm lụa hiện đại.jpg',
    category: 'Remix Quyến Rũ',
    story: 'Lấy cảm hứng từ áo yếm dân gian Kinh Bắc, may bằng lụa satin cao cấp với thiết kế cổ yếm lưng trần tinh tế, kết hợp tuyệt đẹp cùng quần suông cạp cao hoặc khoác ngoài blazer. (Physical shape: modern Vietnamese halterneck silk bodice top inspired by traditional Yem, elegant bare-back tie details, smooth luxurious silk fabric).',
    gender: 'Nữ',
    formality: 3,
    colorScheme: ['#D90429', '#1C1917', '#E07A5F'],
    tags: ['Cách Tân', 'Quyến rũ', 'Cá tính'],
    type: 'cach_tan'
  },
  {
    id: 'ao_doi_kham',
    name: 'Áo Khoác Duster Đối Khâm',
    dynasty: 'Đương đại (Lấy cảm hứng triều Lê)',
    image: '/ao_viet_phuc/áo khoác duster đối khâm.jpg',
    category: 'Layering Dạo Phố',
    story: 'Biến tấu từ phom áo Đối Khâm xẻ dọc song song thành áo khoác mỏng dáng dài duster coat, mặc layer bên ngoài trang phục hiện đại tạo nên phong thái cổ phong lãng mạn. (Physical shape: modern flowing duster coat inspired by traditional Vietnamese Doi Kham robe, parallel open-front straight lapels, lightweight breeze-catching silk/linen fabric).',
    gender: 'Unisex',
    formality: 3,
    colorScheme: ['#4A4E69', '#9A8C98', '#F2E9E4'],
    tags: ['Cách Tân', 'Layering', 'Phóng khoáng'],
    type: 'cach_tan'
  }
];

export const BOTTOMS = [
  {
    id: 'quan_lua_trang',
    name: 'Quần lụa trắng ống suông',
    type: 'traditional',
    description: 'Chất liệu lụa Tơ Tằm mềm mại, dáng suông rộng truyền thống thanh lịch (Physical shape: very loose wide-leg flowing silk trousers, floor-length, straight cut)',
    color: '#FFFFFF',
    image: '/trang_phuc/quan_lua_trang_ong_suong.png'
  },
  {
    id: 'quan_lua_den',
    name: 'Quần lụa đen ống thụng',
    type: 'traditional',
    description: 'Tone trầm cổ điển quý phái, chuẩn phong thái Ngũ Thân xưa',
    color: '#222222'
  },
  {
    id: 'vay_dup_den',
    name: 'Váy đụp lụa đen Kinh Bắc',
    type: 'traditional',
    description: 'Thiết kế đặc trưng khi phối cùng Áo Tứ Thân và yếm đào',
    color: '#1C1917'
  },
  {
    id: 'quan_au_pleat',
    name: 'Quần tây xếp ly dáng rộng (Gen Z)',
    type: 'remix',
    description: 'Sự giao thoa thanh lịch giữa áo ngũ thân và phong cách Smart-Casual',
    color: '#D1C7BD'
  },
  {
    id: 'chan_vay_xoe',
    name: 'Chân váy xếp pli hiện đại',
    type: 'remix',
    description: 'Tạo độ bồng bềnh nữ tính khi kết hợp với áo cách tân ngắn',
    color: '#F4ECE1'
  }
];

export const FOOTWEAR = [
  {
    id: 'hai_theu',
    name: 'Hài thêu hoa sen ngũ sắc',
    icon: 'Footprints',
    desc: 'Nâng niu từng bước chân, đậm chất cung đình.',
    type: 'traditional'
  },
  {
    id: 'guoc_moc',
    name: 'Guốc mộc quai nhung',
    icon: 'ShieldCheck',
    desc: 'Âm thanh lách cách thân quen. (Physical shape: authentic Vietnamese wooden clogs, arched carved wood block sole, open toe, with a soft velvet arch strap across the foot)',
    type: 'traditional',
    image: '/trang_phuc/guoc_moc_quai_nhung.jpg'
  },
  {
    id: 'sneaker_retro',
    name: 'Sneaker trắng Vintage Retro',
    icon: 'Zap',
    desc: 'Bật tung năng lượng, thoải mái dạo phố.',
    type: 'remix'
  },
  {
    id: 'boots_da',
    name: 'Boots da cổ cao',
    icon: 'Zap',
    desc: 'Cá tính mạnh mẽ, phá vỡ mọi khuôn khổ.',
    type: 'remix'
  }
];

export const HEADWEAR = [
  {
    id: 'man_lua',
    name: 'Khăn đóng / Mấn lụa',
    icon: 'Sparkles',
    desc: 'Tạo nét trang nghiêm, cao quý cho khuôn mặt.',
    type: 'traditional'
  },
  {
    id: 'quat_xep',
    name: 'Quạt xếp trầm hương',
    icon: 'Wind',
    desc: 'Phụ kiện cầm tay tao nhã, phong lưu nho nhã.',
    type: 'traditional'
  },
  {
    id: 'chuoi_ngoc',
    name: 'Vòng ngọc trai',
    icon: 'CircleDot',
    desc: 'Điểm xuyết nơi cổ áo, kiêu sa đài các. (Physical shape: elegant pearl necklace, simple round pearls strung together)',
    type: 'traditional',
    image: '/trang_phuc/Vong_ngoc_trai.jpg'
  },
  {
    id: 'kinh_y2k',
    name: 'Kính mát Oval Y2K',
    icon: 'Glasses',
    desc: 'Tạo visual thần thái cá tính, chụp ảnh siêu ngầu.',
    type: 'remix'
  },
  {
    id: 'tui_canvas',
    name: 'Túi Tote Canvas thư pháp',
    icon: 'ShoppingBag',
    desc: 'Tiện lợi, mang tinh thần bảo vệ môi trường.',
    type: 'remix'
  },
  {
    id: 'mu_beret',
    name: 'Mũ Beret nỉ Paris',
    icon: 'Smile',
    desc: 'Nét thơ mộng giao thoa phong cách Indochine.',
    type: 'remix'
  }
];

// Cảnh báo văn hóa từ Trợ lý Nghê Thần
export const CULTURAL_RULES = [
  {
    costumeId: 'ao_nhat_binh',
    prohibitedBottom: 'vay_dup_den',
    title: 'Sai lệch phẩm cấp cung đình!',
    message: 'Áo Nhật Bình là đại lễ phục trang trọng bậc nhất của bậc Hoàng gia triều Nguyễn. Việc phối cùng váy đụp dân dã Kinh Bắc là hoàn toàn lệch thời kỳ và tính chất phẩm phục bạn nha!',
    suggestion: 'Đổi sang quần lụa trắng hoặc quần lụa đen ống suông để giữ vẻ đoan trang quyền quý nhé.'
  },
  {
    costumeId: 'ao_tu_than',
    prohibitedBottom: 'quan_au_pleat',
    title: 'Mất nét mềm mại Kinh Bắc!',
    message: 'Áo Tứ Thân cần tà áo buông lơi bên cạnh váy đụp lụa đen truyền thống để tạo nên vẻ đẹp mộc mạc của cô gái Kinh Bắc.',
    suggestion: 'Chọn váy đụp đen tuyền hoặc quần lụa đen để đúng phong thái dân gian Kinh Bắc nhé!'
  },
  {
    costumeId: 'ao_tac',
    prohibitedGenz: 'sneaker_retro',
    triggerWhenOccasion: 'le_hoi',
    title: 'Lưu ý khi đến chốn tôn nghiêm!',
    message: 'Áo Tấc đi lễ hội truyền thống chốn tôn nghiêm đòi hỏi sự tề chỉnh. Phối sneaker quá năng động có thể chưa thật sự phù hợp với không gian linh thiêng.',
    suggestion: 'Nghê Thần khuyên bạn chọn hài thêu hoặc guốc mộc quai nhung khi đến đền chùa nha!'
  }
];

// Lookbook cộng đồng mẫu
export const INITIAL_LOOKBOOKS = [
  {
    id: 'lb-01',
    title: 'Hạ Phố - Khúc Giao Mùa',
    creator: 'Linh Dan GenZ',
    likes: 342,
    remixes: 48,
    costumeName: 'Áo Ngũ Thân Tay Chẽn',
    costumeImg: '/costumes/ao_ngu_than_tay_chen.jpg',
    occasionName: 'Dạo Phố Nghệ Thuật',
    palette: ['#8C2D19', '#FAF7F2', '#D4AF37'],
    mixFormula: 'Ngũ thân đỏ gạch + Quần âu xếp ly + Kính râm Y2K + Quạt trầm hương',
    harmonyScore: 96,
    storySnippet: 'Vẻ mực thước của ngũ thân hòa cùng sự phá cách của kính Y2K tạo nên cá tính độc bản.'
  },
  {
    id: 'lb-02',
    title: 'Cố Đô Sắc Nắng',
    creator: 'Hoàng Nam',
    likes: 519,
    remixes: 82,
    costumeName: 'Áo Tấc Tay Thụng',
    costumeImg: '/costumes/ao_tac_tay_thung.jpg',
    occasionName: 'Tết Du Xuân Phố Cổ',
    palette: ['#9E2A2B', '#E6C687', '#1F4E46'],
    mixFormula: 'Áo Tấc son + Quần lụa trắng + Mấn lụa + Hài thêu ngũ sắc',
    harmonyScore: 99,
    storySnippet: 'Thanh lịch và chuẩn mực cho ngày đầu xuân viếng cảnh cổ tự.'
  },
  {
    id: 'lb-03',
    title: 'Kinh Bắc Duyên Thầm',
    creator: 'Thanh Mai',
    likes: 278,
    remixes: 31,
    costumeName: 'Áo Tứ Thân Bắc Bộ',
    costumeImg: '/costumes/ao_tu_than.jpg',
    occasionName: 'Lễ Hội & Dân Gian',
    palette: ['#582F0E', '#E07A5F', '#222222'],
    mixFormula: 'Áo tứ thân nâu gụ + Váy đụp lụa đen + Guốc mộc + Quạt nan',
    harmonyScore: 94,
    storySnippet: 'Nét duyên mộc mạc bên câu hát giao duyên quan họ.'
  }
];
