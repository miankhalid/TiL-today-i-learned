import type { AuthScreenProps } from '@/navigation/types';

import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button/Button';
import Image from '@/components/atoms/Image';
import Text from '@/components/atoms/Text';

import { dummyPosts } from '@/dummy/dummyData';

import avatarPlaceholder from '../../theme/assets/images/default_avatar.png';

function FeedScreen({ navigation }: AuthScreenProps<'Feed'>) {
  const renderPost = ({ item }: { item: any }) => (
    <Box borderBottomColor="borderDefault" borderBottomWidth={1} key={item.id} padding="m">
      <Box alignItems="flex-start" flexDirection="row" marginBottom="m">
        <Image
          borderRadius="round"
          height={40}
          marginRight="s"
          source={{ uri: item.user?.image || avatarPlaceholder }}
          width={40}
        />
        <Box flex={1}>
          <Text variant="header">{item.user?.name || item.user_id}</Text>
          <Text color="textSecondary" variant="caption">@{item.user?.username}</Text>
        </Box>
      </Box>
      <Text marginBottom="s" variant="body">
        {item.content}
      </Text>
      <Text color="textSecondary" variant="caption">{item.created_at}</Text>
    </Box>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1}>
        {/* Auth panel containing login & signup buttons at the bottom */}
        <Box flex={1} justifyContent="space-between">
          <FlatList
            contentContainerStyle={{ paddingBottom: 20 }}
            data={dummyPosts}
            keyExtractor={(item) => item.id}
            renderItem={renderPost}
            showsVerticalScrollIndicator={false}
          />
          
          <Box
            backgroundColor="bgSurface"
            borderTopColor="borderDefault"
            borderTopWidth={1}
            padding="m">
            <Text marginBottom="m" textAlign="center" variant="header">
              Join the Conversation
            </Text>
            <Button
              containerProps={{ marginBottom: 's' }}
              onPress={() => {
                navigation.navigate('Login');
              }}
              title="Login"
            />
            <Button
              onPress={() => {
                navigation.navigate('Signup');
              }}
              title="Sign Up"
              variant="text"
            />
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
}

export default FeedScreen;