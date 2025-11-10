import { act, renderHook } from '@testing-library/react-native';

import { useAuth } from '@/hooks/auth/useAuth';
import { useCreatePost } from '@/hooks/domain/post/useCreatePost';
import { uploadImage } from '@/services/imageUploadService';
import { createPostWithRestAPI } from '@/services/posts';

// Mock the necessary modules
jest.mock('@/hooks/auth/useAuth');
jest.mock('@/services/posts');
jest.mock('@/services/imageUploadService');

const mockUseAuth = useAuth as jest.Mock;
const mockCreatePostWithRestAPI = createPostWithRestAPI as jest.Mock;
const mockUploadImage = uploadImage as jest.Mock;

describe('useCreatePost', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      loading: false,
      session: { user: { id: 'test-user-id' } },
    });
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCreatePost());

    expect(result.current.content).toBe('');
    expect(result.current.images).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('');
    expect(result.current.showSnackbar).toBe(false);
    expect(result.current.isPostingDisabled()).toBe(true); // No content, no images
  });

  it('should update content', () => {
    const { result } = renderHook(() => useCreatePost());

    act(() => {
      result.current.setContent('New post content');
    });

    expect(result.current.content).toBe('New post content');
    expect(result.current.isPostingDisabled()).toBe(false); // Has content
  });

  it('should update images', () => {
    const { result } = renderHook(() => useCreatePost());
    const mockImage = { fileName: 'test.jpg', type: 'image/jpeg', uri: 'file://test.jpg' };

    act(() => {
      result.current.setImages([mockImage]);
    });

    expect(result.current.images).toEqual([mockImage]);
    expect(result.current.isPostingDisabled()).toBe(false); // Has images
  });

  it('should handle post creation successfully with content only', async () => {
    mockCreatePostWithRestAPI.mockResolvedValueOnce({});
    const { result } = renderHook(() => useCreatePost());

    act(() => {
      result.current.setContent('Test content');
    });

    let success: boolean | undefined;
    await act(async () => {
      success = await result.current.handleCreatePost();
    });

    expect(success).toBe(true);
    expect(mockCreatePostWithRestAPI).toHaveBeenCalledWith({
      content: 'Test content',
      images: [],
      userId: 'test-user-id',
    });
    expect(result.current.content).toBe('');
    expect(result.current.images).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('');
    expect(result.current.showSnackbar).toBe(false);
  });

  it('should handle post creation successfully with images and content', async () => {
    mockCreatePostWithRestAPI.mockResolvedValueOnce({});
    mockUploadImage.mockResolvedValueOnce('http://example.com/image1.jpg');

    const { result } = renderHook(() => useCreatePost());
    const mockImage = { fileName: 'test.jpg', type: 'image/jpeg', uri: 'file://test.jpg' };

    act(() => {
      result.current.setContent('Test content with image');
      result.current.setImages([mockImage]);
    });

    let success: boolean | undefined;
    await act(async () => {
      success = await result.current.handleCreatePost();
    });

    expect(success).toBe(true);
    expect(mockUploadImage).toHaveBeenCalledWith(mockImage);
    expect(mockCreatePostWithRestAPI).toHaveBeenCalledWith({
      content: 'Test content with image',
      images: ['http://example.com/image1.jpg'],
      userId: 'test-user-id',
    });
    expect(result.current.content).toBe('');
    expect(result.current.images).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('');
    expect(result.current.showSnackbar).toBe(false);
  });

  it('should handle post creation failure', async () => {
    const errorMessage = 'Failed to create post';
    mockCreatePostWithRestAPI.mockRejectedValueOnce(new Error(errorMessage));
    const { result } = renderHook(() => useCreatePost());

    act(() => {
      result.current.setContent('Test content');
    });

    let success: boolean | undefined;
    await act(async () => {
      success = await result.current.handleCreatePost();
    });

    expect(success).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.showSnackbar).toBe(true);
  });

  it('should handle image upload failure', async () => {
    const errorMessage = 'Failed to upload image';
    mockUploadImage.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useCreatePost());
    const mockImage = { fileName: 'test.jpg', type: 'image/jpeg', uri: 'file://test.jpg' };

    act(() => {
      result.current.setContent('Test content with image');
      result.current.setImages([mockImage]);
    });

    let success: boolean | undefined;
    await act(async () => {
      success = await result.current.handleCreatePost();
    });

    expect(success).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.showSnackbar).toBe(true);
  });

  it('should dismiss snackbar', async () => {
    const errorMessage = 'Failed to create post';
    mockCreatePostWithRestAPI.mockRejectedValueOnce(new Error(errorMessage));
    const { result } = renderHook(() => useCreatePost());

    act(() => {
      result.current.setContent('Test content');
    });

    await act(async () => {
      await result.current.handleCreatePost();
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.showSnackbar).toBe(true);

    act(() => {
      result.current.onDismissSnackBar();
    });

    expect(result.current.error).toBe('');
    expect(result.current.showSnackbar).toBe(false);
  });

  it('should disable posting when no content and no images', () => {
    const { result } = renderHook(() => useCreatePost());
    expect(result.current.isPostingDisabled()).toBe(true);
  });

  it('should enable posting when content is present', () => {
    const { result } = renderHook(() => useCreatePost());
    act(() => {
      result.current.setContent('Some content');
    });
    expect(result.current.isPostingDisabled()).toBe(false);
  });

  it('should enable posting when images are present', () => {
    const { result } = renderHook(() => useCreatePost());
    const mockImage = { fileName: 'test.jpg', type: 'image/jpeg', uri: 'file://test.jpg' };
    act(() => {
      result.current.setImages([mockImage]);
    });
    expect(result.current.isPostingDisabled()).toBe(false);
  });

  it('should disable posting when not authenticated', () => {
    mockUseAuth.mockReturnValue({
      loading: false,
      session: null,
    });
    const { result } = renderHook(() => useCreatePost());
    act(() => {
      result.current.setContent('Some content');
    });
    expect(result.current.isPostingDisabled()).toBe(true);
  });
});
