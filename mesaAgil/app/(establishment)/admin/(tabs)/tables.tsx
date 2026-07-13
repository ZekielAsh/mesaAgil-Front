import CreateTableModal from '@/components/tables/CreateTableModal';
import EditTableModal from '@/components/tables/EditTableModal';
import TableStatusModal from '@/components/tables/TableStatusModal';
import { Fonts } from '@/constants/fonts';
import { useCreateTable } from '@/hooks/menu/useCreateTable';
import { useCloseTable } from '@/hooks/table/useCloseTable';
import { useEnableTable } from '@/hooks/table/useEnableTable';
import { useTablesQrInfo } from '@/hooks/table/useTablesQrInfo';
import { useUpdateTable } from '@/hooks/table/useUpdateTable';
import { TableQrInfo } from '@/types/TableQr';
import { useState } from 'react';
import { ActivityIndicator, Button, FlatList, Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const TableScreen = () => {
  const { tables, loading, error, refetch } = useTablesQrInfo();
  const { execute: createTable, loading: creatingTable } = useCreateTable();
  const { execute: updateTable, loading: updatingTable } = useUpdateTable();
  const { execute: enableTable, loading: enablingTable } = useEnableTable();
  const { execute: closeTable, loading: closingTable } = useCloseTable();

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editingTable, setEditingTable] = useState<TableQrInfo | null>(null);
  const [statusTable, setStatusTable] = useState<TableQrInfo | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  const handleDownload = (table: TableQrInfo) => {
    Linking.openURL(table.qrDownloadUrl);
  };

  const handleCreate = async (tableNumber: number) => {
    try {
      await createTable(tableNumber);

      Toast.show({
        type: 'success',
        text1: 'Mesa creada',
        text2: `La mesa ${tableNumber} fue creada correctamente`
      });

      setCreateModalVisible(false);
      refetch();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear la mesa';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage
      });
    }
  };

  const handleEdit = (table: TableQrInfo) => {
    setEditingTable(table);
    setEditModalVisible(true);
  };

  const handleEditSubmit = async (tableNumber: number) => {
    if (!editingTable) return;

    try {
      const updated = await updateTable(editingTable.tableId, tableNumber);

      Toast.show({
        type: 'success',
        text1: 'Mesa editada',
        text2: `La mesa fue actualizada correctamente`
      });

      setEditModalVisible(false);
      setEditingTable(null);
      refetch();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al editar la mesa';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage
      });
    }
  };

  const handleOpenStatus = (table: TableQrInfo) => {
    setStatusTable(table);
    setStatusModalVisible(true);
  };

  const handleEnable = async () => {
    if (!statusTable) return;

    try {
      const updated = await enableTable(statusTable.tableId);

      Toast.show({
        type: 'success',
        text1: 'Mesa habilitada',
        text2: `La mesa ${updated.tableNumber} fue habilitada`
      });

      setStatusModalVisible(false);
      setStatusTable(null);
      refetch();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al habilitar la mesa';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage
      });
    }
  };

  const handleClose = async () => {
    if (!statusTable) return;

    try {
      const updated = await closeTable(statusTable.tableId);

      Toast.show({
        type: 'success',
        text1: 'Mesa cerrada',
        text2: `La mesa ${updated.tableNumber} fue cerrada`
      });

      setStatusModalVisible(false);
      setStatusTable(null);
      refetch();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cerrar la mesa';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage
      });
    }
  };

  const renderTable = ({ item }: { item: TableQrInfo }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.qrImageUrl
        }}
        style={styles.qrImage}
        resizeMode="contain"
      />

      <View style={styles.cardContent}>
        <View style={styles.titleRow}>
          <Text style={styles.tableTitle}>{item.tableLabel}</Text>
          <View style={[styles.statusBadge, item.enabled ? styles.enabledBadge : styles.disabledBadge]}>
            <Text style={[styles.badgeText, item.enabled ? styles.enabledText : styles.disabledText]}>
              {item.enabled ? '✓ Habilitada' : '✗ Cerrada'}
            </Text>
          </View>
        </View>

        <Text style={styles.token} numberOfLines={1}>
          Token: {item.qrToken}
        </Text>

        <View style={styles.actions}>
          <Pressable style={styles.primaryButton} onPress={() => Linking.openURL(item.qrImageUrl)}>
            <Text style={styles.primaryButtonText}>Ver QR</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={() => handleDownload(item)}>
            <Text style={styles.secondaryButtonText}>Descargar</Text>
          </Pressable>
        </View>

        <View style={styles.bottomActions}>
          <Pressable style={styles.editButton} onPress={() => handleEdit(item)} disabled={updatingTable}>
            <Text style={styles.editButtonText}>Editar</Text>
          </Pressable>

          <Pressable
            style={item.enabled ? styles.closeButton : styles.statusButton}
            onPress={() => handleOpenStatus(item)}
            disabled={enablingTable || closingTable}
          >
            <Text style={styles.statusButtonText}>{item.enabled ? 'Cerrar' : 'Habilitar'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Reintentar" onPress={refetch} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tables}
        keyExtractor={table => table.tableId.toString()}
        renderItem={renderTable}
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={refetch}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View>
                <Text style={styles.title}>Listado de Mesas</Text>
                <Text style={styles.subtitle}>
                  Cada mesa obtiene su propio codigo QR al crearse. El código no es modificable.
                </Text>
              </View>
              <Pressable
                style={styles.createButton}
                onPress={() => setCreateModalVisible(true)}
                disabled={creatingTable}
              >
                <Text style={styles.createButtonText}>+ Nueva mesa</Text>
              </Pressable>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay mesas para mostrar.</Text>
          </View>
        }
      />
      <CreateTableModal
        visible={createModalVisible}
        loading={creatingTable}
        onClose={() => setCreateModalVisible(false)}
        onSubmit={handleCreate}
      />
      <EditTableModal
        visible={editModalVisible}
        table={editingTable}
        loading={updatingTable}
        onClose={() => {
          setEditModalVisible(false);
          setEditingTable(null);
        }}
        onSubmit={handleEditSubmit}
      />
      <TableStatusModal
        visible={statusModalVisible}
        table={statusTable}
        loading={enablingTable || closingTable}
        onClose={() => {
          setStatusModalVisible(false);
          setStatusTable(null);
        }}
        onEnable={handleEnable}
        onCloseTable={handleClose}
      />
    </View>
  );
};

