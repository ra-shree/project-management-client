import { Box, Heading, Flex, Spacer } from '@chakra-ui/react';
import { DataTable } from '..';
import { useQuery } from '@tanstack/react-query';
import { authApi } from '../../../utils';
import { Loading } from '../../../components';

export default function Home(): JSX.Element {
  const { data, isSuccess } = useQuery(['projects'], async () => {
    const response = await authApi.get('/api/user/projects');
    return response.data;
  });

  return (
    <>
      <Flex style={{ padding: '1em 1em 1em 2em' }}>
        <Box>
          <Heading size="lg" h={8}>
            My Projects
          </Heading>
        </Box>
        <Spacer />
      </Flex>
      {isSuccess ? (
        <DataTable
          TableColumns={['Project Name', 'Created', 'Last Updated', 'Status']}
          TableData={data}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
