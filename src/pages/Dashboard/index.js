import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {colors, fonts, IMGDashboard} from '../../assets';
import {Button, Carousel} from '../../components';
import VehicleList from './VehicleList';
import IconBadge from 'react-native-icon-badge';
import {notification} from '../../notification/index';
import axios from 'axios';
import {useState} from 'react/cjs/react.development';
import Vehicle from './Vehicle';
import data from '../../data/data';
import {useDispatch, useSelector} from 'react-redux';
import {getVehicles} from '../../redux/action';

const Dashboard = ({navigation}) => {
  const DashboardReducer = useSelector(state => state.DashboardReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('dashboard reducer: ', DashboardReducer);
  }, []);

  const onPress = () => {
    notification.configure();
    notification.createChannel('1');
    notification.sendNotification(
      '1',
      'CB150R',
      'Pembayaran sebesar Rp.312.100,- jatuh tempo tanggal 11 Juni 2021',
    );
  };

  // const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get('http://10.0.2.2:3004/vehicles')
      .then(res => {
        console.log('res get data: ', res);
        // setVehicles(res.data);
        // dispatch({type: 'SET_VEHICLE', res: res});
        dispatch(getVehicles(res));
        console.log('hasil dispatch: ', DashboardReducer.vehicles);
      })
      .then(console.log('hasil dispatch luar: ', DashboardReducer))
      .catch(error => console.log(error));
  };

  const selectItem = vehicle => {
    console.log('selected item: ', vehicle);

    navigation.navigate('VehicleDetail', {
      vehicle,
    });
  };

  let notificationBadge = 6;
  return (
    <View style={styles.page}>
      <Image source={IMGDashboard} style={styles.backgroundImage} />
      <View style={styles.topIconContainer}>
        <Button type="icon-only" icon="icon-help" onPress={onPress} />

        <IconBadge
          MainElement={
            <Button
              type="icon-only"
              icon="icon-notification"
              onPress={() => navigation.navigate('Notification')}
            />
          }
          BadgeElement={
            <Text style={styles.badgeElement}>{notificationBadge}</Text>
          }
          IconBadgeStyle={styles.iconBadgeStyle}
          Hidden={notification === 0}
        />
      </View>
      <View style={styles.titleContainer}>
        <Button
          type="icon-only"
          icon="icon-main-profile"
          style={styles.iconMainProfile}
          onPress={() => navigation.navigate('Profile')}
        />
        <Text style={styles.title}>SAMSAT Minahasa Utara</Text>
      </View>
      <Carousel style={styles.carousel} />
      <View style={styles.listTitleContainer}>
        <Text style={styles.listTitle}>Daftar Kendaraan</Text>
        <TouchableOpacity>
          <Text style={styles.more}>Lihat Semua</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} style={styles.container}>
        {DashboardReducer.vehicles.map(vehicle => {
          return (
            <Vehicle
              key={vehicle.id}
              policeNumber={vehicle.nomorPolisi}
              vehicleName={vehicle.vehicleName}
              vehicleType={vehicle.vehicleType}
              price={vehicle.price}
              onPress={() => selectItem(vehicle)}
              dueDate={vehicle.masaBerlakuSTNK}
            />
          );
        })}
      </ScrollView>

      <View style={styles.bottomTabContainer}>
        <Button
          type="icon-only"
          icon="icon-vehicle"
          onPress={() => navigation.navigate('VehicleList')}
        />
        <View style={styles.add}>
          <Button
            type="icon-only"
            icon="icon-add"
            onPress={() => navigation.navigate('AddVehicle')}
          />
        </View>
        <Button
          type="icon-only"
          icon="icon-profile"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backgroundImage: {
    position: 'absolute',
  },
  topIconContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
  },
  title: {
    color: colors.white,
    fontFamily: fonts.Poppins.regular,
    fontSize: 20,
    marginTop: 4,
  },
  listTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    alignItems: 'center',
    marginTop: 5,
  },
  listTitle: {
    fontFamily: fonts.Poppins.semibold,
    fontSize: 20,
    color: colors.primaryBlack,
  },
  more: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 12,
    color: colors.darkGrey,
  },
  bottomTabContainer: {
    width: '100%',
    height: 58,
    backgroundColor: colors.primaryRed,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 10,
    paddingHorizontal: 60,
  },
  add: {
    marginBottom: 15,
    left: -5,
  },
  iconBadgeStyle: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    top: -0,
    right: -10,
  },
  badgeElement: {
    color: 'white',
  },
});
