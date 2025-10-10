import Header from "./Header";
import MainTitle from "./MainTitle";

export default function LoginHeader({ isMobile }) {
    return (
        <div style={{
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "1.5rem",
        }}>
            <Header />
            <MainTitle isMobile={isMobile}>Login</MainTitle>
        </div>
    );
}
