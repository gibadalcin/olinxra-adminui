import { TextField } from "@mui/material";

export default function UrlInputs({ imagens, setImagens, videos, setVideos, disabled }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
            <TextField
                label="URLs das imagens (separadas por vírgula)"
                value={imagens}
                onChange={e => setImagens(e.target.value)}
                fullWidth
                disabled={disabled}
                variant="outlined"
                sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
                    '& .MuiInputLabel-root': { color: '#fff' }, // cor visível
                    '& .MuiInputBase-input': { color: '#fff' },
                }}
                slotProps={{
                    style: { color: "#fff" }
                }}
            />
            <TextField
                label="URLs dos vídeos (separadas por vírgula)"
                value={videos}
                onChange={e => setVideos(e.target.value)}
                fullWidth
                disabled={disabled}
                variant="outlined"
                sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
                    '& .MuiInputLabel-root': { color: '#fff' },
                    '& .MuiInputBase-input': { color: '#fff' },
                }}
                slotProps={{
                    style: { color: "#fff" }
                }}
            />
        </div>
    );
}