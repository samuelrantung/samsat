import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  colors,
  fonts,
  IMGBapenda,
  IMGFik,
  IMGJasaRaharja,
  IMGPemprov,
  IMGSatlantas,
  IMGUnklab,
  storeData,
} from '../../assets';
import {useForm} from '../../assets/useForm';
import {Gap, TextInput, Button, Loading} from '../../components';
import {firebase} from '../../config';
import {showError} from '../../utils/showMessage';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const onContinue = () => {
    console.log(form);

    firebase
      .auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(success => {
        setLoading(false);
        setForm('reset');
        const data = {
          email: form.email,
          uid: success.user.uid,
        };
        console.log('wkwkwkwkwk');
        firebase
          .database()
          .ref('users/' + success.user.uid + '/')
          .set(data);
        console.log('data: ', data);
        storeData('user', data);
        navigation.navigate('Login', data);
      })
      .catch(error => {
        setLoading(false);
        showError(error.message);
        console.log(error.message);
      });
  };

  return (
    <>
      <SafeAreaView style={styles.page}>
        <Gap height={20} />

        <Image source={IMGBapenda} style={styles.bapenda} />
        <Gap height={30} />
        <Text style={styles.mainTitle}>SELAMAT DATANG</Text>
        <Text style={styles.subTitle}>Aplikasi Pengingat Pembayaran Pajak</Text>
        <Gap height={45} />
        <TextInput
          title="No. Ponsel atau Email"
          paddingHorizontal={55}
          value={form.email}
          onChangeText={value => setForm('email', value)}
        />
        <Gap height={26} />
        <TextInput
          title="Password"
          paddingHorizontal={55}
          value={form.password}
          onChangeText={value => setForm('password', value)}
          secureTextEntry={true}
        />
        <Gap height={10} />
        <View style={styles.passwordExtrasContainer}>
          {/* <View style={styles.checkBoxContainer}>
          <CheckBox label="Ingat" />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgetPasswordText}>Lupa Password?</Text>
        </TouchableOpacity> */}
        </View>
        <Gap height={40} />
        <Button label="Daftar" onPress={onContinue} />
        <Gap height={10} />
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Sudah memiliki akun? </Text>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.registerButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image source={IMGFik} style={styles.fik} />
          <Image source={IMGSatlantas} style={styles.satlantas} />
          <Image source={IMGPemprov} style={styles.pemprov} />
          <Image source={IMGJasaRaharja} style={styles.jasaraharja} />
          <Image source={IMGUnklab} style={styles.unklab} />
        </View>
      </SafeAreaView>
      {loading && <Loading />}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  bapenda: {
    width: 250,
    height: 77.63,
  },
  logoContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 35,
    paddingHorizontal: 15,
  },
  satlantas: {
    width: 48,
    height: 43,
  },
  pemprov: {
    width: 45,
    height: 43,
  },
  jasaraharja: {
    height: 47,
    width: 43,
  },
  fik: {
    height: 43,
    width: 34,
  },
  unklab: {
    height: 43,
    width: 43,
  },
  mainTitle: {
    fontSize: 36,
    color: colors.primaryRed,
    fontFamily: fonts.Poppins.semibold,
  },
  subTitle: {
    fontSize: 17,
    color: colors.primaryRed,
    fontFamily: fonts.Poppins.regular,
    top: -15,
  },
  passwordExtrasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 66,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxLabel: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 12,
    color: colors.primaryBlack,
  },
  forgetPasswordText: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 12,
    color: colors.primaryBlack,
  },
  registerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  registerText: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 14,
    color: colors.primaryBlack,
  },
  registerButton: {
    justifyContent: 'center',
  },
  registerButtonText: {
    fontFamily: fonts.Poppins.bold,
    fontSize: 14,
    color: colors.primaryBlack,
  },
});
