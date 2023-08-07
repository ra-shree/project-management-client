import {
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

export default function DataTable({
  TableColumns,
  TableData,
}: {
  TableColumns: string[];
  TableData: any[];
}): JSX.Element {
  return (
    <TableContainer>
      <Table variant="simple" size="lg">
        <Thead>
          <Tr>
            {TableColumns.map((item) => (
              <Th key={item}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {TableData.map((data) => (
            <Tr key={data.id}>
              <Th>
                <Link
                  as={RouterLink}
                  to={`/user/projects/${data.id}`}
                  style={{ textDecoration: 'none' }}>
                  {data.title}
                </Link>
              </Th>
              <Th hidden>{data.description}</Th>
              <Th>
                {formatDistanceToNow(Date.parse(data.created_at), {
                  addSuffix: true,
                })}
              </Th>
              <Th>
                {formatDistanceToNow(Date.parse(data.updated_at), {
                  addSuffix: true,
                })}
              </Th>
              <Th>{data.status}</Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
