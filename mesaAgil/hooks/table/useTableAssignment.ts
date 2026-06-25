import {
  assignTable,
  unassignTable
} from '@/service/tableService';

export function useTableAssignment() {
  const assign = async (tableId: number) => {
    return assignTable(tableId);
  };

  const unassign = async (tableId: number) => {
    return unassignTable(tableId);
  };

  return {assign, unassign};
}