import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";
import Copyright from "../components/Copyright";
import CustomButton from "../components/CustomButton";
import CoordinatesFields from "../components/CoordinatesFields";
import UrlInputs from "../components/URLInputs";
import { fetchMarcas, fetchImagesByOwner } from "../api"; // Certifique-se que existe esse método
import BrandSelect from "../components/BrandSelect";
import { IoArrowBackOutline } from "react-icons/io5";

export default function Content({ isMaster, ownerId, imageId }) {
    const [marca, setMarca] = useState("");
    const [marcas, setMarcas] = useState([]);
    const [texto, setTexto] = useState("");
    const [imagens, setImagens] = useState([]); // array de URLs
    const [imagensInput, setImagensInput] = useState(""); // string para o input
    const [videos, setVideos] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 994);
    const [loadingMarcas, setLoadingMarcas] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 994);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Carregar marcas do dono da imagem (sempre ownerId)
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
                // Sempre usa ownerId, nunca adminUid
                const lista = ownerId ? await fetchMarcas(ownerId, token) : await fetchMarcas(user.uid, token);
                setMarcas(lista || []);
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
    }, [ownerId, imageId]);

    // Carregar imagens do dono da imagem (sempre ownerId)
    useEffect(() => {
        setImagens([]);
        setImagensInput("");
        async function buscarImagens() {
            setLoading(true);
            try {
                const user = window.auth?.currentUser;
                if (!user) {
                    setImagens([]);
                    setImagensInput("");
                    return;
                }
                const token = await user.getIdToken();
                let imagensArray = [];
                if (isMaster && ownerId) {
                    const imgs = await fetchImagesByOwner(ownerId, token);
                    imagensArray = imgs.map(img => img.url);
                } else {
                    const imgs = await fetchImagesByOwner(user.uid, token);
                    imagensArray = imgs.map(img => img.url);
                }
                setImagens(imagensArray);
                // Monta string para o input mostrando apenas os nomes dos arquivos
                const nomes = imagensArray.map(url => {
                    try {
                        const urlObj = new URL(url);
                        return urlObj.pathname.split('/').pop();
                    } catch {
                        return url;
                    }
                });
                setImagensInput(nomes.join(", "));
            } finally {
                setLoading(false);
            }
        }
        buscarImagens();
    }, [isMaster, ownerId, imageId]);

    const camposDesativados = !marca;

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("/api/conteudo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome_marca: marca,
                texto,
                imagens: Array.isArray(imagens) ? imagens : [],
                videos: videos.split(",").map(v => v.trim()).filter(Boolean),
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
            }),
        });
        alert("Conteúdo cadastrado!");
        setTexto("");
        setImagens([]);
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
                backgroundPosition: "right bottom",
                backgroundRepeat: "no-repeat",
                overflow: "hidden",
                position: "relative"
            }}
        >
            {/* Ícone de voltar no canto superior esquerdo */}
            <button
                onClick={() => navigate("/images")}
                style={{
                    position: "absolute",
                    top: 24,
                    left: isMobile ? 8 : 32,
                    zIndex: 10000,
                    background: "none",
                    border: "none",
                    borderRadius: 0,
                    width: "auto",
                    height: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "none",
                    transition: "background 0.2s"
                }}
                title="Voltar para gerenciamento de imagens"
            >
                <IoArrowBackOutline size={isMobile ? 44 : 54} color="#ffffff" />
            </button>
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
                    paddingTop: isMobile ? "1rem" : "4rem",
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
                                marcas={marcas}
                                loading={loadingMarcas}
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
                            imagens={imagensInput}
                            setImagens={val => {
                                // O usuário pode digitar nomes, mas para envio precisamos manter os URLs
                                setImagensInput(val);
                                // Não altera o array de URLs ao digitar, só ao buscar
                            }}
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