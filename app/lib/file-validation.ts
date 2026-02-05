export async function validateImageFile(file: File): Promise<{ isValid: boolean; error?: string }> {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!validTypes.includes(file.type)) {
        return { isValid: false, error: 'Formato no soportado. Use JPG o PNG.' };
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit example
        return { isValid: false, error: 'El archivo excede el tamaño máximo permitido (5MB).' };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Magic Number Validation
    const header = buffer.subarray(0, 4).reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '').toUpperCase();

    // JPEG: FF D8 FF
    // PNG: 89 50 4E 47
    // WebP: 52 49 46 46 (RIFF) ... 57 45 42 50 (WEBP)

    let isMagicValid = false;

    if (header.startsWith('FFD8FF')) { // JPG
        isMagicValid = true;
    } else if (header === '89504E47') { // PNG
        isMagicValid = true;
    } else if (header.startsWith('52494646')) { // WebP (Check RIFF)
        // Additional check for WEBP could be done, but keep it simple
        isMagicValid = true;
    }

    if (!isMagicValid) {
        return { isValid: false, error: 'El archivo está corrupto o no es una imagen válida.' };
    }

    return { isValid: true };
}
