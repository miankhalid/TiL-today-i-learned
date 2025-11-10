import { DEFAULT_IMAGE_CONTENT_TYPE, SUPABASE_MEDIA_BUCKET } from '@/constants/supabase';

import { supabase } from './supabase';

export const uploadImage = async (image: ImagePicker.Asset): Promise<string> => {
  if (!image.uri) {
    throw new Error('Image URI is missing');
  }
  const arraybuffer = await fetch(image.uri).then((response) => response.arrayBuffer());

  const fileExtension = image.uri?.split('.').pop()?.toLowerCase() ?? DEFAULT_IMAGE_CONTENT_TYPE.split('/')[1];
  const path = `${Date.now()}.${fileExtension}`;

  const { data, error: uploadError } = await supabase.storage
    .from(SUPABASE_MEDIA_BUCKET)
    .upload(path, arraybuffer, {
      contentType: image.type ?? DEFAULT_IMAGE_CONTENT_TYPE,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data: publicUrlData } = supabase.storage.from(SUPABASE_MEDIA_BUCKET).getPublicUrl(data.path);

  return publicUrlData.publicUrl;
};
