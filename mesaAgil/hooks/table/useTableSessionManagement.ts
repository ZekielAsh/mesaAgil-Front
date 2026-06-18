export function useTableSessionManagement() {

  const openSession = async (
    tableId: number
  ) => {
    console.log(
      'TODO OPEN SESSION',
      tableId
    );
  };

  const closeSession = async (
    tableId: number
  ) => {
    console.log(
      'TODO CLOSE SESSION',
      tableId
    );
  };

  return {
    openSession,
    closeSession
  };
}