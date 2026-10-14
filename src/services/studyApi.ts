import { Batch, ContentItem, CourseDetail, ResolvedMedia, LiveClass } from '../types';
import { INITIAL_BATCHES, FALLBACK_COURSE_CONTENTS, LIVE_CLASSES_DATA } from '../data/fallbackData';

const BASE_URL_DIRECT = "https://studybeepro.site";
const BASE_URL_PROXY = "/api/studybee";

async function fetchWithFallback<T>(urlDirect: string, urlProxy: string): Promise<T | null> {
  // Try direct first
  try {
    const res = await fetch(urlDirect, {
      headers: { 'Accept': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    // Direct failed, try local Vite proxy
  }

  try {
    const res = await fetch(urlProxy, {
      headers: { 'Accept': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    // Both failed
  }

  return null;
}

export const studyApi = {
  async getBatches(): Promise<Batch[]> {
    try {
      const json = await fetchWithFallback<any>(
        `${BASE_URL_DIRECT}/mj/batches.json?_=${Date.now()}`,
        `${BASE_URL_PROXY}/mj/batches.json?_=${Date.now()}`
      );

      if (json && (json.new || json.old)) {
        const rawBatches = [...(json.new || []), ...(json.old || [])];
        const merged: Batch[] = rawBatches.map((item: any) => {
          const fallback = INITIAL_BATCHES.find(b => String(b.id) === String(item.id));
          const category = item.title.toLowerCase().includes('neet')
            ? 'NEET'
            : item.title.toLowerCase().includes('jee')
            ? 'JEE'
            : fallback?.category || 'General';

          return {
            id: item.id,
            title: item.title,
            category,
            thumbnail: item.thumbnail || fallback?.thumbnail || '',
            description: fallback?.description || `Complete comprehensive batch for ${item.title}. Video lectures, DPPs, tests and downloadable study materials.`,
            mrp: fallback?.mrp || '6000.00',
            offer_price: fallback?.offer_price || 'Free',
            is_free: true,
            total_lectures: fallback?.total_lectures || 150,
            total_notes: fallback?.total_notes || 120,
            tags: fallback?.tags || [category, 'Class 11', 'Free Batch'],
          };
        });

        // Add any extra batches from INITIAL_BATCHES not present in API (like NCERT Library or Prarambh 2.0)
        for (const fb of INITIAL_BATCHES) {
          if (!merged.some(b => String(b.id) === String(fb.id))) {
            merged.push(fb);
          }
        }
        return merged;
      }
    } catch (e) {
      console.warn("Using fallback batches data:", e);
    }

    return INITIAL_BATCHES;
  },

  async getCourseOverview(courseId: string | number): Promise<CourseDetail | null> {
    const fallbackBatch = INITIAL_BATCHES.find(b => String(b.id) === String(courseId));
    
    try {
      const json = await fetchWithFallback<any>(
        `${BASE_URL_DIRECT}/api/nig?overview=${courseId}&_=${Date.now()}`,
        `${BASE_URL_PROXY}/nig?overview=${courseId}&_=${Date.now()}`
      );

      if (json && json.success && json.data) {
        const overviewTab = json.data.find((d: any) => d.type === 'overview');
        const detailsSection = overviewTab?.data?.find((l: any) => l.layout_type === 'details');
        const courseDetails = detailsSection?.layout_data?.[0];
        const packagesSection = overviewTab?.data?.find((l: any) => l.layout_type === 'packages');

        if (courseDetails) {
          return {
            id: courseDetails.id || courseId,
            title: courseDetails.title || fallbackBatch?.title || 'Batch Details',
            description: courseDetails.description || fallbackBatch?.description || '',
            thumbnail: courseDetails.thumbnail || fallbackBatch?.thumbnail || '',
            mrp: courseDetails.mrp || fallbackBatch?.mrp || '6000.00',
            offer_price: courseDetails.offer_price || 'Free',
            start_date: courseDetails.start_date,
            end_date: courseDetails.end_date,
            packages: packagesSection?.layout_data || [],
          };
        }
      }
    } catch (e) {
      console.warn("Failed to fetch overview, using fallback:", e);
    }

    if (fallbackBatch) {
      return {
        id: fallbackBatch.id,
        title: fallbackBatch.title,
        description: fallbackBatch.description || '',
        thumbnail: fallbackBatch.thumbnail,
        mrp: fallbackBatch.mrp || '6000.00',
        offer_price: 'Free',
        packages: [],
      };
    }

    return null;
  },

  async getCourseContent(courseId: string | number, folderId: string | number = "0"): Promise<ContentItem[]> {
    const key = `${courseId}_${folderId}`;
    
    try {
      const json = await fetchWithFallback<any>(
        `${BASE_URL_DIRECT}/api/nig?content=${courseId}&folder=${folderId}&_=${Date.now()}`,
        `${BASE_URL_PROXY}/nig?content=${courseId}&folder=${folderId}&_=${Date.now()}`
      );

      if (json && json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data;
      }
    } catch (e) {
      console.warn(`Error fetching course content ${courseId}/${folderId}:`, e);
    }

    if (FALLBACK_COURSE_CONTENTS[key]) {
      return FALLBACK_COURSE_CONTENTS[key];
    }

    // If root folder has no data in fallback, generate a standard subject structure for the batch
    if (String(folderId) === "0") {
      const batch = INITIAL_BATCHES.find(b => String(b.id) === String(courseId));
      const isNeet = batch?.category === 'NEET' || batch?.title.toLowerCase().includes('neet');
      
      return [
        {
          type: "folder",
          course_id: courseId,
          parent_id: 0,
          entity_id: "demo",
          title: "Demo Lectures & Introduction",
          data: {
            title: "Demo Lectures & Introduction",
            content_counts: { video: { free: 4, paid: 0 }, pdf: { free: 2, paid: 0 } }
          }
        },
        {
          type: "folder",
          course_id: courseId,
          parent_id: 0,
          entity_id: "physics",
          title: "Physics",
          data: {
            title: "Physics",
            content_counts: { video: { paid: 85, free: 0 }, pdf: { paid: 80, free: 0 }, folders: { total: 14, direct: 6 } }
          }
        },
        {
          type: "folder",
          course_id: courseId,
          parent_id: 0,
          entity_id: "chemistry",
          title: "Chemistry",
          data: {
            title: "Chemistry",
            content_counts: { video: { paid: 90, free: 0 }, pdf: { paid: 88, free: 0 }, folders: { total: 16, direct: 5 } }
          }
        },
        isNeet ? {
          type: "folder",
          course_id: courseId,
          parent_id: 0,
          entity_id: "botany",
          title: "Botany",
          data: {
            title: "Botany",
            content_counts: { video: { paid: 60, free: 0 }, pdf: { paid: 58, free: 0 }, folders: { total: 12, direct: 4 } }
          }
        } : {
          type: "folder",
          course_id: courseId,
          parent_id: 0,
          entity_id: "maths",
          title: "Mathematics",
          data: {
            title: "Mathematics",
            content_counts: { video: { paid: 95, free: 0 }, pdf: { paid: 92, free: 0 }, folders: { total: 15, direct: 7 } }
          }
        },
        ...(isNeet ? [{
          type: "folder" as const,
          course_id: courseId,
          parent_id: 0,
          entity_id: "zoology",
          title: "Zoology",
          data: {
            title: "Zoology",
            content_counts: { video: { paid: 55, free: 0 }, pdf: { paid: 55, free: 0 }, folders: { total: 10, direct: 4 } }
          }
        }] : []),
        {
          type: "folder",
          course_id: courseId,
          parent_id: 0,
          entity_id: "dpp",
          title: "Daily Practice Problem (DPP)",
          data: {
            title: "Daily Practice Problem (DPP)",
            content_counts: { video: { paid: 120, free: 0 }, pdf: { paid: 250, free: 0 } }
          }
        },
        {
          type: "folder",
          course_id: courseId,
          parent_id: 0,
          entity_id: "planners",
          title: "Lecture & Test Planners",
          data: {
            title: "Lecture & Test Planners",
            content_counts: { pdf: { paid: 4, free: 0 } }
          }
        }
      ];
    }

    return [];
  },

  async resolveMedia(courseId: string | number, contentId: string | number, rawItem?: ContentItem): Promise<ResolvedMedia | null> {
    // If the item already has a direct valid file_url (like our demo lectures)
    if (rawItem?.data?.file_url && rawItem.data.file_url.startsWith('http')) {
      const isPdf = rawItem.data.file_type === 1 || rawItem.data.file_url.toLowerCase().endsWith('.pdf');
      const isYt = rawItem.data.video_type === 1 || rawItem.data.file_url.includes('youtube.com') || rawItem.data.file_url.includes('youtu.be');
      
      let parsedDownloads: any[] = [];
      if (rawItem.data.download_urls) {
        if (typeof rawItem.data.download_urls === 'string') {
          try { parsedDownloads = JSON.parse(rawItem.data.download_urls); } catch (e) {}
        } else if (Array.isArray(rawItem.data.download_urls)) {
          parsedDownloads = rawItem.data.download_urls;
        }
      }

      return {
        contentId: String(contentId),
        courseId: String(courseId),
        title: rawItem.title,
        file_url: rawItem.data.file_url,
        file_type: isPdf ? 'pdf' : (isYt ? 'youtube' : 'video'),
        thumbnail: rawItem.data.thumbnail || undefined,
        duration: rawItem.data.duration,
        download_urls: parsedDownloads,
        raw: rawItem.data,
      };
    }

    try {
      const json = await fetchWithFallback<any>(
        `${BASE_URL_DIRECT}/api/play?content_id=${contentId}&course_id=${courseId}&_=${Date.now()}`,
        `${BASE_URL_PROXY}/play?content_id=${contentId}&course_id=${courseId}&_=${Date.now()}`
      );

      if (json) {
        const mediaData = json.decryptedData || json.data || {};
        const hasDrmDetails = json.drm_details?.status === true && json.drm_details?.data?.link?.file_url;
        const finalUrl = hasDrmDetails
          ? json.drm_details.data.link.file_url
          : (mediaData.file_url || "");

        if (finalUrl) {
          const lowerUrl = finalUrl.toLowerCase();
          const isPdf = mediaData.file_type === 1 || lowerUrl.endsWith('.pdf');
          const isYt = mediaData.video_type === 1 || lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be');

          let parsedDownloads: any[] = [];
          if (mediaData.download_urls) {
            if (typeof mediaData.download_urls === 'string') {
              try { parsedDownloads = JSON.parse(mediaData.download_urls); } catch (e) {}
            } else if (Array.isArray(mediaData.download_urls)) {
              parsedDownloads = mediaData.download_urls;
            }
          }

          return {
            contentId: String(contentId),
            courseId: String(courseId),
            title: mediaData.title || rawItem?.title || "Educational Content",
            file_url: finalUrl,
            file_type: isPdf ? 'pdf' : (isYt ? 'youtube' : 'video'),
            thumbnail: mediaData.thumbnail || rawItem?.data?.thumbnail || undefined,
            duration: mediaData.duration,
            is_live: mediaData.is_live === 1,
            download_urls: parsedDownloads,
            raw: mediaData,
          };
        }
      }
    } catch (e) {
      console.warn("Failed resolving media:", e);
    }

    // If unresolved but rawItem has title, return safe fallback object
    if (rawItem) {
      return {
        contentId: String(contentId),
        courseId: String(courseId),
        title: rawItem.title,
        file_url: rawItem.data?.file_url || "",
        file_type: rawItem.data?.file_type === 1 ? 'pdf' : 'video',
        thumbnail: rawItem.data?.thumbnail || undefined,
      };
    }

    return null;
  },

  getEnrollments(): string[] {
    try {
      const stored = localStorage.getItem('gbstudy_enrollments');
      if (stored) return JSON.parse(stored).map(String);
    } catch (e) {}
    return [];
  },

  toggleEnrollment(batchId: string | number): { enrolled: boolean; list: string[] } {
    const idStr = String(batchId);
    let list = this.getEnrollments();
    const idx = list.indexOf(idStr);
    let enrolled = false;

    if (idx > -1) {
      list.splice(idx, 1);
      enrolled = false;
    } else {
      list.push(idStr);
      enrolled = true;
    }

    try {
      localStorage.setItem('gbstudy_enrollments', JSON.stringify(list));
    } catch (e) {}

    return { enrolled, list };
  },

  getLiveClasses(): LiveClass[] {
    return LIVE_CLASSES_DATA;
  }
};
