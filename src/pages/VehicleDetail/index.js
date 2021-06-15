import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Value} from 'react-native-reanimated';
import {colors, fonts, IconEdit, IMGStnk, IconPlus} from '../../assets';
import {Button, TopBar} from '../../components';
// import AddPicture from './AddPicture';
import VehicleDetailContent from './VehicleDetailContent';
import NumberFormat from 'react-number-format';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {getImage, addPhotos, updateVehicle} from '../../redux/action';
import axios from 'axios';

const AddPicture = ({text, type, vehicle}) => {
  const VehicleDetailReducer = useSelector(state => state.VehicleDetailReducer);
  const UpdateVehicleReducer = useSelector(state => state.UpdateVehicleReducer);
  console.log('VehicleDetailReducer di screen : ', VehicleDetailReducer);
  // const DashboardReducer = useSelector(state => state.DashboardReducer);
  console.log('Vehicle di addpicture: ', vehicle);
  const dispatch = useDispatch();
  const [image, setImage] = useState({});
  const [vehicleData, setVehicleData] = useState({vehicle});

  const openLibrary = () => {
    const options = {
      includeBase64: true,
    };
    dispatch(updateVehicle(vehicle));
    launchImageLibrary(options, response => {
      console.log('response: ', response.assets);
      setImage(response);
      dispatch(getImage(response));
      const data = JSON.stringify(response.assets[0].base64);
      // const data = JSON.stringify('wkwkwkwkkwwk');
      console.log('json stringify: ', data);
      vehicle.fotoMotor = data;
      console.log('vehicle setelah update fotomotor: ', vehicle);
      axios
        .put('http://10.0.2.2:3004/vehicles/' + vehicle.id, vehicle, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          console.log('post success: ', response);
        });
      // .catch(error => {
      //   console.log('err: ', error);
      // });
    });
  };
  if (image.assets) {
    return (
      <View>
        <TouchableOpacity
          style={styles.addPicture}
          // onPress={() => openLibrary()}>
          onPress={openLibrary}>
          <Image
            source={{uri: `data:image/png;base64,${vehicle.fotoMotor}`}}
            style={{width: 100, height: 100}}
          />
          {/* <IconPlus style={styles.iconPlus} />
          <Text style={styles.addPictureText}>{text}</Text> */}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View>
        <TouchableOpacity
          style={styles.addPicture}
          // onPress={() => openLibrary()}>
          onPress={openLibrary}>
          {/* <Image source={data.assets} style={{width: 100, height: 100}} /> */}
          <IconPlus style={styles.iconPlus} />
          <Text style={styles.addPictureText}>{text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const VehicleDetail = ({navigation, route}) => {
  const {vehicle} = route.params;
  const DashboardReducer = useSelector(state => state.DashboardReducer);
  return (
    <SafeAreaView style={styles.page}>
      <TopBar title="Rincian Kendaraan" onBack={() => navigation.goBack()} />
      <View style={styles.contentContainer}>
        <View style={styles.pictureWrapper}>
          <Text style={styles.title}>Foto Kendaraan</Text>
          <View style={styles.pictureContainer}>
            <AddPicture text="Foto Pertama" type={1} vehicle={vehicle} />
            {/* <AddPicture text="Foto Kedua" type={2} />
            <AddPicture text="Foto Ketiga" type={3} /> */}
          </View>
          <View style={styles.taxInformationContainer}>
            <View>
              <View style={styles.documentPictureContainer}>
                <Text style={styles.doucmentPictureTitle}>Foto STNK</Text>
                <Image source={IMGStnk} />
              </View>
              <View style={styles.paymentDueTitleContainer}>
                <Text style={styles.paymentDueText}>Pembayaran sebelum</Text>
              </View>
            </View>
            <View>
              <View style={styles.paymentTitleContainer}>
                <Text style={styles.paymentTitle}>
                  JUMLAH YANG HARUS DIBAYAR
                </Text>
              </View>
              <View style={styles.paymentTotalContainer}>
                <Text style={styles.paymentTotal}>Rp</Text>
                <NumberFormat
                  value={DashboardReducer.vehicles[vehicle.id - 1].price}
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={value => (
                    <Text style={styles.paymentTotal}>{value}</Text>
                  )}
                />
              </View>
              <View style={styles.paymentDueDateContainer}>
                <Text style={styles.paymentDueText}>
                  {DashboardReducer.vehicles[vehicle.id - 1].masaBerlakuSTNK}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.vehicleDetailContainer}>
            <Text style={styles.title}>Nama Kendaraan</Text>
            <View>
              <View style={styles.textInputContainer}>
                <TextInput placeholder="Berikan nama untuk kendaraan anda" />
                <IconEdit />
              </View>
              <View style={styles.vehicleDetailSubContainer}>
                <View style={styles.column}>
                  <VehicleDetailContent
                    title="NOMOR MESIN"
                    content={
                      DashboardReducer.vehicles[vehicle.id - 1].nomorMesin
                    }
                  />
                  <VehicleDetailContent
                    title="TAHUN PEMBUATAN"
                    content={vehicle.tahunPembuatan}
                  />
                  <VehicleDetailContent
                    title="TYPE"
                    content={DashboardReducer.vehicles[vehicle.id - 1].type}
                  />
                </View>
                <View style={styles.column}>
                  <VehicleDetailContent
                    title="NOMOR POLISI"
                    content={
                      DashboardReducer.vehicles[vehicle.id - 1].nomorPolisi
                    }
                  />
                  <VehicleDetailContent
                    title="MASA BERLAKU STNK"
                    content={
                      DashboardReducer.vehicles[vehicle.id - 1].masaBerlakuSTNK
                    }
                  />
                  <VehicleDetailContent
                    title="SERI"
                    content={DashboardReducer.vehicles[vehicle.id - 1].seri}
                  />
                </View>
              </View>
              <View>
                <Button label="Simpan" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VehicleDetail;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pictureWrapper: {
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.Poppins.medium,
    color: colors.darkGrey,
    marginBottom: 15,
  },
  pictureContainer: {
    flexDirection: 'row',
  },
  image: {
    height: 100,
    width: 100,
    marginRight: 10,
  },
  taxInformationContainer: {
    backgroundColor: colors.lightGrey,
    width: '100%',
    height: 110,
    marginTop: 44,
    borderRadius: 8,
    flexDirection: 'row',
  },
  documentPictureContainer: {
    height: 85,
    width: 117,
    backgroundColor: colors.lightGrey,
    borderTopLeftRadius: 8,
    borderRightWidth: 4,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doucmentPictureTitle: {
    fontSize: 12,
    fontFamily: fonts.Poppins.medium,
    color: colors.darkGrey,
  },
  paymentDueTitleContainer: {
    backgroundColor: colors.lightGrey,
    flex: 1,
    width: 117,
    borderBottomLeftRadius: 8,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentDueText: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 9,
    color: colors.darkGrey,
  },
  paymentTitleContainer: {
    height: 85 / 2,
    width: 246,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentTitle: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 14,
    color: colors.darkGrey,
  },
  paymentTotalContainer: {
    height: 85 / 2,
    width: 246,
    borderTopColor: colors.white,
    borderTopWidth: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 7,
  },
  paymentTotal: {
    fontSize: 18,
    fontFamily: fonts.Poppins.medium,
    color: colors.darkGrey,
  },
  paymentDueDateContainer: {
    width: 246,
    flex: 1,
    borderBottomRightRadius: 8,
    borderTopColor: colors.white,
    borderTopWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: colors.lightGrey,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  vehicleDetailSubContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },

  addPicture: {
    height: 100,
    width: 100,
    backgroundColor: colors.lightGrey,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  addPictureText: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 12,
    color: colors.white,
    position: 'absolute',
    bottom: 13,
  },
});
