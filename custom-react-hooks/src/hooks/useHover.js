import { useState, useMemo } from "react"

export const useHover = () => {
    const [isHovered, setIsHovered] = useState(false)

    const bind = useMemo(() => ({
            onMouseOver: () => setIsHovered(true),
            onMouseLeave: () => setIsHovered(false)
    }), [])

    return [isHovered, bind];
}