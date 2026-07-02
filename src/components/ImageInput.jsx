/** @typedef {import('../lib/types.js').DecodedImage} DecodedImage */
/** @typedef {import('../lib/types.js').ImageLoadError} ImageLoadError */

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, ImageIcon, AlertCircle } from "lucide-react";
import { loadImage, loadSample, SAMPLE_IMAGES } from "../lib/ImageLoader.js";

/**
 * A React component that allows users to upload an image file or select a sample image. It handles image decoding and error reporting.
 *
 * @param {{
 *   onImageLoad: (image: DecodedImage) => void,
 *   onError?: (error: ImageLoadError) => void,
 *   maxFileSizeMB?: number,
 *   acceptedTypes?: string[],
 * }} props
 */
export default function inputImage({
    onImageLoad,
    onError,
    maxFileSizeMB = 10,
    acceptedTypes,
}) {
    const [isDecoding, setIsDecoding] = useState(false);
    const [localError, setLocalError] = useState(
        /** @type {ImageLoadError|null} */ (null)
    );

    const handleError = useCallback(
        /** @param {ImageLoadError} err */
        (err) => {
            setLocalError(err);
            onError?.(err);
        },
        [onError]
    );

    const onDrop = useCallback(
        /** @param {File[]} acceptedFiles @param {any[]} rejectedFiles */
        async (acceptedFiles, rejectedFiles) => {
            setLocalError(null);

            if (rejectedFiles?.length) {
                handleError({
                    code: "unsupported_type",
                    message: `"${rejectedFiles[0].file.name}" isn't a supported image type.`,
                });
                return;
            }

            const file = acceptedFiles[0];
            if (!file) return;

            setIsDecoding(true);
            try {
                const image = await loadImage(file, {
                    maxFileSizeMB,
                    acceptedTypes,
                });
                onImageLoad(image);
            } catch (err) {
                handleError(/** @type {ImageLoadError} */ (err));
            } finally {
                setIsDecoding(false);
            }
        },
        [maxFileSizeMB, acceptedTypes, onImageLoad, handleError]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: Object.fromEntries(
            (
                acceptedTypes ?? [
                    "image/png",
                    "image/jpeg",
                    "image/bmp",
                    "image/webp",
                ]
            ).map((t) => [t, []])
        ),
    });

    /** @param {typeof SAMPLE_IMAGES[number]} sample */
    async function handleSampleClick(sample) {
        setLocalError(null);
        setIsDecoding(true);
        try {
            const image = await loadSample(sample);
            onImageLoad(image);
        } catch (err) {
            handleError(/** @type {ImageLoadError} */ (err));
        } finally {
            setIsDecoding(false);
        }
    }

    return (
        <div className="w-full max-w-xl mx-auto space-y-4">
            <div
                {...getRootProps()}
                className={[
                    "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center cursor-pointer transition-colors",
                    isDragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400",
                ].join(" ")}
            >
                <input {...getInputProps()} />
                <UploadCloud
                    className="w-8 h-8 text-gray-400"
                    aria-hidden="true"
                />
                <p className="text-sm text-gray-600">
                    {isDecoding
                        ? "Decoding…"
                        : isDragActive
                        ? "Drop the image here"
                        : "Drag an image here, or click to browse"}
                </p>
                <p className="text-xs text-gray-400">
                    PNG, JPG/JPEG, BMP, WEBP — up to {maxFileSizeMB}MB
                </p>
            </div>

            {localError && (
                <div className="flex items-start gap-2 rounded-md bg-red-50 p-3 text-sm text-red-700">
                    <AlertCircle
                        className="w-4 h-4 mt-0.5 shrink-0"
                        aria-hidden="true"
                    />
                    <span>{localError.message}</span>
                </div>
            )}

            <div>
                <p className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-600">
                    <ImageIcon className="w-4 h-4" aria-hidden="true" />
                    Or try a sample
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {SAMPLE_IMAGES.map((sample) => (
                        <button
                            key={sample.id}
                            type="button"
                            onClick={() => handleSampleClick(sample)}
                            disabled={isDecoding}
                            title={sample.description}
                            className="rounded-md border border-gray-200 p-2 text-xs text-gray-600 hover:border-gray-400 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                        >
                            {sample.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