export default TableScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6'
  },
  loader: {
    marginTop: 50
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 24
  },
  list: {
    padding: 16,
    gap: 12
  },
  header: {
    marginBottom: 4
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12
  },
  title: {
    color: '#111827',
    fontSize: 24,
    fontFamily: Fonts.bold
  },
  subtitle: {
    color: '#6B7280',
    fontSize: 14,
    fontFamily: Fonts.medium,
    marginTop: 4
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    elevation: 2
  },
  qrImage: {
    width: 116,
    height: 116,
    borderRadius: 8,
    backgroundColor: '#F9FAFB'
  },
  cardContent: {
    flex: 1,
    gap: 8
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8
  },
  tableTitle: {
    color: '#111827',
    fontSize: 18,
    fontFamily: Fonts.bold,
    flex: 1
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6
  },
  enabledBadge: {
    backgroundColor: '#DCFCE7'
  },
  disabledBadge: {
    backgroundColor: '#FEE2E2'
  },
  badgeText: {
    fontSize: 16,
    fontFamily: Fonts.bold
  },
  enabledText: {
    color: '#166534'
  },
  disabledText: {
    color: '#991B1B'
  },
  token: {
    color: '#6B7280',
    fontSize: 12,
    fontFamily: Fonts.medium
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap'
  },
  primaryButton: {
    backgroundColor: '#111827',
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 12
  },
  secondaryButton: {
    borderColor: '#111827',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  primaryButtonText: {
    color: '#fff',
    fontFamily: Fonts.bold
  },
  secondaryButtonText: {
    color: '#111827',
    fontFamily: Fonts.bold
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4
  },
  editButton: {
    backgroundColor: '#f48e00',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center'
  },
  editButtonText: {
    color: '#fff',
    fontFamily: Fonts.bold,
    fontSize: 14
  },
  statusButton: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center'
  },
  closeButton: {
    backgroundColor: '#EF4444',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center'
  },
  statusButtonText: {
    color: '#fff',
    fontFamily: Fonts.bold,
    fontSize: 14
  },
  errorText: {
    color: '#B91C1C',
    textAlign: 'center',
    fontFamily: Fonts.medium
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center'
  },
  emptyText: {
    color: '#6B7280',
    fontFamily: Fonts.medium
  },
  createButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
