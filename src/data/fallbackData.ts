import { Batch, ContentItem, CourseDetail } from '../types';

export const INITIAL_BATCHES: Batch[] = [
  {
    id: 151,
    title: "Drona JEE class 11th",
    category: "JEE",
    thumbnail: "https://dulae92u7241v.cloudfront.net/1772100600/admin_v2/uploads/courses/thumbnail/7574748_131_Class%2011th%20Mission%20Jeet%20JEE%20App%20Banners.jpg",
    description: "Complete Class 11th Physics, Chemistry, and Mathematics for JEE Main & JEE Advanced 2028. Includes live recorded lectures, PDF notes, DPPs, and chapter-wise modules.",
    mrp: "6000.00",
    offer_price: "4999.00",
    is_free: true,
    total_lectures: 350,
    total_notes: 320,
    tags: ["Class 11", "JEE Main", "JEE Advanced", "Physics", "Chemistry", "Maths"]
  },
  {
    id: 152,
    title: "Drona NEET class 11th",
    category: "NEET",
    thumbnail: "https://dulae92u7241v.cloudfront.net/1772100600/admin_v2/uploads/courses/thumbnail/4072473_131_Class%2011th%20Mission%20Jeets%20NEET%20App%20Banners.jpg",
    description: "Complete Class 11th Physics, Chemistry, Botany, and Zoology for NEET 2028. Includes structured live video lectures, NCERT breakdown, DPPs, and tests.",
    mrp: "6000.00",
    offer_price: "4999.00",
    is_free: true,
    total_lectures: 410,
    total_notes: 380,
    tags: ["Class 11", "NEET", "Physics", "Chemistry", "Botany", "Zoology"]
  },
  {
    id: 184,
    title: "Drona 2.0 NEET Class 11th",
    category: "NEET",
    thumbnail: "https://dulae92u7241v.cloudfront.net/1772100600/admin_v2/uploads/courses/thumbnail/241318_131_drona%202.0%20NEET%20banner%20app.png",
    description: "Drona 2.0 Reloaded batch for Class 11th NEET aspirants. Enhanced problem-solving sessions, full syllabus coverage, and intensive test series.",
    mrp: "6000.00",
    offer_price: "4999.00",
    is_free: true,
    total_lectures: 380,
    total_notes: 350,
    tags: ["NEET 2028", "Drona 2.0", "Class 11", "Medical Prep"]
  },
  {
    id: 185,
    title: "Drona 2.0 JEE Class 11th",
    category: "JEE",
    thumbnail: "https://dulae92u7241v.cloudfront.net/1772100600/admin_v2/uploads/courses/thumbnail/2967410_131_drona%202.0%20JEE%20banner%20app.png",
    description: "Drona 2.0 Reloaded batch for JEE 2028. Deep dive into JEE Advanced questions, daily practice sheets, and concept revision classes.",
    mrp: "6000.00",
    offer_price: "4999.00",
    is_free: true,
    total_lectures: 360,
    total_notes: 340,
    tags: ["JEE 2028", "Drona 2.0", "Class 11", "Advanced Prep"]
  },
  {
    id: 107,
    title: "Science (PCMB) 11th - PRARAMBH 2.0 (2026-27)",
    category: "Board",
    thumbnail: "https://dylnd2lqy6eys.cloudfront.net/1770981347/admin_v2/uploads/courses/thumbnail/7450443_125_Science%20Prarambh%202.0%20Batch%20Class%2011th%20App%20Banners.jpg",
    description: "Year-Long interactive course for Class 11 School & Board exams covering Physics, Chemistry, Maths, Biology, Physical Education and English/Hindi.",
    mrp: "3999.00",
    offer_price: "3499.00",
    is_free: true,
    total_lectures: 240,
    total_notes: 220,
    tags: ["Class 11", "CBSE & State Boards", "PCMB", "School Prep"]
  },
  {
    id: 186,
    title: "NCERT Library",
    category: "NCERT",
    thumbnail: "https://dylnd2lqy6eys.cloudfront.net/1770981347/admin_v2/uploads/courses/thumbnail/2310491_125_MJ%20Ncert%20Library09.png",
    description: "Dedicated NCERT library with complete recorded chapter-by-chapter conceptual video breakdowns and line-by-line NCERT highlights.",
    mrp: "6000.00",
    offer_price: "4999.00",
    is_free: true,
    total_lectures: 150,
    total_notes: 140,
    tags: ["NCERT", "Line-by-Line", "Concept Building", "Class 11"]
  }
];

