import React, { useState, useEffect } from "react";
import { Input, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";
import FadeIn from "../components/FadeIn";
import Copyright from "../components/Copyright";
import CustomButton from "../components/CustomButton";

export default function Content() {
    const [marca, setMarca] = useState("");
    const [texto, setTexto] = useState("");
    const [imagens, setImagens] = useState("");
    const [videos, setVideos] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [showContent, setShowContent] = useState(false);
    const isMobile = window.innerWidth <= 994;
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => setShowContent(true), 400);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("/api/conteudo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome_marca: marca,
                texto,
                imagens: imagens.split(","),
                videos: videos.split(","),
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
            }),
        });
        alert("Conteúdo cadastrado!");
        setMarca("");
        setTexto("");
        setImagens("");
        setVideos("");
        setLatitude("");
        setLongitude("");
    };

    return (
        <div style={{
            width: "100vw",
            minHeight: "100vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: "url('/login.svg')",
            backgroundPosition: "left top",
            backgroundRepeat: "no-repeat",
        }}>
            <FadeIn show={showContent}>
                <div style={{
                    width: "100vw",
                    minHeight: "100vh",
                    display: showContent ? "flex" : "none",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <div style={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "8px",
                        padding: isMobile ? "1rem" : "2rem",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        border: "1px solid rgba(255,255,255,0.18)",
                        backdropFilter: "blur(18px)",
                        WebkitBackdropFilter: "blur(18px)",
                        width: "80%",
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Header />
                        <MainTitle isMobile={isMobile}>Cadastrar Conteúdo</MainTitle>
                        <form
                            onSubmit={handleSubmit}
                            style={{
                                marginBottom: isMobile ? "1rem" : "2rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: isMobile ? ".8rem" : "1rem",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                maxWidth: "500px",
                                margin: "0 auto"
                            }}
                        >
                            <Input
                                placeholder="Marca"
                                value={marca}
                                onChange={e => setMarca(e.target.value)}
                                fullWidth
                            />
                            <Input
                                placeholder="Latitude"
                                value={latitude}
                                onChange={e => setLatitude(e.target.value)}
                                fullWidth
                                type="number"
                            />
                            <Input
                                placeholder="Longitude"
                                value={longitude}
                                onChange={e => setLongitude(e.target.value)}
                                fullWidth
                                type="number"
                            />
                            <TextField
                                label="Texto"
                                value={texto}
                                onChange={e => setTexto(e.target.value)}
                                multiline
                                rows={4}
                                fullWidth
                                style={{ marginTop: 16 }}
                            />
                            <Input
                                placeholder="URLs das imagens (separadas por vírgula)"
                                value={imagens}
                                onChange={e => setImagens(e.target.value)}
                                fullWidth
                            />
                            <Input
                                placeholder="URLs dos vídeos (separadas por vírgula)"
                                value={videos}
                                onChange={e => setVideos(e.target.value)}
                                fullWidth
                            />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: isMobile ? "column" : "row",
                                    gap: isMobile ? ".8rem" : "1rem",
                                    width: "100%",
                                    marginTop: 24,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <CustomButton
                                    type="submit"
                                    onClick={() => { }}
                                    style={{
                                        background: "#FFD700",
                                        color: "#151515",
                                        textShadow: "2px 2px 4px rgba(0,0,0,0.15)",
                                        width: isMobile ? "80%" : "auto",
                                        borderStyle: "solid",
                                        borderWidth: "1px",
                                        borderColor: "rgba(255,255,255,0.90)",
                                    }}>
                                    Salvar Conteúdo
                                </CustomButton>
                                <CustomButton
                                    type="button"
                                    onClick={() => navigate("/dashboard")}
                                    style={{
                                        background: "#012E57",
                                        color: "#fff",
                                        textShadow: "0 1px 4px rgba(0,0,0,0.15)",
                                        width: isMobile ? "80%" : "auto",
                                        borderStyle: "solid",
                                        borderWidth: "1px",
                                        borderColor: "rgba(255,255,255,0.90)",
                                    }}
                                >
                                    Dashboard
                                </CustomButton>
                            </div>
                        </form>
                        <Copyright />
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}