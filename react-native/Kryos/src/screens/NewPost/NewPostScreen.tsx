import type { MainScreenProps } from '@/navigation/types';

import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/hooks/auth/useAuth';
import { createPostWithRestAPI } from '@/services/posts';

import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import Text from '@/components/atoms/Text';

function NewPostScreen({ navigation }: MainScreenProps<'NewPost'>) {
  const { loading: authLoading, session } = useAuth();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Wait for auth to finish loading before allowing post creation
  const canPost = session?.user?.id && !authLoading;

  const handleCreatePost = async () => {
    if (!content.trim()) {
      setError('Post content cannot be empty');
      return;
    }

    if (!canPost) {
      setError('User not authenticated');
      return;
    }

    // Get the current user's ID from the session
    const currentUserId = session.user.id;

    setIsLoading(true);
    setError('');

    try {
      await createPostWithRestAPI({
        content: content.trim(),
        userId: currentUserId,
      });

      setContent('');
      // Navigate back to home or feed after successful creation
      navigation.goBack();
    } catch (error_: unknown) {
      console.error('Error creating post:', error_);
      const errorMessage = 
        error_ instanceof Error 
          ? error_.message 
          : typeof error_ === 'string' 
            ? error_ 
            : 'Failed to create post';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} padding="m">
        <Text marginBottom="m" variant="header">
          Create New Post
        </Text>

        <Input
          multiline
          numberOfLines={6}
          onChangeText={setContent}
          placeholder="What's happening?"
          textAlignVertical="top"
          value={content}
        />

        {error ? (
          <Text color="statusError" marginTop="s" variant="caption">
            {error}
          </Text>
        ) : null}

        <Box flexDirection="column" justifyContent="flex-end" marginTop="m">
          <Button
            containerProps={{ marginLeft: 's' }}
            disabled={isLoading || !content.trim() || !canPost}
            loading={isLoading}
            onPress={() => {
              void handleCreatePost();
            }}
            title="Post"
          />
          <Button
            disabled={isLoading}
            onPress={() => navigation.goBack()}
            title="Cancel"
            variant="text"
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
}

export default NewPostScreen;
