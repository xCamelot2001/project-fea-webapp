import { useState } from "react";

const useEmotion = (initialEmotion = 'neutral') => {

    const [emotion, setEmotion] = useState("");
    return { emotion, setEmotion };
    }