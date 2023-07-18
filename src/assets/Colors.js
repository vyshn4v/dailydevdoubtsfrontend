import { useSelector } from "react-redux"
const UseColors = () => {
    const dark = useSelector(state => state.user?.isDarkMode)
    const bgColor = dark ? "#FFFFFF" : "#0A1929"
    const fontColor = dark ? "#0A1929" : "#FFFFFF"
    const cardBg = dark ? "rgba(0, 0, 0, 0.07)" : 'rgba(255, 255, 255, 0.05)'
    const drawerBg = dark ? "rgba(0, 0, 0, 0.07)" : 'rgba(255, 255, 255, 0.05)'
    const buttonColor = dark ? "rgba(0, 0, 0, 0.07)" : "rgba(255, 255, 255, 0.05)"
    const headerColor = dark ? "rgba(0, 0, 0, 0.07)" : "#0A1929"

    return {
        bgColor,
        fontColor,
        cardBg,
        drawerBg,
        buttonColor,
        headerColor
    }
}
export default UseColors