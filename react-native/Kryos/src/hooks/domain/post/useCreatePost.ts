import type * as ImagePicker from 'react-native-image-picker';

import { useState } from 'react';

import { useAuth } from '@/hooks/auth/useAuth';
import { uploadImage } from '@/services/imageUploadService';
import { createPostWithRestAPI } from '@/services/posts';

export const useCreatePost = () => {
  const { loading: authLoading, session } = useAuth();
  const [content, setContent] = useState('');
  const [images, setImages] = useState<ImagePicker.Asset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const canPost = session?.user?.id && !authLoading;

  const handleCreatePost = async () => {
    if (!content.trim()) {
      setError('Post content cannot be empty');
      setShowSnackbar(true);
      return;
    }

    if (!canPost) {
      setError('User not authenticated');
      setShowSnackbar(true);
      return;
    }

    const currentUserId = session.user.id;

    setIsLoading(true);
    setError('');
    setShowSnackbar(false);

    try {
      const imageUrls = await Promise.all(images.map((image) => uploadImage(image)));

      await createPostWithRestAPI({
        content: content.trim(),
        images: imageUrls,
        userId: currentUserId,
      });

      setContent('');
      setImages([]);
      return true;
    } catch (error_: unknown) {
      console.error('Error creating post:', error_);
      const errorMessage =
        error_ instanceof Error
          ? error_.message
          : typeof error_ === 'string'
            ? error_
            : 'Failed to create post';
      setError(errorMessage);
      setShowSnackbar(true);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const onDismissSnackBar = () => {
    setError('');
    setShowSnackbar(false);
  };

  const isPostingDisabled = (): boolean => {
    return isLoading || (!content.trim() && images.length === 0) || !canPost;
  };

  return {
    content,
    error,
    handleCreatePost,
    images,
    isLoading,
    isPostingDisabled,
    onDismissSnackBar,
    setContent,
    setImages,
    setShowSnackbar,
    showSnackbar,
  };
};
