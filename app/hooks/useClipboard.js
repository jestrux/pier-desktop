import { useCallback } from "react";

export default function useClipboard() {
    const askPermission = useCallback(async (queryName) => {
        try {
            const permissionStatus = await navigator.permissions.query(
                queryName
            );
            return permissionStatus.state === "granted";
        } catch (error) {
            // Browser compatibility / Security error (ONLY HTTPS) ...
            return false;
        }
    }, []);

    const read = useCallback(async () => {
        const hasReadPermission = await askPermission({
            name: "clipboard-read",
        });
        if (hasReadPermission) {
            const content = await navigator.clipboard.readText();
            return content;
        }
    }, [askPermission]);

    const write = useCallback(
        async (blob) => {
            const hasWritePermission = await askPermission({
                name: "clipboard-write",
            });
            if (hasWritePermission) {
                const content = [new ClipboardItem({ [blob.type]: blob })];
                await navigator.clipboard.write(content);
                return;
            }
        },
        [askPermission, read]
    );

    return { read, write };
}
