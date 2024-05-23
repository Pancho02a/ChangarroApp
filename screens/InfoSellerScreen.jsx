import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar';
import BackButton from '../components/BackButton';
import BottomMenuBar from '../components/BottomMenuBar';
import Icon from 'react-native-vector-icons/FontAwesome'; // Asegúrate de tener react-native-vector-icons instalado
import BackgroundImage from '../assets/rscMenu/BackgroundImage.png';
import ProfileUser from '../assets/rscMenu/profileUser.png';
import { ProductContext } from '../context/ProductContext';
import { UserContext } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

const InfoSeller = ({ route }) => {
  const { seller } = route.params;
  const { products } = useContext(ProductContext);
  const { favorites, addToFavorites, removeFromFavorites } = useContext(UserContext);
  const navigation = useNavigation();
  const [sellerProducts, setSellerProducts] = useState([]);

  useEffect(() => {
    const filteredProducts = products.filter(product => product.vendedor === seller);
    setSellerProducts(filteredProducts);
  }, [products, seller]);

  const toggleFavorite = (product) => {
    if (favorites.some(fav => fav.id === product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const renderItem = ({ item }) => {
    const isFavorite = favorites.some(fav => fav.id === item.id);
    return (
      <TouchableOpacity
        style={styles.productItem}
        onPress={() =>
          navigation.navigate('ProductScreen', {
            product: item,
            isFavorite: isFavorite,
          })
        }
      >
        <TouchableOpacity style={styles.favoriteIcon} onPress={() => toggleFavorite(item)}>
          <Icon name={isFavorite ? 'heart' : 'heart-o'} size={20} color={isFavorite ? 'red' : '#030A8C'} />
        </TouchableOpacity>
        <Image source={{ uri: item.imagen }} style={[styles.productImage, { alignSelf: 'center' }]} />
        <View style={styles.productInfo}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.productName}>{item.nombre}</Text>
            <Text style={styles.productPrice}>Precio: {item.precio}</Text>
          </View>
          <Text style={styles.productUnits}>Unidades: {item.unidades}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar />
      <View style={styles.imageContainer}>
        <Image source={BackgroundImage} style={styles.backgroundImage} />
        <View style={styles.backButtonContainer}>
          <BackButton />
        </View>
      </View>
      <View style={styles.profileContainer}>
        <Image source={ProfileUser} style={styles.profileImage} />
      </View>
      <Text style={styles.sellerName}>{seller}</Text>
      <Text style={styles.sellerInfo}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ipsum non sapien dignissim, in dignissim ligula aliquam. Nullam scelerisque ipsum non sapien dignissim.
      </Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>4.5</Text>
            <Icon name="star" size={19} color="#030A8C" style={styles.starIcon} />
          </View>
          <Text style={styles.detailLabel}>Calificación</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.monthsText}>12</Text>
          <Text style={styles.detailLabel}>Meses</Text>
        </View>
      </View>
      <Text style={styles.allProductsText}>Productos</Text>
      {sellerProducts.length === 0 ? (
        <Text style={styles.noProductsText}>No hay productos para mostrar.</Text>
      ) : (
        <FlatList
          data={sellerProducts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productList}
        />
      )}
      <BottomMenuBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 125, // Ajusta la altura según sea necesario
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 10, // Ajusta la posición vertical según sea necesario
    left: 10, // Ajusta la posición horizontal según sea necesario
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -60, // Ajusta esto para posicionar el círculo justo debajo de la imagen de fondo
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#030A8C',
  },
  sellerName: {
    fontSize: 25,
    paddingTop: 15,
    paddingLeft: 30,
  },
  sellerInfo: {
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 30,
    paddingVertical: 20,
    textAlign: 'justify',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  detailItem: {
    alignItems: 'center',
    marginHorizontal: 50, // Reduce el margen horizontal entre los elementos
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 18,
    color: '#000',
    marginRight: 2,
  },
  starIcon: {
    marginLeft: 2,
  },
  detailLabel: {
    fontSize: 19,
    color: '#767272',
    marginTop: 5,
  },
  monthsText: {
    fontSize: 18,
    color: '#000',
  },
  allProductsText: {
    fontSize: 20,
    marginLeft: 30,
    marginTop: 20,
    fontWeight: 'bold',
  },
  noProductsText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  productList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 4,
  },
  productItem: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    margin: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginTop: 5,
  },
  productInfo: {
    flex: 1,
    marginLeft: 5,
  },
  productName: {
    flex: 1, // Para ocupar todo el espacio disponible en la fila
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 2,
    textAlign: 'left', // Alinear el texto a la izquierda
  },
  productPrice: {
    fontSize: 11,
    fontWeight: 'bold',
    marginRight: 3,
    color: '#030A8C', // Cambiar el color a azul
    textAlign: 'right', // Alinear el texto a la derecha
  },
  productUnits: {
    fontSize: 12,
    marginLeft: 2,
    marginBottom: 3,
    color: '#666',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default InfoSeller;
