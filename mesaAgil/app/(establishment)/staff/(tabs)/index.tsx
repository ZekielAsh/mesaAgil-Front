import TableAssignmentModal from '@/components/tables/TableAssignmentModal';
import TableStatusGrid from '@/components/tables/TableStatusGrid';
import AssignedTableCard from '@/components/tables/AssignedTableCard';
import { Fonts } from '@/constants/fonts';
import { useAssignedTables } from '@/hooks/table/useAssignedTables';
import { useTableAssignment } from '@/hooks/table/useTableAssignment';
import { useTableOccupancy } from '@/hooks/table/useTableOccupancy';
import { useAuth } from '@/hooks/useAuth';
import { TableOccupancy } from '@/types/TableOccupancy';
import { useTableSessionManagement } from '@/hooks/table/useTableSessionManagement';
import { useEffect, useState } from 'react';
import { stompClient } from '@/service/websocket';
import { useWebSocket } from '@/hooks/useWebSocket';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function TablesScreen() {
  const { user } = useAuth();
  const { tables, loading, setTables } = useTableOccupancy();
  const { tables: assignedTables, setTables: setAssignedTables } = useAssignedTables();
  const { connected } = useWebSocket();
  const { assign, unassign } = useTableAssignment();
  const [selectedTable, setSelectedTable] = useState<TableOccupancy | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const TABLE_EVENTS = [
    'ASSIGNED_TABLE_UPDATED'
  ];
  const { openSession, closeSession } = useTableSessionManagement();

  const handleSelectTable = (table: TableOccupancy) => {
    setSelectedTable(table);
    setModalVisible(true);
  };

  const handleAssign = async (tableId: number) => {
    try {
      await assign(tableId);
      Toast.show({
        type: 'success',
        text1: 'Mesa asignada'
      });

      setModalVisible(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1:
          error instanceof Error
            ? error.message
            : 'No se pudo asignar'
      });
    }
  };

  const handleUnassign = async (tableId: number) => {
    try {
      await unassign(tableId);
      Toast.show({
        type: 'success',
        text1: 'Mesa liberada'
      });

      setModalVisible(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1:
          error instanceof Error
            ? error.message
            : 'No se pudo liberar'
      });
    }
  };

  useEffect(() => {
    if (!connected) { return; }

    const subscription = stompClient.subscribe(
      `/room/staff/${user?.username}`,
      message => {
        const event = JSON.parse(message.body);
        const updatedTable: TableOccupancy = event.payload;
        if (!TABLE_EVENTS.includes(event.type)) { return; }
        
        setTables((current: TableOccupancy[]) =>
          current.map((table: TableOccupancy) =>
            table.tableId === updatedTable.tableId
              ? updatedTable
              : table
          )
        );

        if (updatedTable.assignedStaffUsername === user?.username) {
          setAssignedTables((current: TableOccupancy[]) => {
            const exists =
              current.some((t: TableOccupancy) =>
                t.tableId === updatedTable.tableId
              );
            if (!exists) {
              return [...current, updatedTable];
            }
            return current.map((t: TableOccupancy) =>
              t.tableId === updatedTable.tableId
                ? updatedTable
                : t
            );
          });
        } else {
          setAssignedTables(current =>
            current.filter((t: TableOccupancy) =>
              t.tableId !== updatedTable.tableId
            )
          );

        }
      }
    );

    return () => subscription.unsubscribe();

  }, [
    connected,
    user?.username,
    setTables,
    setAssignedTables
  ]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{
          marginTop: 50
        }}
      />
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>
        Estado del salón
      </Text>

      <View style={styles.legend}>
        <Text>🔵 Libre</Text>
        <Text>🟠 Ocupada</Text>
        <Text>🔴 Cerrada</Text>
      </View>

      <TableStatusGrid
        tables={tables}
        onSelectTable={handleSelectTable}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Mis mesas ({assignedTables.length})
        </Text>

        <View style={styles.assignedTablesContainer}>
          {assignedTables.length === 0 ? (
            <Text style={styles.emptyText}>
              No tienes mesas asignadas
            </Text>
          ) : (
            assignedTables.map(table => (
              <AssignedTableCard
                key={table.tableId}
                table={table}
                onOpenSession={openSession}
                onCloseSession={closeSession}
            />
            ))
          )}
        </View>
      </View>

      <TableAssignmentModal
        visible={modalVisible}
        table={selectedTable}
        currentUsername={user?.username}
        onAssign={handleAssign}
        onUnassign={handleUnassign}
        onClose={() =>
          setModalVisible(false)
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },

  content: {
    padding: 16
  },

  title: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    marginBottom: 12
  },

  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  section: {
    marginTop: 24
  },

  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    marginBottom: 12
  },

  assignedCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10
  },

  assignedTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold
  },

  emptyText: {
    color: '#6B7280'
  },
  
  assignedTablesContainer: {
    marginTop: 8
  },
});