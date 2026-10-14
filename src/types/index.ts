export interface Batch {
  id: number | string;
  title: string;
  category?: 'JEE' | 'NEET' | 'Board' | 'NCERT' | string;
  thumbnail: string;
  description?: string;
  mrp?: string;
  offer_price?: string;
  is_free?: boolean;
  total_lectures?: number;
  total_notes?: number;
  tags?: string[];
}

export interface ContentCounts {
  folders?: { total: number; direct: number };
  video?: { paid: number; free: number };
  pdf?: { paid: number; free: number };
  test?: { paid: number; free: number };
}

export interface ContentItemData {
  id?: number | string;
  title?: string;
  thumbnail?: string | null;
  file_type?: number; // 1 = PDF, 2 = Video
  video_type?: number; // 1 = YouTube, 4 = VOD m3u8
  vdc_id?: string | null;
  file_url?: string;
  duration?: number;
  created_at?: number;
  is_live?: number;
  is_locked?: number;
  content_counts?: ContentCounts;
  download_urls?: string | Array<{ title: string; url: string }> | null;
  dynamic_link?: string;
  description?: string | null;
}

export interface ContentItem {
  type: 'folder' | 'file' | 'test';
  course_id: string | number;
  parent_id: string | number;
  entity_id: string;
  title: string;
  data?: ContentItemData;
}

export interface CourseDetail {
  id: number | string;
  title: string;
  description: string;
  thumbnail: string;
  mrp: string;
  offer_price: string;
  start_date?: string;
  end_date?: string;
  packages?: Array<{
    id: number | string;
    title: string;
    thumbnail: string;
    package_type: string;
  }>;
}

export interface FolderHistoryItem {
  id: string;
  title: string;
}

export interface ResolvedMedia {
  contentId: string;
  courseId: string;
  title: string;
  file_url: string;
  file_type: 'video' | 'pdf' | 'youtube';
  thumbnail?: string;
  duration?: number | string;
  is_live?: boolean;
  download_urls?: Array<{ title: string; url: string }>;
  raw?: any;
}

export interface LiveClass {
  id: string;
  course_id: string | number;
  course_title: string;
  title: string;
  subject: 'Physics' | 'Chemistry' | 'Mathematics' | 'Botany' | 'Zoology' | string;
  educator: string;
  status: 'live' | 'upcoming' | 'ended';
  scheduled_time: string;
  viewers_count?: number;
  thumbnail: string;
  stream_url: string;
  video_type?: number;
  chat_enabled?: boolean;
  notes_url?: string;
  description?: string;
}

