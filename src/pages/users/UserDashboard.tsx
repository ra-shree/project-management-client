import {
  Card,
  CardHeader,
  CardBody,
  Box,
  Grid,
  GridItem,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { Loading } from '../../components';
import { useQueries } from '@tanstack/react-query';
import { authApi } from '../../utils';
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const headingStyle = {
  fontWeight: 'bolder',
  fontSize: '1.8rem',
};

export default function UserDashboard() {
  const userInfo = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  if (userInfo.role === 'admin') {
    navigate('/admin/dashboard');
  }

  if (userInfo.role === 'manager') {
    navigate('/manager/dashboard');
  }

  const [reportQuery, newProjectQuery, newTaskQuery] = useQueries({
    queries: [
      {
        queryKey: [`report`],
        queryFn: async () => {
          const response = await authApi.get(`/api/user/summary/count`);
          return response.data;
        },
      },
      {
        queryKey: [`project.new`],
        queryFn: async () => {
          const response = await authApi.get(`/api/user/summary/projects`);
          return response.data;
        },
      },
      {
        queryKey: [`task.new`],
        queryFn: async () => {
          const response = await authApi.get(`/api/user/summary/tasks`);
          return response.data;
        },
      },
    ],
  });

  return (
    <Box style={{ padding: '1em 1em 1em 2em' }}>
      <Heading size="lg" h={8}>
        Dashboard
      </Heading>
      <Grid
        templateColumns="repeat(4, 3fr)"
        gap="4"
        style={{ padding: '1em 0' }}>
        <GridItem w="100%" h="10">
          <Card style={{ maxHeight: '80vh' }}>
            <CardHeader>
              <Heading style={headingStyle}>Summary Report</Heading>
            </CardHeader>
            {reportQuery.isSuccess ? (
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="md">User</Heading>
                    <Text pt="2" fontSize="md">
                      Tasks:{' '}
                      {reportQuery?.data?.completed_task_count +
                        reportQuery?.data?.incomplete_task_count}
                    </Text>
                    <Text pt="2" fontSize="md">
                      Completed: {reportQuery?.data?.completed_task_count}
                    </Text>
                    <Text pt="2" fontSize="md">
                      Remaining: {reportQuery?.data?.incomplete_task_count}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            ) : (
              <Loading />
            )}
          </Card>
        </GridItem>
        <GridItem w="100%" h="10">
          <Card style={{ maxHeight: '80vh' }}>
            <CardHeader>
              <Heading style={headingStyle}>Your Projects</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                {newProjectQuery.isSuccess ? (
                  newProjectQuery.data?.projects?.map((project: any) => {
                    return (
                      <Box>
                        <Heading size="md">{project?.title}</Heading>
                        <Text pt="2" fontSize="md">
                          Created:{' '}
                          {formatDistanceToNow(
                            Date.parse(project?.created_at),
                            {
                              addSuffix: true,
                            }
                          )}
                        </Text>
                      </Box>
                    );
                  })
                ) : (
                  <Loading />
                )}
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
        {userInfo.role === 'developer' && (
          <GridItem w="100%" h="10">
            <Card style={{ maxHeight: '80vh' }}>
              <CardHeader>
                <Heading style={headingStyle}>Your Tasks</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  {newTaskQuery.isSuccess ? (
                    newTaskQuery.data?.tasks?.map((task: any) => {
                      return (
                        <Box>
                          <Heading size="md">{task?.title}</Heading>
                          <Text pt="2" fontSize="md">
                            Created:{' '}
                            {formatDistanceToNow(Date.parse(task?.created_at), {
                              addSuffix: true,
                            })}
                          </Text>
                          <Text pt="2" fontSize="md">
                            Completed: {task?.completed ? 'Yes' : 'No'}
                          </Text>
                        </Box>
                      );
                    })
                  ) : (
                    <Loading />
                  )}
                </Stack>
              </CardBody>
            </Card>
          </GridItem>
        )}
      </Grid>
    </Box>
  );
}
