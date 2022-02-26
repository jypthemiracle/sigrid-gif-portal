import { SIGRID_GIFS } from "../assets/SIGRID_GIFS";
import { sendGif } from "./sendGif";

export const RenderConnectedContainer = ({inputValue, setInputValue, gifList, setGifList}) => (
    <div className="connected-container">
        {/* submit your gifs */}
        <form onSubmit={(event) => {
            event.preventDefault();
            sendGif(inputValue.value, gifList, setGifList, setInputValue)
        }}>
            {/* https://stackoverflow.com/questions/41650512/input-field-is-not-editable-in-reactjs */}
            <input type="text" placeholder="Enter Sigrid gif link!" value={inputValue.value || ''} onChange={(event => { setInputValue({ value: event.target.value } )})}/>
            <button type="submit" className="cta-button submit-gif-button">Submit</button>
        </form>
        
        {/* pre-hardcoded gifs */}
        <div className="gif-grid">
            {gifList.map(gif => (
                <div className="gif-item" key={gif}>
                    <img src={gif} alt={gif}></img>
                </div>
            ))}
        </div>
    </div>
);
