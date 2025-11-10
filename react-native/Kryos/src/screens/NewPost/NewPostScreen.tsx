import * as ImagePicker from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useCreatePost } from '@/hooks/domain/post/useCreatePost';
import { MainScreenProps } from '@/navigation/types';
import { useAppTheme } from '@/theme';

import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button/Button';
import Image from '@/components/atoms/Image';
import Input from '@/components/atoms/Input/Input';
import SnackBar from '@/components/atoms/SnackBar/SnackBar';
import Text from '@/components/atoms/Text';

function NewPostScreen({ navigation }: MainScreenProps<'NewPost'>) {
  const { colors } = useAppTheme();
  const {
    content,
    error,
    handleCreatePost,
    images,
    isLoading,
    isPostingDisabled,
    onDismissSnackBar,
    setContent,
    setImages,
    showSnackbar,
  } = useCreatePost();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibrary({
      includeBase64: false,
      mediaType: 'photo',
      selectionLimit: 0,
    });

    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.errorCode) {
      console.log('ImagePicker Error: ', result.errorMessage);
    } else if (result.assets) {
      setImages(result.assets);
    }
  };

  const handlePost = async () => {
    const success = await handleCreatePost();
    if (success) {
      navigation.goBack();
    }
  };

  const handleCancel = () => {
    setImages([]);
    setContent('');
    navigation.goBack();
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

        <Box flexDirection="column" justifyContent="flex-end" marginTop="m">
          <MaterialIcons
            color={colors.primary}
            disabled={isLoading}
            marginBottom="10"
            name="add-a-photo"
            onPress={pickImage}
            size={30}
          />
          {images.length > 0 ? (
            <Box flexDirection="row" marginBottom="m">
              {images.map((image, index) => (
                <Box key={index} marginEnd="s">
                  <Image
                    height={100}
                    resizeMethod="scale"
                    resizeMode="cover"
                    source={{ uri: image.uri }}
                    width={100}
                  />
                  <MaterialIcons
                    color="red"
                    name="remove-circle"
                    onPress={() => setImages(images.filter((_, index_) => index_ !== index))}
                    size={24}
                    style={{ position: 'absolute', right: 0, top: 0 }}
                  />
                </Box>
              ))}
            </Box>
          ) : null}
          <Button
            containerProps={{ marginLeft: 's' }}
            disabled={isPostingDisabled()}
            loading={isLoading}
            onPress={() => {
              void handlePost();
            }}
            title="Post"
          />
          <Button
            disabled={isLoading}
            onPress={handleCancel}
            title="Cancel"
            variant="text"
          />
        </Box>
      </Box>
      <SnackBar
        duration="long"
        message={error}
        onDismiss={onDismissSnackBar}
        variant="error"
        visible={showSnackbar}
      />
    </SafeAreaView>
  );
}

export default NewPostScreen;
