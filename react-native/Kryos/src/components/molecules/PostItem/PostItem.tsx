import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Post } from '@/hooks/domain/posts/postService';

import Avatar from '@/components/atoms/Avatar/Avatar';
import Box from '@/components/atoms/Box';
import Text from '@/components/atoms/Text';

type PostItemProps = {
  commentsCount?: number;
  isReply?: boolean;
  post: Post;
};

const PostItem = ({
  commentsCount = 0,
  isReply = false,
  post,
}: PostItemProps) => {
  const navigation = useNavigation();

  if (!post) {
    return null;
  }

  const userProfile = post.profiles;

  const navigateToDetail = () => {
    if (!isReply) {
      navigation.navigate('Main', {
        params: { post },
        screen: 'PostDetail',
      });
    }
  };

  return (
    <TouchableOpacity disabled={isReply} onPress={navigateToDetail}>
      <Box
        backgroundColor={isReply ? 'bgSecondary' : 'bgCard'}
        borderBottomColor="borderDefault"
        borderBottomWidth={1}
        borderRadius="s"
        marginBottom="s"
        marginHorizontal="s"
        padding="m"
      >
        <Box alignItems="flex-start" flexDirection="row" marginBottom="m">
          <Box marginRight="s">
            <Avatar
              imageUrl={userProfile?.avatar_url}
              name={userProfile?.full_name ?? userProfile?.username}
              size={40}
            />
          </Box>
          <Box flex={1}>
            <Text variant="header">
              {userProfile?.full_name ?? userProfile?.username ?? 'Unknown User'}
            </Text>
            <Text color="textSecondary" variant="caption">
              @{userProfile?.username ?? 'username'}
            </Text>
          </Box>
        </Box>
        <Text marginBottom="s" variant="body">
          {post.content}
        </Text>
        <Box
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Text color="textSecondary" variant="caption">
            {new Date(post.created_at).toLocaleDateString()}
          </Text>

          <Box alignItems="center" flexDirection="row">
            <MaterialIcons
              color="#888"
              name="chat-bubble-outline"
              size={16}
            />
            <Text color="textSecondary" marginLeft="xs" variant="caption">
              {commentsCount ?? '...'}
            </Text>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default PostItem;
