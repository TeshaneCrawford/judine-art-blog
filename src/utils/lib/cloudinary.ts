import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.PUBLIC_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

// Types
export interface ImageResource {
  public_id: string;
  format: string;
  width: number;
  height: number;
  url: string;
  created_at: string;
  folder: string;
}

export interface FolderResource {
  name: string;
  path: string;
  created_at: string;
}

interface CloudinaryResponse {
  resources: any[];
  rate_limit_allowed: number;
  rate_limit_remaining: number;
  rate_limit_reset_at: string;
}

// Get all folders in the root or within a specific folder
export async function getFolders(parentFolder: string = ''): Promise<FolderResource[]> {
  try {
    const options = {
      type: 'upload',
      max_results: 500,
      prefix: parentFolder,
    };

    const result = await cloudinary.api.root_folders();
    const folders = result.folders || [];

    // To get subfolders in a specific folder
    if (parentFolder) {
      const subfolders = await cloudinary.api.sub_folders(parentFolder);
      return subfolders.folders.map((folder: any) => ({
        name: folder.name,
        path: folder.path,
        created_at: folder.created_at,
      }));
    }

    return folders.map((folder: any) => ({
      name: folder.name,
      path: folder.path,
      created_at: folder.created_at,
    }));
  } catch (error) {
    console.error('Error fetching folders from Cloudinary:', error);
    throw new Error('Failed to fetch folders from Cloudinary');
  }
}

// Get images from a specific folder or root
export async function getImages(folder?: string): Promise<ImageResource[]> {
  try {
    const options: any = {
      resource_type: 'image',
      type: 'upload',
      max_results: 59,
      sort_by: 'created_at',
      direction: 'asc',
    };

    if (folder) {
      options.prefix = folder;
    }

    const { resources } = await cloudinary.api.resources(options);

    return resources.map((resource: any) => ({
      public_id: resource.public_id,
      format: resource.format,
      width: resource.width,
      height: resource.height,
      created_at: resource.created_at,
      folder: resource.folder || '',
      url: cloudinary.url(resource.public_id, {
        secure: true,
        transformation: [
          { fetch_format: 'auto' },
          { quality: 'auto' },
          { width: 'auto', dpr: 'auto' },
          { crop: 'scale' },
        ],
      }),
    }));
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    throw new Error('Failed to fetch images from Cloudinary');
  }
}

// Get a specific folder's contents (both subfolders and images)
export async function getFolderContents(folderPath: string = '') {
  try {
    const [folders, images] = await Promise.all([
      getFolders(folderPath),
      getImages(folderPath),
    ]);

    return {
      folders,
      images,
    };
  } catch (error) {
    console.error('Error fetching folder contents:', error);
    throw new Error('Failed to fetch folder contents');
  }
}

// Search for images in a specific folder
export async function searchImages(query: string, folder?: string): Promise<ImageResource[]> {
  try {
    const options: any = {
      resource_type: 'image',
      type: 'upload',
      max_results: 59,
      expression: `filename:*${query}*`,
      sort_by: 'created_at',
      direction: 'asc',
    };

    if (folder) {
      options.prefix = folder;
    }

    const { resources } = await cloudinary.api.resources_by_tag(query, options);

    return resources.map((resource: any) => ({
      public_id: resource.public_id,
      format: resource.format,
      width: resource.width,
      height: resource.height,
      created_at: resource.created_at,
      folder: resource.folder || '',
      url: cloudinary.url(resource.public_id, {
        transformation: [
          { fetch_format: 'auto' },
          { quality: 'auto' },
          { width: 'auto', dpr: 'auto' },
          { crop: 'scale' },
        ],
      }),
    }));
  } catch (error) {
    console.error('Error searching images:', error);
    throw new Error('Failed to search images');
  }
}

// Get folder statistics
export async function getFolderStats(folderPath: string) {
  try {
    const { resources } = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderPath,
      max_results: 500,
    });

    return {
      totalImages: resources.length,
      totalSize: resources.reduce((acc: number, resource: any) => acc + resource.bytes, 0),
      lastUpdated: resources.length > 0 ? resources[resources.length - 1].created_at : null,
    };
  } catch (error) {
    console.error('Error fetching folder statistics:', error);
    throw new Error('Failed to fetch folder statistics');
  }
}