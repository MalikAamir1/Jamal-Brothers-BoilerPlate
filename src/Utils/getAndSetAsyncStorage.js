import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDataFromAsync = async Key => {
  try {
    let value = await AsyncStorage.getItem(Key)
      .then(res => {
        console.log('this response is in get data Function', res);
        return res;
      })
      .catch(e => console.log(e));
    return value;
  } catch (e) {
    console.log(e);
  }
};

export const setDataToAsync = async (Key, val) => {
  try {
    let value = await AsyncStorage.setItem(Key, val)
      .then(res => {
        return res;
      })
      .catch(e => console.log(e));
    return value;
  } catch (e) {
    console.log(e);
  }
};

export const removeDataToAsync = async Key => {
  try {
    let value = await AsyncStorage.removeItem(Key)
      .then(res => {
        return res;
      })
      .catch(e => console.log(e));
    return value;
  } catch (e) {
    console.log(e);
  }
};
