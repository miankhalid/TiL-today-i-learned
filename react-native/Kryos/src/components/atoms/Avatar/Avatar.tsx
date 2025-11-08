import { getInitials } from '@/utils/textUtilities';

import Box from '@/components/atoms/Box';
import Image from '@/components/atoms/Image';
import Text from '@/components/atoms/Text';

type AvatarProps = {
  imageUrl?: null | string;
  name?: null | string;
  size?: number;
};

// Default size for the avatar
const DEFAULT_AVATAR_SIZE = 50;

const Avatar = ({ imageUrl = null, name = null, size = DEFAULT_AVATAR_SIZE }: AvatarProps) => {
  const initials = getInitials(name);

  return (
    <Box
      alignItems="center"
      backgroundColor="gray3"
      borderRadius="round"
      height={size}
      justifyContent="center"
      width={size}
    >
      {imageUrl ? (
        <Image
          borderRadius="round"
          height={size}
          source={{ uri: imageUrl }}
          width={size}
        />
      ) : (
        <Text variant="header">
          {initials ?? '?'}
        </Text>
      )}
    </Box>
  );
};

export default Avatar;
