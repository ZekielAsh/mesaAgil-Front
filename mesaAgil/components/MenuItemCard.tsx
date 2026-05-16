import { Fonts } from '@/constants/fonts';
import { Item } from '@/types/model/Item';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  item: Item;
  addToCart: (item: Item) => void;
}

export default function MenuItemCard({ item, addToCart }: Props) {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{
          uri: item.imageUrl
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.cardButtonsContainer}>
            <Pressable
              onPress={() => addToCart(item)}
              style={({ pressed }) => [
                styles.cardButton,
                {
                  backgroundColor: pressed ? '#a94700' : '#F06400',
                  transform: [
                    {
                      scale: pressed ? 0.95 : 1
                    }
                  ]
                }
              ]}
            >
              <Text style={styles.cardButtonText}>Agregar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 12,
    gap: 8,

    boxShadow: '2px 2px 4px rgba(0,0,0,0.25)'
  },
  cardContent: {
    display: 'flex',
    flex: 1
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8
  },
  name: {
    fontSize: 16,
    fontFamily: Fonts.semiBold
  },
  description: {
    color: '#6C6C6C',
    fontSize: 12,
    fontFamily: Fonts.medium
  },
  price: {
    fontSize: 20,
    fontFamily: Fonts.bold
  },
  cardButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  cardButton: {
    height: 36,
    justifyContent: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 12
  },
  cardButtonText: {
    color: '#fff',
    fontFamily: Fonts.bold
  },
  cardBody: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
