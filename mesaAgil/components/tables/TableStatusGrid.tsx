import { TableOccupancy } from '@/types/TableOccupancy';
import { FlatList } from 'react-native';
import TableCard from './TableCard';

type Props = {
  tables: TableOccupancy[];
  onSelectTable: (
    table: TableOccupancy
  ) => void;
};

export default function TableStatusGrid({
  tables,
  onSelectTable
}: Props) {
  return (
    <FlatList
      data={tables}
      scrollEnabled={false}
      numColumns={3}
      keyExtractor={item =>
        item.tableId.toString()
      }
      columnWrapperStyle={{
        gap: 10,
        marginBottom: 10
      }}
      renderItem={({ item }) => (
        <TableCard
          table={item}
          onPress={() =>
            onSelectTable(item)
          }
        />
      )}
    />
  );
}