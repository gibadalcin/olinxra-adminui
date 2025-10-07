import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { TextField, Button } from "@mui/material";

export default function LocationPicker({ latitude, longitude, setLatitude, setLongitude }) {
    const [address, setAddress] = useState("");

    function LocationMarker() {
        useMapEvents({
            click(e) {
                setLatitude(e.latlng.lat.toFixed(6));
                setLongitude(e.latlng.lng.toFixed(6));
            }
        });
        return latitude && longitude ? (
            <Marker position={[parseFloat(latitude), parseFloat(longitude)]} />
        ) : null;
    }

    // Busca de endereço via Nominatim (OpenStreetMap)
    async function handleSearch() {
        if (!address) return;
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        const data = await res.json();
        if (data[0]) {
            setLatitude(data[0].lat);
            setLongitude(data[0].lon);
        }
    }

    return (
        <div style={{ width: "100%" }}>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <TextField
                    label="Endereço ou local"
                    variant="outlined"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff !important' },
                        '& .MuiInputLabel-root': { color: '#fff' },
                        '& .MuiInputBase-input': { color: '#fff' },
                    }}
                    slotProps={{ style: { color: "#fff" } }}
                />
                <Button
                    variant="contained"
                    onClick={handleSearch}
                    sx={{
                        color: "#fff",
                        borderColor: "#fff",
                        height: "56px"
                    }}
                >
                    Buscar
                </Button>
            </div>
            <div style={{ height: "220px", width: "100%", marginBottom: "0.5rem" }}>
                <MapContainer
                    center={[latitude || -15.7801, longitude || -47.9292]}
                    zoom={latitude && longitude ? 15 : 4}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker />
                </MapContainer>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
                <TextField
                    label="Latitude"
                    variant="outlined"
                    value={latitude}
                    onChange={e => setLatitude(e.target.value)}
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff !important' },
                        '& .MuiInputLabel-root': { color: '#fff' },
                        '& .MuiInputBase-input': { color: '#fff' },
                    }}
                    slotProps={{ style: { color: "#fff" } }}
                />
                <TextField
                    label="Longitude"
                    variant="outlined"
                    value={longitude}
                    onChange={e => setLongitude(e.target.value)}
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff !important' },
                        '& .MuiInputLabel-root': { color: '#fff' },
                        '& .MuiInputBase-input': { color: '#fff' },
                    }}
                    slotProps={{ style: { color: "#fff" } }}
                />
            </div>
        </div>
    );
}