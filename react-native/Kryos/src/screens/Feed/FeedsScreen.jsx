import { useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthWithProfile } from '@/hooks/auth/useAuthWithProfile';
import { PostServices } from '@/hooks/domain/posts/postService';

import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button/Button';
import Image from '@/components/atoms/Image';
import Text from '@/components/atoms/Text';

import { getInitials } from '@/utils/textUtilities';

// Simplified renderPost function showing only essential information
const renderPost = ({ item }) => {
  // Extract profile data from the nested structure
  const userProfile = item.profiles ?? {};
  
  // Get initials for placeholder
  const initials = getInitials(userProfile.full_name ?? userProfile.username);

  return (
    <Box
      borderBottomColor="borderDefault"
      borderBottomWidth={1}
      key={item.id}
      padding="m"
    >
      <Box alignItems="flex-start" flexDirection="row" marginBottom="m">
        {/* Avatar with initials as fallback */}
        <Box
          alignItems="center"
          backgroundColor="gray3"
          borderRadius="round"
          height={40}
          justifyContent="center"
          marginRight="s"
          width={40}
        >
          {userProfile.avatar_url ? (
            <Image
              borderRadius="round"
              height={40}
              source={{ uri: userProfile.avatar_url }}
              width={40}
            />
          ) : (
            <Text fontSize={16} fontWeight="bold" textAlign="center">
              {initials ?? '?'}
            </Text>
          )}
        </Box>
        <Box flex={1}>
          <Text variant="header">
            {userProfile.full_name ?? userProfile.username ?? 'Unknown User'}
          </Text>
          <Text color="textSecondary" variant="caption">
            @{userProfile.username ?? 'username'}
          </Text>
        </Box>
      </Box>
      <Text marginBottom="s" variant="body">
        {item.content}
      </Text>
      <Text color="textSecondary" variant="caption">
        {new Date(item.created_at).toLocaleDateString()}
      </Text>
    </Box>
  );
};

function FeedsScreen() {
  const queryClient = useQueryClient();
  const { profile } = useAuthWithProfile();
  
  // Using React Query to fetch posts
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
    refetch,
    isRefetching
  } = useQuery({
    queryKey: ['posts'],
    queryFn: PostServices.fetchAll,
    // Refetch every 5 minutes
    refetchInterval: 5 * 60 * 1000,
  });

  // Function to handle pull-to-refresh
  const onRefresh = () => {
    refetch();
  };

  // Render loading state
  if (isLoading && posts.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text>Loading posts...</Text>
        </Box>
      </SafeAreaView>
    );
  }

  // Render error state
  if (isError && posts.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text>Error loading posts: {error.message}</Text>
          <Button title="Retry" onPress={refetch} />
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => renderPost({ item })}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
          }
        />
      </Box>
    </SafeAreaView>
  );
}

export default FeedsScreen;