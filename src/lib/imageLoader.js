/** @typedef {import('./types.js').DecodedImage} DecodedImage */
/** @typedef {import('./types.js').SampleImageMeta} SampleImageMeta */
/** @typedef {import('./types.js').ImageLoadError} ImageLoadError */

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/bmp", "image/webp"];
const MAX_SIZE_MB = 10;

/**
 * Existing images that can be loaded into the exhibit without uploading.
 * @type {SampleImageMeta[]}
 */
export const SAMPLE_IMAGES = [
    //TODO: put sample images here
];

/**
 * Converts a File object into a DecodedImage, which contains the raw pixel data and other metadata.
 *
 * @param {File} file
 * @param {{ maxSizeMB?: number, acceptedTypes?: string[] }} [options]
 * @returns {Promise<DecodedImage>}
 * @throws {ImageLoadError}
 */
export async function loadImage(file, options = {}) {
    const maxSizeMB = options.maxSizeMB ?? MAX_SIZE_MB;
    const acceptedTypes = options.acceptedTypes ?? ACCEPTED_TYPES;

    //error handling for unsupported file types and file size limit
    if (!acceptedTypes.includes(file.type)) {
        throw /** @type {ImageLoadError} */ ({
            code: "unsupported_type",
            mssg: `Please upload one of: ${acceptedTypes.join(", ")}.`,
        });
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
        throw /** @type {ImageLoadError} */ ({
            code: "file_too_large",
            mssg: `"${file.name}" exceeds the ${maxSizeMB}MB limit.`,
        });
    }

    const url = await toURL(file);

    try {
        const { canvas, imageData, width, height } = await toCanvas(url);
        return {
            id: crypto.randomUUID(),
            name: file.name,
            type: file.type,
            size: file.size,
            width,
            height,
            url,
            src: "upload",
            imageData,
            canvas,
        };
    } catch (err) {
        throw /** @type {ImageLoadError} */ ({
            code: "decode_failed",
            message: `Could not decode "${file.name}". The file may be corrupted.`,
        });
    }
}

/**
 * Converts a sample image metadata object into a DecodedImage, which contains the raw pixel data and other metadata.
 *
 * @param {SampleImageMeta} sample
 * @returns {Promise<DecodedImage>}
 * @throws {ImageLoadError}
 */
export async function loadSample(sample) {
    try {
        const { canvas, imageData, width, height } = await toCanvas(sample.url);
        return {
            id: crypto.randomUUID(),
            name: sample.name,
            type: inferType(sample.url),
            size: null,
            width,
            height,
            url: sample.url,
            src: "sample",
            imageData,
            canvas,
        };
    } catch (err) {
        throw /** @type {ImageLoadError} */ ({
            code: "network_error",
            message: `Could not load sample image "${sample.name}".`,
        });
    }
}

//Helpers below this line

/** @param {File} file @returns {Promise<string>} */
function toURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(/** @type {string} */ (reader.result));
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

/**
 * image to canvas conversion helper
 *
 * @param {string} src
 * @returns {Promise<{ canvas: HTMLCanvasElement, imageData: ImageData, width: number, height: number }>}
 */
function toCanvas(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            if (!ctx) return reject(new Error("Context Unavailable"));
            ctx.drawImage(img, 0, 0);
            try {
                const imageData = ctx.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
                resolve({
                    canvas,
                    imageData,
                    width: canvas.width,
                    height: canvas.height,
                });
            } catch (err) {
                reject(err);
            }
        };
        img.onerror = reject;
        img.src = src;
    });
}

/** @param {string} url @returns {string} */
function inferType(url) {
    const ext = url.split(".").pop()?.toLowerCase();
    return (
        {
            png: "image/png",
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            bmp: "image/bmp",
            webp: "image/webp",
        }[ext] ?? "application/octet-stream"
    );
}
