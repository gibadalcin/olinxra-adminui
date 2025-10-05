import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { getImages, deleteImage, uploadLogo } from "../api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import FadeIn from "../components/FadeIn";
import Loader from "../components/Loader";
import Copyright from "../components/Copyright";
import MainTitle from "../components/MainTitle";

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
        }}>
          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            paddingInline: isMobile ? "1rem" : "4rem",
            width: "20%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            <Header />
          </div>
          <div style={{
            padding: isMobile ? "1rem" : "2rem",
            borderRadius: "16px",
            boxShadow: "0 4px 32px rgba(0,0,0,0.25)",
            width: '100%',
            height: '100%',
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            textAlign: "center",
          }}>

            <MainTitle isMobile={isMobile}>Gerenciamento de Imagens</MainTitle>

            {/* Formulário de upload modularizado */}
            <ImageUploadForm
              file={file}
              setFile={setFile}
              nome={nome}
              setNome={setNome}
              uploading={uploading}
              handleUpload={handleUpload}
              isMobile={isMobile}
              onDashboardClick={() => navigate("/dashboard")}
            />

            {/* Modal de confirmação de exclusão modularizado */}
            <DeleteImageModal
              open={modalOpen}
              imgToDelete={imgToDelete}
              imagens={imagens}
              onClose={() => { setModalOpen(false); setImgToDelete(null); }}
              onConfirm={confirmDelete}
            />
            {/* Lista de imagens modularizada */}
            <ImageList
              imagens={imagens}
              isMobile={isMobile}
              usuario={usuario}
              isAdmin={isAdmin}
              onDelete={(id) => { setModalOpen(true); setImgToDelete(id); }}
              onAssociate={(imgId) => navigate(`/content?imageId=${imgId}&adminUid=${usuario?.uid}`)}
            />
            <Copyright />
          </div>
        </div>
      </FadeIn>
    </div>
  );
}