import { useMemo } from "react";

export default function useIsMasterAdmin({ uid = "", email = "" }) {
    const masterUid = (import.meta.env.VITE_USER_ADMIN_UID || "").trim();
    const masterEmail = (import.meta.env.VITE_USER_ADMIN_EMAIL || "").trim().toLowerCase();

    return useMemo(() => {
        const uidMatch = uid && uid.trim() === masterUid;
        const emailMatch = email && email.trim().toLowerCase() === masterEmail;
        return Boolean(uidMatch || emailMatch);
    }, [uid, email, masterUid, masterEmail]);
}