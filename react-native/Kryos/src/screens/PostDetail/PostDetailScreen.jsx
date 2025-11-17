import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useAuthWithProfile } from '@/hooks/auth/useAuthWithProfile';
import { PostServices } from '@/hooks/domain/posts/postService';

import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button/Button';
import Text from '@/components/atoms/Text';
import PostItem from '@/components/molecules/PostItem';

const PostDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const theme = useTheme();
  const { post } = route.params || {};
  const { profile } = useAuthWithProfile();
  const queryClient = useQueryClient();

  const [replyContent, setReplyContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Fetch comments/replies for the post
  const {
    data: comments = [],
    error: commentsError,
    isError: isCommentsError,
    isLoading: isCommentsLoading,
    refetch,
  } = useQuery({
    enabled: !!post?.id,
    queryFn: () => PostServices.fetchById(post.id),
    queryKey: ['comments', post.id],
  });

  // Mutation for adding a reply
  const addReplyMutation = useMutation({
    mutationFn: (replyData) => PostServices.addComment(replyData),
    onError: (error) => {
      console.error('Error adding reply:', error);
    },
    onSuccess: () => {
      // Invalidate and refetch comments and the main posts query
      queryClient.invalidateQueries({ queryKey: ['comments', post.id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] }); // Invalidate all posts to update the count on the FeedsScreen
      setReplyContent(''); // Clear the reply input
    },
  });

  // Handle sending the reply
  const handleSendReply = () => {
    if (!replyContent.trim() || !profile?.id) return;

    addReplyMutation.mutate({
      content: replyContent,
      parent_id: post.id,
      user_id: profile.id,
    });
  };

  const renderReplies = () => {
    if (isCommentsLoading) {
      return (
        <Box flex={1} justifyContent="center" alignItems="center" padding="xl">
          <ActivityIndicator />
          <Text marginTop="s">Loading replies...</Text>
        </Box>
      );
    }

    if (isCommentsError) {
      return (
        <Box flex={1} justifyContent="center" alignItems="center" padding="xl">
          <Text marginBottom="m" variant="body">Error loading replies: {commentsError?.message}</Text>
          <Button title="Retry" onPress={() => refetch()} />
        </Box>
      );
    }

    return (
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          <PostItem post={item}
            isReply
            commentsCount={item.replies?.[0]?.count || 0}
          />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Box padding="xl" alignItems="center">
            <Text>No replies yet. Be the first to reply!</Text>
          </Box>
        }
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <Box
          flexDirection="row"
          alignItems="center"
          paddingHorizontal="m"
          paddingVertical="s"
          borderBottomColor="borderDefault"
          borderBottomWidth={1}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text
            variant="header"
            fontSize={20}
            fontWeight="bold"
            marginLeft="m"
          >
            Post
          </Text>
        </Box>

        <Box flex={1}>
          {/* Main post at the top */}
          {post && <PostItem post={post} commentsCount={comments.length} />}

          {renderReplies()}
        </Box>

        {/* Reply input at the bottom */}
        <Box
          alignItems="center"
          backgroundColor="bgCard"
          borderTopColor="borderDefault"
          borderTopWidth={1}
          flexDirection="row"
          padding="m"
        >
          <TextInput
            multiline
            numberOfLines={3}
            onBlur={() => setIsFocused(false)}
            onChangeText={setReplyContent}
            onFocus={() => setIsFocused(true)}
            placeholder="Write a reply..."
            style={{
              borderColor: isFocused ? theme.colors.primary : theme.colors.transparent,
              borderRadius: 20,
              borderWidth: 1,
              flex: 1,
              maxHeight: 100,
              paddingHorizontal: 15,
              paddingVertical: 10,
              color: theme.colors.text,
            }}
            value={replyContent}
          />
          <TouchableOpacity
            disabled={!replyContent.trim() || addReplyMutation.isPending}
            onPress={handleSendReply}
            style={{
              backgroundColor: replyContent.trim() ? theme.colors.primary : theme.colors.gray4,
              borderRadius: 20,
              marginLeft: 10,
              padding: 10,
            }}
          >
            <MaterialIcons
              color={replyContent.trim() ? theme.colors.white : theme.colors.gray6}
              name="send"
              size={20}
            />
          </TouchableOpacity>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PostDetailScreen;