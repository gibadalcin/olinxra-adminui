import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { getImages, deleteImage, uploadLogo } from "../api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import FadeIn from "../components/FadeIn";
import Loader from "../components/Loader";
import CustomButton from "../components/CustomButton";
import Copyright from "../components/Copyright";
import MainTitle from "../components/MainTitle";

export default function ImageManager() {
  const [usuario, setUsuario] = useState(null);
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [nome, setNome] = useState("");
  const [uploading, setUploading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [imgToDelete, setImgToDelete] = useState(null);
  const navigate = useNavigate();

  // Responsividade dinâmica
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 994);

  // Controle de transição do conteúdo
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 994);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUsuario(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (usuario) {
      usuario.getIdToken().then((token) => {
        getImages(token).then((res) => {
          setImagens(res.data);
          setLoading(false);
          setTimeout(() => setShowContent(true), 400); // Transição suave
        });
      });
    }
  }, [usuario]);

  const handleDelete = async (id) => {
    if (!usuario) return;
    const token = await usuario.getIdToken();
    await deleteImage(id, token);
    setImagens(imagens.filter(img => img._id !== id));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !nome || !usuario) return;
    setUploading(true);
    const token = await usuario.getIdToken();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", nome);
    try {
      const response = await uploadLogo(formData, token);
      if (!response.ok) {
        const data = await response.json();
        if (response.status === 400 && data.detail?.includes("imagem com esse nome")) {
          alert("Já existe uma imagem com esse nome!");
          setUploading(false);
          return;
        }
        alert("Erro ao enviar imagem.");
        setUploading(false);
        return;
      }
      setNome("");
      setFile(null);
      setUploading(false);
      getImages(token).then((res) => {
        setImagens(res.data);
      });
    } catch (err) {
      alert("Erro ao enviar imagem.");
      setUploading(false);
    }
  };

  const confirmDelete = async () => {
    if (!imgToDelete) return;
    await handleDelete(imgToDelete);
    setModalOpen(false);
    setImgToDelete(null);
  };

  const isAdmin = usuario?.email === import.meta.env.VITE_USER_ADMIN_EMAIL;

  return (
    <div style={{
      width: "100vw",
      minHeight: "100vh",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: "url('/login.svg')",
      backgroundPosition: "left bottom",
      backgroundRepeat: "no-repeat"
    }}>

      {/* Loader aparece junto com fundo e header */}
      {(!showContent || loading || !usuario) && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}>
          <Loader />
        </div>
      )}

      {/* Conteúdo principal aparece suavemente */}
      <FadeIn show={showContent}>
        <div style={{
          width: "100vw",
          minHeight: "100vh",
          display: showContent ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            padding: isMobile ? "1rem" : "2rem",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
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
            <MainTitle isMobile={isMobile}>Gerenciamento de Imagens</MainTitle>

            {/* Formulário de upload */}
            <form
              onSubmit={handleUpload} // <-- Adicione aqui!
              style={{
                marginTop: 0,
                marginRight: "auto",
                marginBottom: isMobile ? "1rem" : "2rem",
                marginLeft: "auto",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? ".8rem" : "1rem",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "500px"
              }}>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={e => {
                  const arquivo = e.target.files[0];
                  setFile(arquivo);
                  if (arquivo) {
                    let nomeArquivo = arquivo.name;
                    let nomeBase;
                    if (nomeArquivo.includes("_")) {
                      nomeBase = nomeArquivo.split("_")[0];
                    } else if (nomeArquivo.includes("-")) {
                      nomeBase = nomeArquivo.split("-")[0];
                    } else {
                      nomeBase = nomeArquivo.split(".")[0];
                    }
                    setNome(nomeBase);
                  }
                }}
                required
                style={{
                  background: "#fff",
                  borderRadius: "6px",
                  padding: "0.5rem",
                  width: isMobile ? "80%" : "auto",
                  border: "none",
                  fontSize: "16px"
                }}
              />
              <input
                type="text"
                placeholder="Nome da imagem"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
                style={{
                  background: "#fff",
                  borderRadius: "6px",
                  padding: "0.5rem",
                  width: isMobile ? "80%" : "auto",
                  border: "none",
                  fontSize: "16px"
                }}
              />
              <CustomButton
                type="submit"
                disabled={uploading || !file || !nome}
                style={{
                  background: "#FFD700",
                  color: "#151515",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.15)",
                  width: isMobile ? "80%" : "auto",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "rgba(255,255,255,0.90)",
                }}
              >
                {uploading ? "Enviando..." : "Enviar"}
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
            </form>

            {/* Modal de confirmação de exclusão */}
            {modalOpen && (
              <div style={{
                position: "fixed",
                width: "100vw", height: "100vh",
                background: "rgba(0,0,0,0.45)",
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 9999
              }}>
                <div style={{
                  background: "#fff",
                  borderRadius: "10px",
                  padding: "2rem",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                  minWidth: "320px",
                  textAlign: "center"
                }}>
                  <h2 style={{ color: "#d32f2f", marginBottom: "1rem" }}>Confirmar exclusão</h2>
                  {/* Imagem a ser excluída */}
                  {(() => {
                    const imgObj = imagens.find(i => i._id === imgToDelete);
                    if (!imgObj) return null;
                    return (
                      <img
                        src={imgObj.url}
                        alt={imgObj.nome}
                        style={{
                          width: "120px",
                          borderRadius: "8px",
                          marginBottom: "1rem",
                          objectFit: "cover",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.10)"
                        }}
                      />
                    );
                  })()}
                  <p>Deseja realmente excluir a imagem <b>{imagens.find(i => i._id === imgToDelete)?.nome}</b>?</p>
                  <div
                    style={{
                      marginTop: "2rem",
                      display: "flex",
                      gap: "1rem",
                      justifyContent: "center"
                    }}>
                    <CustomButton
                      onClick={confirmDelete}
                      style={{ background: "#d32f2f", color: "#fff" }}
                    >
                      Excluir
                    </CustomButton>
                    <CustomButton
                      onClick={() => { setModalOpen(false); setImgToDelete(null); }}
                      style={{
                        background: "#012E57",
                        color: "#fff",
                      }}
                    >
                      Cancelar
                    </CustomButton>
                  </div>
                </div>
              </div>
            )}
            <div style={{
              background: "rgba(255,255,255,0.24)",
              padding: isMobile ? "0.5rem" : "1.5rem",
              borderRadius: "8px",
              boxShadow: "0 4px 32px rgba(0,0,0,0.25)",
              width: "94%",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              textAlign: "center",
              margin: isMobile ? "16px auto" : "24px auto"
            }}>
              {imagens.length === 0 ? (
                <p style={{ color: "#fff", fontSize: isMobile ? "1em" : "1.2em" }}>Nenhuma imagem cadastrada.</p>
              ) : (
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: isMobile ? "1rem" : "2rem",
                  justifyContent: isMobile ? "center" : "left",
                  width: "100%",
                  maxWidth: "98%",
                  margin: "0 auto"
                }}>
                  {imagens.map(img => (
                    <div key={img._id} style={{
                      background: "rgba(255,255,255,0.10)",
                      borderRadius: "12px",
                      padding: isMobile ? "0.5rem" : "1rem",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                      minWidth: isMobile ? "120px" : "180px",
                      maxWidth: "180px",
                      width: isMobile ? "40%" : "220px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}>
                      <img src={img.url} alt={img.nome} style={{
                        width: "100%",
                        borderRadius: "8px",
                        maxHeight: isMobile ? "180px" : "220px",
                        objectFit: "cover"
                      }} />
                      <p style={{
                        color: "#fff",
                        margin: "0.5rem 0",
                        fontSize: isMobile ? "1em" : "1.1em",
                        wordBreak: "break-word"
                      }}>{img.nome}</p>
                      {(isAdmin || img.owner_uid === usuario.uid) && (
                        <CustomButton
                          onClick={() => { setModalOpen(true); setImgToDelete(img._id); }}
                          style={{
                            marginTop: "0.5rem",
                            background: "linear-gradient(90deg, #d32f2f 0%, #ff6f60 100%)",
                            color: "#fff",
                            textShadow: "0 1px 4px rgba(0,0,0,0.15)",
                            textTransform: "uppercase",
                            width: isMobile ? "80%" : "auto"
                          }}
                        >
                          Excluir
                        </CustomButton>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Copyright />
          </div>
        </div>
      </FadeIn>
    </div>
  );
}