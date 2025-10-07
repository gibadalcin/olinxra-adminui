import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { getImages, deleteImage, uploadLogo } from "../api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Copyright from "../components/Copyright";
import MainTitle from "../components/MainTitle";
import CustomButton from "../components/CustomButton";

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
  const navigate = useNavigate();

  // Responsividade dinâmica
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 994);

  // Controle de transição do conteúdo
  const [showContent, setShowContent] = useState(false);

  // Controle de exibição de imagens dos demais admins (apenas para master)
  const [showAllAdmins, setShowAllAdmins] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 994);
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
          setTimeout(() => setShowContent(true), 400);
        };
        if (isMaster) {
          if (showAllAdmins) {
            // Mostra todas as imagens
            getImages(token).then(handleResponse).catch(() => {
              setImagens([]);
              setLoading(false);
            });
          } else {
            // Mostra apenas as imagens do master
            getImages(token, usuario.uid).then(handleResponse).catch(() => {
              setImagens([]);
              setLoading(false);
            });
          }
        } else {
          getImages(token, usuario.uid).then(handleResponse).catch(() => {
            setImagens([]);
            setLoading(false);
          });
        }
      });
    }
  }, [usuario, showAllAdmins]);

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
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url('/login.svg')",
          backgroundPosition: "right 20% top 50%",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
          position: "relative",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="hide-scrollbar"
      >
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
            zIndex: 9999,
            background: "rgba(255,255,255,0.7)",
            transition: "background 0.2s"
          }}>
            <Loader />
          </div>
        )}
        {/* Botão para master admin mostrar/esconder imagens dos demais admins */}
        {usuario?.email === import.meta.env.VITE_USER_ADMIN_EMAIL && (
          <CustomButton
            type="button"
            onClick={() => setShowAllAdmins(v => !v)}
            style={{
              position: "fixed",
              top: 24,
              right: 32,
              zIndex: 10000,
              background: showAllAdmins ? "#FFD700" : "#012E57",
              color: showAllAdmins ? "#151515" : "#fff",
              border: "1px solid #fff",
              borderRadius: "8px",
              padding: "0.7rem 1.2rem",
              fontWeight: "bold",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
              scrollbarWidth: "none",
            }}
          >
            {showAllAdmins ? "Modo Master" : "Modo Admin"}
          </CustomButton>
        )}
        {/* Conteúdo principal aparece imediatamente, sem FadeIn para priorizar LCP */}
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
            padding: isMobile ? "2rem 0" : "2rem",
            width: '100%',
            height: '100vh',
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            textAlign: "center",
            paddingTop: isMobile ? 0 : 100,
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
            <div style={{
              width: "100%",
              flex: 1,
              overflowY: "auto",
              maxHeight: isMobile ? "100vh" : "100vh",
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
                onAssociate={(imgId) => navigate(`/content?imageId=${imgId}&ownerId=${usuario?.uid}`)}
              />
            </div>
            <Copyright />
          </div>
        </div>
      </div>
      <div style={{
        position: "fixed",
        right: "32px",
        bottom: "32px",
        zIndex: 10001,
        boxShadow: "0 4px 16px rgba(1,46,87,0.18)",
        borderRadius: "12px"
      }}>
        <CustomButton
          type="button"
          onClick={() => navigate('/dashboard')}
          style={{
            background: "#012E57",
            color: "#fff",
            textShadow: "0 1px 4px rgba(0,0,0,0.15)",
            minWidth: "120px",
            padding: "0.8rem 1.6rem",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "rgba(255,255,255,0.90)",
            fontWeight: "bold",
            fontSize: "1.08em",
            borderRadius: "12px",
            cursor: "pointer"
          }}
        >
          Dashboard
        </CustomButton>
      </div>
    </>
  );
}