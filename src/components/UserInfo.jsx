import React from "react";
import CustomButton from "./CustomButton";

export default function UserInfo({ usuario, isMobile }) {
    return (
        <>
            <p style={{ color: "#fff", fontSize: isMobile ? "1em" : "1.1em" }}>
                <strong>E-mail:</strong> {usuario?.email}
            </p>
            {usuario?.photoURL && (
                <img
                    src={usuario.photoURL}
                    alt="Avatar"
                    style={{
                        borderRadius: "50%",
                        width: isMobile ? "60px" : "80px",
                        margin: "1rem auto",
                    }}
                />
            )}
        </>
    );
}
