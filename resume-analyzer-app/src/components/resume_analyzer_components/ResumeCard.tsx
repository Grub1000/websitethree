import { useEffect, useState } from "react";

// Resume Service Methods Imports
import {getResumeThumbnailUrl, type ResumeListItem} from "../../api/resume_service.tsx";

// CSS Styling Import
import "../../css/resume_analyzer_css/ResumeCard.css"


type ResumeCardProps = {
    resume: ResumeListItem;
};


function ResumeCard({
    resume,
}: ResumeCardProps) {
    const [thumbnailUrl, setThumbnailUrl] =
        useState("");

    const [thumbnailLoading, setThumbnailLoading] =
        useState(false);

    const [thumbnailError, setThumbnailError] =
        useState(false);


    useEffect(() => {
        if (!resume.has_thumbnail) {
            return;
        }

        async function loadThumbnail() {
            try {
                setThumbnailLoading(true);
                setThumbnailError(false);

                const result =
                    await getResumeThumbnailUrl(
                        resume.resume_id
                    );

                setThumbnailUrl(
                    result.thumbnail_url
                );

            } catch (error) {
                console.error(
                    "Unable to load résumé thumbnail:",
                    error
                );

                setThumbnailError(true);

            } finally {
                setThumbnailLoading(false);
            }
        }

        loadThumbnail();

    }, [
        resume.resume_id,
        resume.has_thumbnail,
    ]);


    const uploadedDate =
        resume.uploaded_at
            ? new Date(
                resume.uploaded_at
            ).toLocaleDateString()
            : "Not available";


    const fileSizeMB =
        (
            resume.file_size /
            1024 /
            1024
        ).toFixed(2);


    return (
        <article className="ResumeCard">

            <div className="ResumeCardThumbnail">

                {thumbnailLoading && (
                    <p>
                        Loading preview...
                    </p>
                )}


                {!thumbnailLoading &&
                    thumbnailUrl && (
                        <img
                            src={thumbnailUrl}
                            alt={
                                `${resume.original_filename} preview`
                            }
                            className="ResumeCardThumbnailImage"

                        />
                    )}


                {!thumbnailLoading &&
                    (
                        !resume.has_thumbnail ||
                        thumbnailError
                    ) && (
                        <div className="ResumeCardPlaceholderTextWrapper">
                            <p className="ResumeCardPlaceholderText">
                                No preview available
                            </p>
                        </div>
                    )}

            </div>


            <div className="ResumeCardContent">

                <h3 className="ResumeCardFileName">
                    {resume.original_filename}
                </h3>


                <p>
                    Status: {resume.status}
                </p>


                <p>
                    Size: {fileSizeMB} MB
                </p>


                <p>
                    Uploaded: {uploadedDate}
                </p>


                <div className="ResumeCardActions">

                    <button
                        type="button"
                    >
                        View Analysis
                    </button>


                    <button
                        type="button"
                    >
                        Analyze Again
                    </button>

                </div>

            </div>

        </article>
    );
}


export default ResumeCard;