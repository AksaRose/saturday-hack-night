import React from 'react';
import {
    VStack,
    Image,
    Box,
    Text,
    HStack,
    Button,
    useToast,
    useDisclosure,
} from '@chakra-ui/react';
import { Activity } from '@app/types';
import { useRouter } from 'next/router';
import { Toast } from '@app/components';
import { ResultsModal } from '@app/components/modal';

const EventCard = ({ event }: EventCardProps) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { id, description, image, status, details, _count } = event;
    const { push, query } = useRouter();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            {isOpen && (
                <ResultsModal id={event.id} onClose={onClose} isOpen={isOpen} image={image} />
            )}
            <VStack
                className="cardBox"
                maxWidth="300px"
                backgroundColor="rgba(255,255,255,.15)"
                alignItems="flex-start"
                borderRadius="10px"
            >
                <Box
                    position="relative"
                    backgroundColor="white"
                    padding="30px"
                    width="100%"
                    borderTopRadius="10px"
                >
                    <Text
                        display="none"
                        position="absolute"
                        cursor="pointer"
                        paddingInline="8px"
                        right="10px"
                        top="10px"
                        fontFamily="Clash Display"
                        paddingBlock="4px"
                        borderRadius="10px"
                        textColor="white"
                        backgroundColor="rgba(0,0,0,.5)"
                        _hover={{
                            textColor: 'black',
                            boxShadow: '0px 8px 16px rgba(255, 255, 255, 0.15)',
                            backgroundColor: '#DBF72C',
                        }}
                        css={{
                            '.cardBox: hover &': {
                                display: status === 'RESULT' ? 'block' : 'none',
                            },
                        }}
                        onClick={() =>
                            navigator.clipboard
                                .writeText(`${window.location.href}?eventID=${event.id}`)
                                .then(() => {
                                    toast({
                                        title: '✅Copied to clipboard!',
                                        status: 'success',
                                        position: 'bottom',
                                        // eslint-disable-next-line @typescript-eslint/no-shadow
                                        render: ({ title, status }) => (
                                            <Toast title={title} status={status} />
                                        ),
                                    });
                                })
                        }
                    >
                        Copy Link
                    </Text>
                    <Image height="120px" src={image} objectFit="cover" />
                </Box>
                <VStack
                    paddingInline="16px"
                    alignItems="flex-start"
                    flexGrow="1"
                    rowGap="5px"
                    justifyContent="space-around"
                >
                    <Box backgroundColor="rgba(219,247,44,.15)" borderRadius="15px">
                        <Text
                            paddingBlock="5px"
                            paddingInline="10px"
                            fontSize="12px"
                            textColor="#DBF72C"
                            fontFamily="Clash Display"
                            fontWeight="medium"
                        >
                            ✅ {_count!.teams || 0} Teams
                        </Text>
                    </Box>
                    <Text
                        fontSize="12px"
                        textColor="white"
                        flexGrow="1"
                        fontFamily="Clash Display"
                        fontWeight="medium"
                        noOfLines={3}
                    >
                        {description}
                    </Text>
                    <HStack
                        width="100%"
                        borderEndRadius="10px"
                        justifyContent="space-between"
                        paddingBlock="8px"
                    >
                        <Button
                            width="130px"
                            disabled={status !== 'RESULT'}
                            _hover={{
                                boxShadow: '0px 8px 16px rgba(255, 255, 255, 0.15)',
                                backgroundColor: '#DBF72C',
                            }}
                            _active={{
                                textColor: '#DBF72C',
                                background: 'rgba(219, 247, 44, 0.15)',
                                boxShadow: '0px 8px 16px rgba(219, 247, 44, 0.15)',
                                backdropFilter: 'blur(25px)',
                            }}
                            onClick={() => {
                                push({ query: { ...query, eventID: id } }, undefined, {
                                    shallow: true,
                                });
                                onOpen();
                            }}
                        >
                            View Projects
                        </Button>
                        <Button
                            width="130px"
                            background="rgba(255, 255, 255, 0.15)"
                            textColor="white"
                            _hover={{
                                textColor: 'black',
                                boxShadow: '0px 8px 16px rgba(255, 255, 255, 0.15)',
                                backgroundColor: '#DBF72C',
                            }}
                            _active={{
                                textColor: '#DBF72C',
                                background: 'rgba(219, 247, 44, 0.15)',
                                boxShadow: '0px 8px 16px rgba(219, 247, 44, 0.15)',
                                backdropFilter: 'blur(25px)',
                            }}
                            onClick={() => window.open(details, '_blank')}
                        >
                            More Info
                        </Button>
                    </HStack>
                </VStack>
            </VStack>
        </>
    );
};
interface EventCardProps {
    event: Activity & {
        _count?: {
            teams: number;
        };
    };
}

export { EventCard };