export const FALLBACK_COURSE_CONTENTS: Record<string, ContentItem[]> = {
  // Batch 151 Root Folders (Drona JEE)
  "151_0": [
    {
      type: "folder",
      course_id: "151",
      parent_id: 0,
      entity_id: "6553",
      title: "Demo Lectures",
      data: {
        id: 6553,
        title: "Demo Lectures",
        content_counts: { video: { free: 4, paid: 0 }, folders: { total: 0, direct: 0 } }
      }
    },
    {
      type: "folder",
      course_id: "151",
      parent_id: 0,
      entity_id: "6554",
      title: "Physics",
      data: {
        id: 6554,
        title: "Physics",
        content_counts: { video: { paid: 117, free: 0 }, pdf: { paid: 114, free: 0 }, folders: { total: 20, direct: 9 } }
      }
    },
    {
      type: "folder",
      course_id: "151",
      parent_id: 0,
      entity_id: "6605",
      title: "Chemistry",
      data: {
        id: 6605,
        title: "Chemistry",
        content_counts: { video: { paid: 126, free: 0 }, pdf: { paid: 120, free: 0 }, folders: { total: 16, direct: 3 } }
      }
    },
    {
      type: "folder",
      course_id: "151",
      parent_id: 0,
      entity_id: "6591",
      title: "Mathematics",
      data: {
        id: 6591,
        title: "Mathematics",
        content_counts: { video: { paid: 105, free: 0 }, pdf: { paid: 102, free: 0 }, folders: { total: 17, direct: 7 } }
      }
    },
    {
      type: "folder",
      course_id: "151",
      parent_id: 0,
      entity_id: "6573",
      title: "Daily Practice Problem (DPP)",
      data: {
        id: 6573,
        title: "Daily Practice Problem (DPP)",
        content_counts: { video: { paid: 183, free: 0 }, pdf: { paid: 358, free: 0 }, folders: { total: 165, direct: 3 } }
      }
    },
    {
      type: "folder",
      course_id: "151",
      parent_id: 0,
      entity_id: "6559",
      title: "Modules & Study Material",
      data: {
        id: 6559,
        title: "Modules & Study Material",
        content_counts: { video: { paid: 2, free: 0 }, pdf: { paid: 17, free: 0 }, folders: { total: 6, direct: 3 } }
      }
    },
    {
      type: "folder",
      course_id: "151",
      parent_id: 0,
      entity_id: "7032",
      title: "Formula Sheets",
      data: {
        id: 7032,
        title: "Formula Sheets",
        content_counts: { pdf: { paid: 15, free: 0 }, folders: { total: 4, direct: 3 } }
      }
    },
    {
      type: "folder",
      course_id: "151",
      parent_id: 0,
      entity_id: "6556",
      title: "Planners & Schedule",
      data: {
        id: 6556,
        title: "Planners & Schedule",
        content_counts: { pdf: { paid: 4, free: 0 }, folders: { total: 2, direct: 2 } }
      }
    },
    {
      type: "folder",
      course_id: "151",
      parent_id: 0,
      entity_id: "12323",
      title: "Practice Sheets",
      data: {
        id: 12323,
        title: "Practice Sheets",
        content_counts: { pdf: { paid: 12, free: 0 }, folders: { total: 3, direct: 3 } }
      }
    },
    {
      type: "folder",
      course_id: "151",
      parent_id: 0,
      entity_id: "8286",
      title: "Tests & Assessments",
      data: {
        id: 8286,
        title: "Tests & Assessments",
        content_counts: { test: { paid: 18, free: 0 }, pdf: { paid: 98, free: 0 } }
      }
    }
  ],

  // Batch 151 Folder 6553 (Demo Lectures)
  "151_6553": [
    {
      type: "file",
      course_id: "151",
      parent_id: 6553,
      entity_id: "14881",
      title: "Maths Demo Lecture - Sets & Relations Basics",
      data: {
        id: 14881,
        duration: 2766,
        file_type: 2,
        video_type: 4,
        file_url: "https://dylnd2lqy6eys.cloudfront.net/file_library/videos/vod_non_drm_ios/4703545/1772872165_3528962953227533/sunny/1772871809222_237680453851290700_video_VOD.m3u8",
        thumbnail: "https://dulae92u7241v.cloudfront.net/1772100600/admin_v2/metaGallery//6097828_1_3754297_131_5.jpg",
        created_at: 1775461010,
        download_urls: [
          { title: "720p HD", url: "https://d3cx6qbbd4cbso.cloudfront.net/file_library/videos/download/4703545/1772873647_7764017357889463/1772871809222_237680453851290700_video_VOD720p30" },
          { title: "480p SD", url: "https://d3cx6qbbd4cbso.cloudfront.net/file_library/videos/download/4703545/1772873647_7764017357889463/1772871809222_237680453851290700_video_VOD480p30" },
          { title: "360p Mobile", url: "https://d3cx6qbbd4cbso.cloudfront.net/file_library/videos/download/4703545/1772873647_7764017357889463/1772871809222_237680453851290700_video_VOD360p30" }
        ]
      }
    },
    {
      type: "file",
      course_id: "151",
      parent_id: 6553,
      entity_id: "14884",
      title: "Physics Demo Lecture - Units & Measurements",
      data: {
        id: 14884,
        duration: 2259,
        file_type: 2,
        video_type: 4,
        file_url: "https://dylnd2lqy6eys.cloudfront.net/file_library/videos/vod_non_drm_ios/4703730/1772886723_3758806102092099/sunny/1772886371029_796409436889895400_video_VOD.m3u8",
        thumbnail: "https://dulae92u7241v.cloudfront.net/1772100600/admin_v2/metaGallery//94737_1_4786131_131_6.jpg",
        created_at: 1775461010,
        download_urls: [
          { title: "720p HD", url: "https://d3cx6qbbd4cbso.cloudfront.net/file_library/videos/download/4703730/1772887841_4249564932479034/1772886371029_796409436889895400_video_VOD720p30" },
          { title: "480p SD", url: "https://d3cx6qbbd4cbso.cloudfront.net/file_library/videos/download/4703730/1772887841_4249564932479034/1772886371029_796409436889895400_video_VOD480p30" }
        ]
      }
    },
    {
      type: "file",
      course_id: "151",
      parent_id: 6553,
      entity_id: "14882",
      title: "Physical & Inorganic Demo Lecture - Mole Concept",
      data: {
        id: 14882,
        duration: 3567,
        file_type: 2,
        video_type: 4,
        file_url: "https://dylnd2lqy6eys.cloudfront.net/file_library/videos/vod_non_drm_ios/4703296/1772823737_4763229166980941/sunny/1772823502273_124306805252527970_video_VOD.m3u8",
        thumbnail: "https://dulae92u7241v.cloudfront.net/1772100600/admin_v2/metaGallery//3915418_1_3229862_131_1.jpg",
        created_at: 1775461010
      }
    },
    {
      type: "file",
      course_id: "151",
      parent_id: 6553,
      entity_id: "14883",
      title: "Organic Chemistry Demo Lecture - Nomenclature",
      data: {
        id: 14883,
        duration: 3266,
        file_type: 2,
        video_type: 4,
        file_url: "https://dylnd2lqy6eys.cloudfront.net/file_library/videos/vod_non_drm_ios/4703295/1772823736_2891043918587075/sunny/1772823292466_57074096763046980_video_VOD.m3u8",
        thumbnail: "https://dulae92u7241v.cloudfront.net/1772100600/admin_v2/metaGallery//5900019_1_5418885_131_3.jpg",
        created_at: 1775461010
      }
    }
  ],

  // Batch 151 Planners
  "151_6556": [
    {
      type: "folder",
      course_id: "151",
      parent_id: 6556,
      entity_id: "6557",
      title: "Lecture Planner",
      data: {
        id: 6557,
        title: "Lecture Planner",
        content_counts: { pdf: { paid: 1, free: 0 } }
      }
    },
    {
      type: "folder",
      course_id: "151",
      parent_id: 6556,
      entity_id: "6558",
      title: "Test Planner",
      data: {
        id: 6558,
        title: "Test Planner",
        content_counts: { pdf: { paid: 2, free: 0 } }
      }
    }
  ],

  // Batch 151 Lecture Planner file
  "151_6557": [
    {
      type: "file",
      course_id: "151",
      parent_id: 6557,
      entity_id: "16359",
      title: "Drona JEE 2027 - Complete Lecture Planner (PDF)",
      data: {
        id: 16359,
        file_type: 1,
        video_type: 0,
        file_url: "https://dulae92u7241v.cloudfront.net/1772100600/admin_v2/content/pdf//2332332_155_Drona%20JEE%202027%20-%20Lecture%20Planner-2.pdf",
        created_at: 1777275287
      }
    }
  ],

  // Batch 152 Root Folders (Drona NEET)
  "152_0": [
    {
      type: "folder",
      course_id: "152",
      parent_id: 0,
      entity_id: "6540",
      title: "Demo Lectures",
      data: {
        id: 6540,
        title: "Demo Lectures",
        content_counts: { video: { free: 5, paid: 0 } }
      }
    },
    {
      type: "folder",
      course_id: "152",
      parent_id: 0,
      entity_id: "6564",
      title: "Botany",
      data: {
        id: 6564,
        title: "Botany",
        content_counts: { video: { paid: 70, free: 0 }, pdf: { paid: 67, free: 0 }, folders: { total: 17, direct: 7 } }
      }
    },
    {
      type: "folder",
      course_id: "152",
      parent_id: 0,
      entity_id: "6577",
      title: "Zoology",
      data: {
        id: 6577,
        title: "Zoology",
        content_counts: { video: { paid: 65, free: 0 }, pdf: { paid: 65, free: 0 }, folders: { total: 18, direct: 6 } }
      }
    },
    {
      type: "folder",
      course_id: "152",
      parent_id: 0,
      entity_id: "6593",
      title: "Physics",
      data: {
        id: 6593,
        title: "Physics",
        content_counts: { video: { paid: 118, free: 0 }, pdf: { paid: 119, free: 0 }, folders: { total: 26, direct: 11 } }
      }
    },
    {
      type: "folder",
      course_id: "152",
      parent_id: 0,
      entity_id: "6594",
      title: "Chemistry",
      data: {
        id: 6594,
        title: "Chemistry",
        content_counts: { video: { paid: 101, free: 0 }, pdf: { paid: 97, free: 0 }, folders: { total: 14, direct: 3 } }
      }
    },
    {
      type: "folder",
      course_id: "152",
      parent_id: 0,
      entity_id: "6572",
      title: "Daily Practice Problem (DPP)",
      data: {
        id: 6572,
        title: "Daily Practice Problem (DPP)",
        content_counts: { video: { paid: 231, free: 0 }, pdf: { paid: 463, free: 0 }, folders: { total: 221, direct: 4 } }
      }
    },
    {
      type: "folder",
      course_id: "152",
      parent_id: 0,
      entity_id: "6565",
      title: "Modules & Study Material",
      data: {
        id: 6565,
        title: "Modules & Study Material",
        content_counts: { pdf: { paid: 26, free: 0 }, video: { paid: 2, free: 0 } }
      }
    },
    {
      type: "folder",
      course_id: "152",
      parent_id: 0,
      entity_id: "12598",
      title: "Formula Sheet",
      data: {
        id: 12598,
        title: "Formula Sheet",
        content_counts: { pdf: { paid: 3, free: 0 } }
      }
    },
    {
      type: "folder",
      course_id: "152",
      parent_id: 0,
      entity_id: "6563",
      title: "Planners",
      data: {
        id: 6563,
        title: "Planners",
        content_counts: { pdf: { paid: 4, free: 0 } }
      }
    },
    {
      type: "folder",
      course_id: "152",
      parent_id: 0,
      entity_id: "8284",
      title: "Test Series",
      data: {
        id: 8284,
        title: "Test Series",
        content_counts: { test: { paid: 14, free: 0 }, pdf: { paid: 87, free: 0 } }
      }
    }
  ]
};

