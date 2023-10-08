import useLocalStorage from "./useLocalStorage";

const useToggle = (key, initValue) => {
  const [value, setValue] = useLocalStorage(key, initValue);

  const toggle = (value) => {
    setValue(previousState => {
      return typeof value === 'boolean' ? value : !previousState;
    });
  }

  return [value, toggle];
}

export default useToggle