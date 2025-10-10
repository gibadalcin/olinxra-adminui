import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { getImages, deleteImage, uploadLogo } from "../api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Copyright from "../components/Copyright";
import MainTitle from "../components/MainTitle";
import CustomButton from "../components/CustomButton";
import FadeIn from "../components/FadeIn";

// Novos componentes modularizados
import ImageUploadForm from "../components/ImageUploadForm";
import ImageList from "../components/ImageList";
import DeleteImageModal from "../components/DeleteImageModal";

export default function ImageManager() {
  const [usuario, setUsuario] = useState(null);
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [nome, setNome] = useState("");
  const [uploading, setUploading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [imgToDelete, setImgToDelete] = useState(null);
  const [showAllAdmins, setShowAllAdmins] = useState(true);
  const navigate = useNavigate();
  const width = 994;

  // Responsividade dinâmica
  const [isMobile, setIsMobile] = useState(window.innerWidth <= width);

  // Controle de transição do conteúdo
  const [showContent, setShowContent] = useState(false);
  const [imagensLoaded, setImagensLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= width);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUsuario(user);
      if (user) {
        console.log("UID do usuário logado:", user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (usuario) {
      usuario.getIdToken().then((token) => {
        const isMaster = usuario.email === import.meta.env.VITE_USER_ADMIN_EMAIL;
        const handleResponse = (res) => {
          let imagensArray = [];
          if (Array.isArray(res.data)) {
            imagensArray = res.data;
          } else if (Array.isArray(res.data?.data)) {
            imagensArray = res.data.data;
          } else if (res.data && typeof res.data === 'object') {
            const arr = Object.values(res.data).find(v => Array.isArray(v));
            imagensArray = arr || [];
          }
          setImagens(imagensArray);
          setLoading(false);
          setImagensLoaded(true);
        };
        if (isMaster) {
          if (showAllAdmins) {
            // Mostra todas as imagens
            getImages(token).then(handleResponse).catch(() => {
              setImagens([]);
              setLoading(false);
              setImagensLoaded(true);
            });
          } else {
            // Mostra apenas as imagens do master
            getImages(token, usuario.uid).then(handleResponse).catch(() => {
              setImagens([]);
              setLoading(false);
              setImagensLoaded(true);
            });
          }
        } else {
          getImages(token, usuario.uid).then(handleResponse).catch(() => {
            setImagens([]);
            setLoading(false);
            setImagensLoaded(true);
          });
        }
      });
    }
  }, [usuario, showAllAdmins]);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 400);
  }, []);

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
      const isMaster = usuario.email === import.meta.env.VITE_USER_ADMIN_EMAIL;
      const handleResponse = (res) => {
        let imagensArray = [];
        if (Array.isArray(res.data)) {
          imagensArray = res.data;
        } else if (Array.isArray(res.data?.data)) {
          imagensArray = res.data.data;
        } else if (res.data && typeof res.data === 'object') {
          const arr = Object.values(res.data).find(v => Array.isArray(v));
          imagensArray = arr || [];
        }
        setImagens(imagensArray);
      };
      if (isMaster) {
        getImages(token).then(handleResponse);
      } else {
        getImages(token, usuario.uid).then(handleResponse);
      }
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
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#012E57",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
      className="hide-scrollbar"
    >
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
          zIndex: 9999,
          background: "#012E57",
        }}>
          <Loader />
        </div>
      )}
      {/* Botão de alternância de modo para o usuário master */}
      {usuario?.email === import.meta.env.VITE_USER_ADMIN_EMAIL && (
        <div style={{
          position: "fixed",
          top: 24,
          right: 32,
          zIndex: 10000,
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}>
          <CustomButton
            type="button"
            onClick={() => navigate('/dashboard')}
            style={{
              background: "#012E57",
              color: "#fff",
              textShadow: "0 1px 4px rgba(0,0,0,0.15)",
              border: "1px solid #fff",
            }}
          >
            Dashboard
          </CustomButton>
          <CustomButton
            type="button"
            onClick={() => setShowAllAdmins(v => !v)}
            style={{
              background: showAllAdmins ? "#FFD700" : "#012E57",
              color: showAllAdmins ? "#151515" : "#fff",
              border: "1px solid #fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            {showAllAdmins ? "Modo Master" : "Modo Admin"}
          </CustomButton>
        </div>
      )}
      <FadeIn show={showContent}>
        <div style={{
          width: "100vw",
          minHeight: "100vh",
          display: showContent ? "flex" : "none",
          flexDirection: isMobile ? "column" : "row",
        }}>
          {!isMobile && (
            <div style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}>
              <Header />
            </div>
          )}
          <div style={{
            width: '100%',
            height: '100vh',
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            textAlign: "center",
            paddingTop: isMobile ? '4rem' : '0',
          }}>
            {isMobile && <Header />}
            <MainTitle isMobile={isMobile}>Gerenciamento de Imagens</MainTitle>
            <ImageUploadForm
              file={file}
              setFile={setFile}
              nome={nome}
              setNome={setNome}
              uploading={uploading}
              handleUpload={handleUpload}
              isMobile={isMobile}
              isWide={window.innerWidth < 1600}
              onDashboardClick={() => navigate("/dashboard")}
            />
            <DeleteImageModal
              open={modalOpen}
              imgToDelete={imgToDelete}
              imagens={imagens}
              onClose={() => { setModalOpen(false); setImgToDelete(null); }}
              onConfirm={confirmDelete}
            />
            {/* Renderiza lista de imagens apenas após carregamento */}
            {imagensLoaded ? (
              <div style={{
                flex: 1,
                overflowY: "auto",
                width: isMobile ? "80vw" : "100%",
                marginTop: "1.5rem",
                marginBottom: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                background: "transparent",
                scrollbarWidth: "none",
                padding: "1rem",
              }}
                className="hide-scrollbar"
              >
                <ImageList
                  imagens={imagens}
                  isMobile={isMobile}
                  usuario={usuario}
                  isAdmin={isAdmin}
                  onDelete={(id) => { setModalOpen(true); setImgToDelete(id); }}
                  onAssociate={(imgId, ownerUid) => navigate(`/content?imageId=${imgId}&ownerId=${ownerUid}`)}
                />
              </div>
            ) : (
              <div style={{ color: "#012E57", marginTop: "2rem" }}>Carregando imagens...</div>
            )}
            <Copyright />
          </div>
        </div>
      </FadeIn>
      <div style={{
        position: "fixed",
        right: "32px",
        bottom: "32px",
        zIndex: 10001,
        boxShadow: "0 4px 16px rgba(1,46,87,0.18)",
        borderRadius: "12px"
      }}>
      </div>
    </div>);
}