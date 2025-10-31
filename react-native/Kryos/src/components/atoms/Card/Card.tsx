import Box from '@/components/atoms/Box';

export type CardProps = {
  children: React.ReactNode;
  variant?: 'default' | 'outlined';
} & React.ComponentProps<typeof Box>;

function Card({ children, variant = 'default', ...rest }: CardProps) {
  if (variant === 'outlined') {
    return (
      <Box
        backgroundColor="bgSurface"
        borderColor="borderDefault"
        borderRadius="l"
        borderWidth={1}
        marginHorizontal="s"
        marginVertical="s"
        padding="m"
        {...rest}
      >
        {children}
      </Box>
    );
  } else { // default
    return (
      <Box
        backgroundColor="bgSurface"
        borderRadius="l"
        elevation={3}
        marginHorizontal="s"
        marginVertical="s"
        padding="m"
        shadowColor="gray8"
        shadowOffset={{ height: 2, width: 0 }}
        shadowOpacity={0.1}
        shadowRadius={4}
        {...rest}
      >
        {children}
      </Box>
    );
  }
}

export default Card;