export const TELEGRAM_CHANNEL_URL = "https://t.me/GBFreestudy";
export const TELEGRAM_POPUP_TITLE = "Join GB STUDY Telegram Channel";
export const TELEGRAM_POPUP_DESC = "Get daily free lecture notes, question banks, study planners, video links & exam announcements directly in Telegram.";

export const GB_STUDY_LOGO = "/logo.png";

export const LIVE_CLASSES_DATA: import('../types').LiveClass[] = [
  {
    id: "live-101",
    course_id: 151,
    course_title: "Drona JEE Class 11th",
    title: "Mathematics Live: Sets, Relations & Function Transformations",
    subject: "Mathematics",
    educator: "GB Sir & Senior Faculty",
    status: "live",
    scheduled_time: "Live Now (Started 25m ago)",
    viewers_count: 1420,
    thumbnail: "https://dulae92u7241v.cloudfront.net/1772100600/admin_v2/metaGallery//6097828_1_3754297_131_5.jpg",
    stream_url: "https://dylnd2lqy6eys.cloudfront.net/file_library/videos/vod_non_drm_ios/4703545/1772872165_3528962953227533/sunny/1772871809222_237680453851290700_video_VOD.m3u8",
    video_type: 4,
    chat_enabled: true,
    notes_url: "https://dulae92u7241v.cloudfront.net/1772100600/admin_v2/content/pdf//2332332_155_Drona%20JEE%202027%20-%20Lecture%20Planner-2.pdf",
    description: "Live interactive concept clarity session with DPP problem solving for Class 11 JEE 2028 aspirants."
  },
  {
    id: "live-102",
    course_id: 152,
    course_title: "Drona NEET Class 11th",
    title: "Biology (Botany) Live: Cell The Unit of Life & Organelles Q&A",
    subject: "Botany",
    educator: "Top Medical Faculty",
    status: "live",
    scheduled_time: "Live Now (Started 10m ago)",
    viewers_count: 1180,
    thumbnail: "https://dulae92u7241v.cloudfront.net/1772100600/admin_v2/uploads/courses/thumbnail/4072473_131_Class%2011th%20Mission%20Jeets%20NEET%20App%20Banners.jpg",
    stream_url: "https://dylnd2lqy6eys.cloudfront.net/file_library/videos/vod_non_drm_ios/4703730/1772886723_3758806102092099/sunny/1772886371029_796409436889895400_video_VOD.m3u8",
    video_type: 4,
    chat_enabled: true,
    description: "Live NCERT line-by-line breakdown and past 10 years NEET questions analysis."
  },
  {
    id: "live-103",
    course_id: 151,
    course_title: "Drona JEE Class 11th",
    title: "Physical Chemistry Live: Mole Concept & Limiting Reagent Practice",
    subject: "Chemistry",
    educator: "Chemistry Specialist Faculty",
    status: "live",
    scheduled_time: "Live Now (Started 40m ago)",
    viewers_count: 940,
    thumbnail: "https://dulae92u7241v.cloudfront.net/1772100600/admin_v2/metaGallery//3915418_1_3229862_131_1.jpg",
    stream_url: "https://dylnd2lqy6eys.cloudfront.net/file_library/videos/vod_non_drm_ios/4703296/1772823737_4763229166980941/sunny/1772823502273_124306805252527970_video_VOD.m3u8",
    video_type: 4,
    chat_enabled: true,
    description: "Specialized numerical problem solving session for JEE Main and JEE Advanced level."
  },
  {
    id: "live-201",
    course_id: 151,
    course_title: "Drona JEE Class 11th",
    title: "Physics Live: Newton's Laws of Motion - Friction & Pulley Systems",
    subject: "Physics",
    educator: "GB Sir",
    status: "upcoming",
    scheduled_time: "Today at 06:00 PM",
    viewers_count: 0,
    thumbnail: "https://dulae92u7241v.cloudfront.net/1772100600/admin_v2/metaGallery//94737_1_4786131_131_6.jpg",
    stream_url: "https://dylnd2lqy6eys.cloudfront.net/file_library/videos/vod_non_drm_ios/4703730/1772886723_3758806102092099/sunny/1772886371029_796409436889895400_video_VOD.m3u8",
    video_type: 4,
    chat_enabled: true,
    description: "Complete conceptual theory, free body diagrams, and advanced tricky problems."
  },
  {
    id: "live-202",
    course_id: 152,
    course_title: "Drona NEET Class 11th",
    title: "Zoology Live: Animal Kingdom Classification & High-Yield Mnemonics",
    subject: "Zoology",
    educator: "Medical Expert Faculty",
    status: "upcoming",
    scheduled_time: "Today at 07:30 PM",
    viewers_count: 0,
    thumbnail: "https://dulae92u7241v.cloudfront.net/1772100600/admin_v2/uploads/courses/thumbnail/241318_131_drona%202.0%20NEET%20banner%20app.png",
    stream_url: "https://dylnd2lqy6eys.cloudfront.net/file_library/videos/vod_non_drm_ios/4703545/1772872165_3528962953227533/sunny/1772871809222_237680453851290700_video_VOD.m3u8",
    video_type: 4,
    chat_enabled: true,
    description: "Interactive live session with memory shortcuts and diagram-based questions."
  },
  {
    id: "live-203",
    course_id: 185,
    course_title: "Drona 2.0 JEE Class 11th",
    title: "Organic Chemistry Live: General Organic Chemistry (GOC) & Electronic Effects",
    subject: "Chemistry",
    educator: "Chemistry Faculty",
    status: "upcoming",
    scheduled_time: "Tomorrow at 10:00 AM",
    viewers_count: 0,
    thumbnail: "https://dulae92u7241v.cloudfront.net/1772100600/admin_v2/metaGallery//5900019_1_5418885_131_3.jpg",
    stream_url: "https://dylnd2lqy6eys.cloudfront.net/file_library/videos/vod_non_drm_ios/4703295/1772823736_2891043918587075/sunny/1772823292466_57074096763046980_video_VOD.m3u8",
    video_type: 4,
    chat_enabled: true,
    description: "Inductive effect, resonance, hyperconjugation and stability of carbocations."
  }
];

