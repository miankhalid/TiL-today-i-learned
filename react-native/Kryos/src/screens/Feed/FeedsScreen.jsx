import { useQuery } from '@tanstack/react-query';
import { FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PostServices } from '@/hooks/domain/posts/postService';

import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button/Button';
import Text from '@/components/atoms/Text';
import PostItem from '@/components/molecules/PostItem';

function FeedsScreen() {
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: PostServices.fetchAll,
    refetchInterval: 5 * 60 * 1000,
  });

  const onRefresh = () => {
    refetch();
  };

  if (isLoading && posts.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text>Loading posts...</Text>
        </Box>
      </SafeAreaView>
    );
  }

  if (isError && posts.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text marginBottom="m" variant="body">Error loading posts: {error.message}</Text>
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
          renderItem={({ item }) => (
            <PostItem
              post={item}
              commentsCount={item.replies?.[0]?.count || 0}
            />
          )}
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
