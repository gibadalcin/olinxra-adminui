import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";
import Copyright from "../components/Copyright";
import CustomButton from "../components/CustomButton";
import CoordinatesFields from "../components/CoordinatesFields";
import UrlInputs from "../components/URLInputs";
import { fetchMarcas } from "../api"; // Certifique-se que existe esse método
import BrandSelect from "../components/BrandSelect";

export default function Content() {
    const [marca, setMarca] = useState("");
    const [marcas, setMarcas] = useState([]);
    const [texto, setTexto] = useState("");
    const [imagens, setImagens] = useState("");
    const [videos, setVideos] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 994);
    const [loadingMarcas, setLoadingMarcas] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 994);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Carregar marcas ao abrir a página
    useEffect(() => {
        async function buscarMarcas() {
            setLoadingMarcas(true);
            try {
                const user = window.auth?.currentUser;
                if (!user) {
                    setMarcas([]);
                    setMarca("");
                    return;
                }
                const token = await user.getIdToken();
                const lista = await fetchMarcas(user.uid, token);
                setMarcas(lista || []);
                // Se houver marcas, seleciona a primeira automaticamente
                if (lista && lista.length > 0) {
                    setMarca(lista[0].nome);
                } else {
                    setMarca("");
                }
            } catch {
                setMarcas([]);
                setMarca("");
            } finally {
                setLoadingMarcas(false);
            }
        }
        buscarMarcas();
    }, []);

    const camposDesativados = !marca;

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
        setTexto("");
        setImagens("");
        setVideos("");
        setLatitude("");
        setLongitude("");
    };

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: "url('/login.svg')",
                backgroundPosition: "left bottom",
                backgroundRepeat: "no-repeat",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    width: '100vw',
                    height: "100vh",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    color: "#fff",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                <Header />
                <MainTitle isMobile={isMobile}>Cadastrar Conteúdo</MainTitle>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: isMobile ? ".8rem" : "1.5rem",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        maxWidth: isMobile ? "96vw" : "900px",
                        padding: "20px"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",
                            gap: isMobile ? "1rem" : "2rem",
                            width: "100%",
                            marginBottom: isMobile ? "0.8rem" : "1.5rem",
                        }}
                    >
                        <div style={{ flex: 1 }}>
                            <CoordinatesFields
                                latitude={latitude}
                                setLatitude={setLatitude}
                                longitude={longitude}
                                setLongitude={setLongitude}
                                disabled={camposDesativados}
                                isMobile={isMobile}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <BrandSelect
                                marca={marca}
                                setMarca={setMarca}
                                disabled={loadingMarcas || marcas.length === 0}
                            />
                        </div>
                    </div>
                    <TextField
                        label="Texto"
                        value={texto}
                        onChange={e => setTexto(e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                        disabled={camposDesativados}
                        sx={{
                            borderRadius: 2,
                            color: "#fff",
                            minHeight: "48px",
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff !important' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fff !important' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff !important' },
                            '& .MuiInputLabel-root': { color: '#fff' },
                            '& .MuiInputBase-input': { color: '#fff', minHeight: "48px", display: "flex", alignItems: "center" },
                        }}
                        slotProps={{
                            input: { style: { color: "#fff", minHeight: "48px", display: "flex", alignItems: "center" } }
                        }}
                        style={{ marginTop: 16, width: "100%" }}
                    />
                    <div style={{ width: "100%" }}>
                        <UrlInputs
                            imagens={imagens}
                            setImagens={setImagens}
                            videos={videos}
                            setVideos={setVideos}
                            disabled={camposDesativados}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",
                            gap: isMobile ? ".8rem" : "1.5rem",
                            width: "100%",
                            marginTop: 24,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <CustomButton
                            type="submit"
                            onClick={() => { }}
                            disabled={camposDesativados}
                            style={{
                                background: "#FFD700",
                                color: "#151515",
                                textShadow: "2px 2px 4px rgba(0,0,0,0.15)",
                                width: isMobile ? "90vw" : "300px",
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
                                width: isMobile ? "90vw" : "300px",
                                borderStyle: "solid",
                                borderWidth: "1px",
                                borderColor: "rgba(255,255,255,0.90)",
                            }}
                        >
                            Dashboard
                        </CustomButton>
                    </div>
                </form>
                {/* Mensagem só aparece se realmente não houver marcas cadastradas */}
                {!loadingMarcas && marcas.length === 0 && (
                    <p style={{ marginTop: 16 }}>
                        Nenhuma marca cadastrada. Cadastre uma marca para liberar o formulário.
                    </p>
                )}
                <Copyright />
            </Box>
        </div>
    );
}