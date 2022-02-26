export const sendGif = async (inputValue, gifList, setGifList, setInputValue) => {
  if (inputValue.length > 0) {
    console.log("Gif link:", inputValue);
    setGifList([...gifList, inputValue]);
    setInputValue('');
  } else {
    console.log("Empty input. Try again.");
  }
};
