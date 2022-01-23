import AsyncStorage from '@react-native-async-storage/async-storage';

 const useStorage = () => {
    const storeData = (key, value) => {
        try {
           AsyncStorage.setItem(key, value)
        } catch (e) {
          alert(5);
        }
      }
    const getData = async (key) => {
        try {
            return await AsyncStorage.getItem(key)
        } catch(e) {
            console.log(e)
        }
    }
   return { storeData, getData };
 };
 
 export default useStorage;
