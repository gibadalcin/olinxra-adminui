import { TextField } from "@mui/material";

export default function CoordinatesFields({ latitude, setLatitude, longitude, setLongitude, disabled, isMobile }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: "1rem",
                width: "100%",
            }}
        >
            <TextField
                label="Latitude"
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
                fullWidth
                type="number"
                variant="outlined"
                disabled={disabled}
                sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff !important' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fff !important' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff !important' },
                    '& .MuiInputLabel-root': { color: '#fff' },
                    '& .MuiInputBase-input': { color: '#fff' },
                }}
                inputProps={{
                    style: { color: "#fff" }
                }}
            />
            <TextField
                label="Longitude"
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
                fullWidth
                type="number"
                variant="outlined"
                disabled={disabled}
                sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff !important' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fff !important' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff !important' },
                    '& .MuiInputLabel-root': { color: '#fff' },
                    '& .MuiInputBase-input': { color: '#fff' },
                }}
                slotProps={{
                    input: { style: { color: "#fff" } }
                }}
            />
        </div>
    );
}