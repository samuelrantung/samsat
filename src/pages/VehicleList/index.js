import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {colors, fonts, IMGVehicle} from '../../assets';
import {Gap, TopBar} from '../../components';
import DATA from '../Dashboard/VehicleData';

const VehicleCard = ({
  policeNumber,
  vehicleName,
  vehicleType,
  price,
  dueDate,
  onPress,
}) => (
  <View style={styles.flatListPadding}>
    <TouchableOpacity onPress={onPress} style={styles.vehicleCardContainer}>
      <View style={styles.vehicleCardRow}>
        <Image source={IMGVehicle} style={styles.image} />
        <View style={styles.vehicleTextContainer}>
          <Text style={styles.policeNumber}>{policeNumber}</Text>
          <Gap width={'100%'} height={2} color={colors.lightGrey} />
          <View style={styles.vehicleNameContainer}>
            <Text style={styles.vehicleName}>
              {vehicleName}{' '}
              <Text style={styles.vehicleType}>{vehicleType}</Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomCardContainer}>
        <View>
          <View style={styles.expireContainer}>
            <View style={styles.expireTextContainer}>
              <Text style={styles.expire}>Berlaku Sampai</Text>
            </View>
            <View style={styles.expireDateContainer}>
              <Text style={styles.expire}>{dueDate}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.bill}>
          Rp <Text>{price}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

const VehicleList = ({navigation}) => {
  const renderItem = ({item}) => (
    <VehicleCard
      policeNumber={item.policeNumber}
      vehicleName={item.vehicleName}
      vehicleType={item.vehicleType}
      price={item.price}
      dueDate={item.dueDate}
      onPress={() => navigation.navigate('VehicleDetail')}
    />
  );
  return (
    <SafeAreaView style={styles.page}>
      <TopBar title="Daftar Kendaraan" onBack={() => navigation.goBack()} />
      <View style={styles.contentContainer}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default VehicleList;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    // paddingHorizontal: 24,
  },
  flatListPadding: {
    paddingHorizontal: 24,
    marginVertical: 10,
  },
  vehicleCardContainer: {
    backgroundColor: colors.white,
    height: 156,
    width: '100%',
    borderRadius: 8,
    elevation: 5,
  },
  image: {
    width: 101,
    height: 101,
    marginLeft: 10,
    marginTop: 10,
  },
  vehicleCardRow: {
    flexDirection: 'row',
  },
  vehicleTextContainer: {
    flex: 1,
    paddingRight: 10,
    paddingTop: 10,
    // justifyContent: 'space-between',
    paddingLeft: 22,
  },
  policeNumber: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 24,
    color: colors.primaryBlack,
    textAlign: 'right',
  },
  vehicleNameContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  vehicleName: {
    fontSize: 14,
    fontFamily: fonts.Poppins.medium,
    height: 46,
    textAlign: 'right',
    color: colors.primaryBlack,
  },
  vehicleType: {
    fontSize: 12,
    fontFamily: fonts.Poppins.medium,
    color: colors.grey,
  },

  bottomCardContainer: {
    backgroundColor: colors.primaryRed,
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  expireContainer: {
    width: 160,
    height: 18,
    flexDirection: 'row',
  },
  expireTextContainer: {
    flex: 2,
    backgroundColor: colors.primaryBlack,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  expireDateContainer: {
    flex: 2,
    backgroundColor: colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopEndRadius: 3,
    borderBottomEndRadius: 3,
  },
  expire: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 8,
    color: colors.white,
  },
  bill: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 15,
    color: colors.white,
  },
});