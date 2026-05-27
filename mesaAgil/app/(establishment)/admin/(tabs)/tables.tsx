import { Fonts } from '@/constants/fonts';
import CreateTableModal from '@/components/tables/CreateTableModal';
import { useCreateTable } from '@/hooks/useCreateTable';
import { useTablesQrInfo } from '@/hooks/useTablesQrInfo';
import { TableQrInfo } from '@/types/TableQr';
import { ActivityIndicator, Button, FlatList, Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useState } from 'react';

const TableScreen = () => {
  const { tables, loading, error, refetch } = useTablesQrInfo();
  const { execute: createTable, loading: creatingTable } = useCreateTable();
  const [createModalVisible, setCreateModalVisible] = useState(false);

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
        <Text style={styles.tableTitle}>{item.tableLabel}</Text>
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
                <Text style={styles.title}>QR de mesas</Text>
                <Text style={styles.subtitle}>Cada codigo permanece asociado a su mesa.</Text>
              </View>
              <Pressable
                style={styles.createButton}
                onPress={() => setCreateModalVisible(true)}
                disabled={creatingTable}
              >
                <Text style={styles.createButtonText}>+ Crear</Text>
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
    alignItems: 'center',
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
  tableTitle: {
    color: '#111827',
    fontSize: 18,
    fontFamily: Fonts.bold
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
    backgroundColor: '#111827',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  createButtonText: {
    color: '#fff',
    fontFamily: Fonts.bold,
    fontSize: 14
  }
});
