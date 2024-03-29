import { useLocalStorage } from "./useLocalStorage"
import { useEffect } from "react";

export const useTheme = () => {
    const [theme, setTheme] = useLocalStorage({key: 'theme', value: 'light'});

    useEffect(() => {
        document.body.className = '';
        document.body.classList.add(theme);
    }, [theme]);

    return [theme, setTheme];
}