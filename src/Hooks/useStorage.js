import AsyncStorage from '@react-native-async-storage/async-storage';

 const useStorage = () => {
    const storeData = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value)
        } catch (e) {
          // saving error
        }
      }
    const getData = async (key) => {
        try {
            return await AsyncStorage.getItem(key)
        } catch(e) {
            // error reading value
        }
    }
   return { storeData, getData };
 };
 
 export default useStorage;