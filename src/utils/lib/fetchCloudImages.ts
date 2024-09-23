// import cloudinary from './cloudinary';

// interface CloudinaryImage {
//   public_id: string;
//   secure_url: string;
//   format: string;
//   width: number;
//   height: number;
// }

// export async function fetchImages(folder?: string): Promise<CloudinaryImage[]> {
//   try {
//     const options: any = {
//       type: 'upload',
//       max_results: 100,
//     };

//     if (folder) {
//       options.prefix = folder;
//     }

//     const { resources } = await cloudinary.api.resources(options);

//     return resources.map((resource: any) => ({
//       public_id: resource.public_id,
//       secure_url: resource.secure_url,
//       format: resource.format,
//       width: resource.width,
//       height: resource.height,
//     }));
//   } catch (error) {
//     console.error('Error fetching images from Cloudinary:', error);
//     return [];
//   }
// }

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.PUBLIC_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

interface ImageResource {
  public_id: string;
  format: string;
  width: number;
  height: number;
  url: string;
}
export async function getImages(folder?: string): Promise<ImageResource[]> {
    try {
      const options: any = {
        resource_type: 'image',
        type: 'upload',
        max_results: 110,
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
        url: cloudinary.url(resource.public_id, {
          transformation: [
            { fetch_format: 'auto' },
            { quality: 'auto' },
          ],
        }),
      }));
    } catch (error) {
      console.error('Error fetching images from Cloudinary:', error);
      throw new Error('Failed to fetch images from Cloudinary');
    }
  }

// export async function getImages(folder?: string): Promise<ImageResource[]> {
//   const options: any = {
//     resource_type: 'image',
//     type: 'upload',
//     max_results: 10,
//   };

//   if (folder) {
//     options.prefix = folder;
//   }

//   const { resources } = await cloudinary.api.resources(options);

//   return resources.map((resource: any) => ({
//     public_id: resource.public_id,
//     format: resource.format,
//     width: resource.width,
//     height: resource.height,
//     url: cloudinary.url(resource.public_id, {
//       transformation: [
//         { fetch_format: 'auto' },
//         { quality: 'auto' },
//       ],
//     }),
//   }));
// }

// interface ImageResource {
//     public_id: string;
//     format: string;
//     width: number;
//     height: number;
//     url: string;
//     folder: string;
//   }
  
//   export async function getImages(folders?: string[]): Promise<ImageResource[]> {
//     const allImages: ImageResource[] = [];
  
//     const fetchImagesFromFolder = async (folder?: string) => {
//       const options: any = {
//         resource_type: 'image',
//         max_results: 20,
//       };
  
//       if (folder) {
//         options.prefix = folder;
//       }
  
//       const { resources } = await cloudinary.api.resources(options);
  
//       return resources.map((resource: any) => ({
//         public_id: resource.public_id,
//         format: resource.format,
//         width: resource.width,
//         height: resource.height,
//         url: cloudinary.url(resource.public_id, {
//           transformation: [
//             { fetch_format: 'auto' },
//             { quality: 'auto' },
//           ],
//         }),
//         folder: folder || 'root',
//       }));
//     };
  
//     if (folders && folders.length > 0) {
//       for (const folder of folders) {
//         const folderImages = await fetchImagesFromFolder(folder);
//         allImages.push(...folderImages);
//       }
//     } else {
//       const rootImages = await fetchImagesFromFolder();
//       allImages.push(...rootImages);
//     }
  
//     return allImages;
//   }