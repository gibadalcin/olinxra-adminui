import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchMarcas } from "../api";

export default function BrandSelect({ marca, setMarca, disabled }) {
    const [listaMarcas, setListaMarcas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function buscarMarcas() {
            setLoading(true);
            try {
                const user = window.auth?.currentUser;
                if (!user) {
                    setListaMarcas([]);
                    setMarca("");
                    return;
                }
                const token = await user.getIdToken();
                const marcas = await fetchMarcas(user.uid, token);
                setListaMarcas(marcas || []);
                // Seleciona a primeira marca automaticamente
                if (marcas && marcas.length > 0) {
                    setMarca(marcas[0].nome);
                } else {
                    setMarca("");
                }
            } catch (err) {
                setListaMarcas([]);
                setMarca("");
            } finally {
                setLoading(false);
            }
        }
        buscarMarcas();
        // eslint-disable-next-line
    }, []);

    return (
        <FormControl
            fullWidth
            variant="outlined"
            sx={{
                borderRadius: 2,
                minHeight: "48px",
                height: "48px",
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff !important' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fff !important' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff !important' },
                '& .MuiInputLabel-root': { color: '#fff' },
                '& .MuiSelect-select': { color: "#fff", minHeight: "48px", height: "48px", display: "flex", alignItems: "center" },
                '& .MuiSvgIcon-root': { color: '#fff' },
                '& .MuiInputBase-root': { color: '#fff', minHeight: "48px", height: "48px", display: "flex", alignItems: "center" },
            }}
        >
            {listaMarcas.length === 0 && (
                <InputLabel id="marca-label" sx={{ color: "#fff" }}>Marca</InputLabel>
            )}
            <Select
                labelId="marca-label"
                value={marca}
                label={listaMarcas.length === 0 ? "Marca" : ""}
                onChange={e => setMarca(e.target.value)}
                disabled={disabled || loading || listaMarcas.length === 0}
                sx={{
                    height: "48px",
                    borderRadius: 1,
                    color: "#fff",
                    backgroundColor: "transparent",
                    minHeight: "48px",
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff !important' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fff !important' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff !important' },
                    '& .MuiSvgIcon-root': { color: '#fff' },
                    '& .MuiSelect-icon': { color: '#fff' },
                    '& .MuiSelect-select': { color: '#fff', backgroundColor: 'transparent', minHeight: "48px", height: "48px", display: "flex", alignItems: "center" },
                    '& .MuiInputBase-root': { color: '#fff', minHeight: "48px", height: "48px", display: "flex", alignItems: "center" },
                }}
                inputProps={{
                    style: { color: "#fff", minHeight: "48px", height: "48px", display: "flex", alignItems: "center" },
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            backgroundColor: "#012E57", // azul escuro
                            color: "#fff"
                        }
                    }
                }}
            >
                {loading ? (
                    <MenuItem disabled>Carregando...</MenuItem>
                ) : listaMarcas.length === 0 ? (
                    <MenuItem disabled>Nenhuma marca cadastrada</MenuItem>
                ) : (
                    listaMarcas.map((m) => (
                        <MenuItem
                            key={m.id || m._id || m.nome}
                            value={m.nome}
                            sx={{
                                color: "#fff",
                                backgroundColor: "#012E57",
                                minHeight: "48px",
                                height: "48px",
                                display: "flex",
                                alignItems: "center",
                                '&.Mui-selected': {
                                    backgroundColor: "#014a8f !important",
                                    color: "#fff"
                                },
                                '&:hover': {
                                    backgroundColor: "#014a8f !important",
                                    color: "#fff"
                                }
                            }}
                        >
                            {m.nome}
                        </MenuItem>
                    ))
                )}
            </Select>
        </FormControl>
    );
}