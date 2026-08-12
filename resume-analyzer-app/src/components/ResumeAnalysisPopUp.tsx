// import { resume } from "react-dom/server"
import {type ResumeAnalysisResponseListItem} from "../api/resume_service"
import "../css/resume_analyzer_css/ResumeAnalysisPopUp.css"

export default function ResumeAnalysisPopUp({
    resumeAnalyses,
    exitAnalysis
}:{
    resumeAnalyses: ResumeAnalysisResponseListItem[],
    exitAnalysis: ()=> void;
}   
){
    return(
    <div className="ResumeAnalysisPopUpWrapper">
        <div className="ResumeAnalysisPopUpDashboard">

            <section className="ResumeAnalysisPopUpDashboardHeader">

                <div>
                    <p className="ResumeAnalysisPopUpDashboardEyebrow">
                        Resume Analysis
                    </p>

                    <h1>
                        General Analysis
                    </h1>

                    <div className="ResumeAnalysisPopUpDashboardMetaDataWrapper">
                        <span className="ResumeAnalysisPopUpDashboardMetaDataStatusBadge ResumeAnalysisPopUpDashboardMetaDataCompleteStatus">
                            {/* Completed */}
                            {resumeAnalyses[0].status}
                        </span>

                        <span>
                            Analysis ID:
                            {/* Analysis ID: 45ed8d99 */}
                            {" " + resumeAnalyses[0].analysis_id}
                        </span>

                        <span>
                            {/* Aug 9, 2026 */}
                            {new Date(resumeAnalyses[0].created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",})}
                        </span>
                    </div>
                </div>

                <button className="ResumeAnalysisPopUpDashboardExitButton" onClick={() => exitAnalysis()}>
                    Exit Analysis
                </button>

            </section>


            <section className="ResumeAnalysisPopUpDashboardScoreOverviewSection">

                <div className="ResumeAnalysisPopUpDashboardOverallScoreCard">

                    <div className="ResumeAnalysisPopUpDashboardOverallScoreRing" 
                         style={{background: "radial-gradient(circle at center,#17171b 62%,transparent 63%),conic-gradient(#55ddff 0 " + resumeAnalyses[0].scores.overall + "%,#29292f " + resumeAnalyses[0].scores.overall + "% 100%)"}}
                         >
                        <span>
                            {/* 88 */}
                            {resumeAnalyses[0].scores.overall}
                        </span>

                        <small>
                            /100
                        </small>
                    </div>

                    <div>
                        <p className="ResumeAnalysisPopUpDashboardOverallScoreLabel">
                            Overall Score
                        </p>

                        <h2>
                            {/* Strong Resume */}
                            {/* {resumeAnalyses[0]} */}
                            {resumeAnalyses[0].scores.overall 
                            ? resumeAnalyses[0].scores.overall >= 80 ? "Strong Resume": null
                            : null }
                            {resumeAnalyses[0].scores.overall 
                            ? resumeAnalyses[0].scores.overall >= 50 ? "Needs Improvement": null
                            : null }
                            {resumeAnalyses[0].scores.overall 
                            ? resumeAnalyses[0].scores.overall <= 49 ? "Weak Resume": null
                            : null }
                        </h2>

                        <p className="ResumeAnalysisPopUpDashboardOverallScoreDescription">
                            {/* Your resume is well structured and competitive,
                            with a few areas that could be improved. */}
                            {resumeAnalyses[0].scores.overall 
                            ? resumeAnalyses[0].scores.overall >= 80 ? "Your resume is well structured and competitive, with a few areas that could be improved.": null
                            : null }
                            {resumeAnalyses[0].scores.overall 
                            ? resumeAnalyses[0].scores.overall >= 50 ? "Your resume has a good start, but it needs a few changes to help you stand out to employers.": null
                            : null }
                            {resumeAnalyses[0].scores.overall 
                            ? resumeAnalyses[0].scores.overall <= 49 ? "Your resume needs several major updates and better details to help you get interviews.": null
                            : null }
                        </p>
                    </div>

                </div>


                <div className="ResumeAnalysisPopUpDashboardScoreGridWrapper">

                    <div className="ResumeAnalysisPopUpDashboardScoreCard">
                        <div className="ResumeAnalysisPopUpDashboardScoreCardHeader">
                            <span>
                                ATS
                            </span>

                            <strong>
                                {resumeAnalyses[0].scores.ats}
                            </strong>
                        </div>

                        <div className="ResumeAnalysisPopUpDashboardScoreCardBar">
                            <div
                                className="ResumeAnalysisPopUpDashboardScoreCardBarFill"
                                style={{width: "" + resumeAnalyses[0].scores.ats + "%"}}
                            ></div>
                        </div>
                    </div>


                    <div className="ResumeAnalysisPopUpDashboardScoreCard">
                        <div className="ResumeAnalysisPopUpDashboardScoreCardHeader">
                            <span>
                                Keywords
                            </span>

                            <strong>
                                {/* 82 */}
                                {resumeAnalyses[0].scores.keywords}
                            </strong>
                        </div>

                        <div className="ResumeAnalysisPopUpDashboardScoreCardBar">
                            <div
                                className="ResumeAnalysisPopUpDashboardScoreCardBarFill"
                                style={{width: "" + resumeAnalyses[0].scores.keywords + "%"}}
                            ></div>
                        </div>
                    </div>


                    <div className="ResumeAnalysisPopUpDashboardScoreCard">
                        <div className="ResumeAnalysisPopUpDashboardScoreCardHeader">
                            <span>
                                Experience
                            </span>

                            <strong>
                                {/* 90 */}
                                {resumeAnalyses[0].scores.experience}
                            </strong>
                        </div>

                        <div className="ResumeAnalysisPopUpDashboardScoreCardBar">
                            <div
                                className="ResumeAnalysisPopUpDashboardScoreCardBarFill"
                                style={{width: "" + resumeAnalyses[0].scores.experience + "%"}}
                            ></div>
                        </div>
                    </div>


                    <div className="ResumeAnalysisPopUpDashboardScoreCard">
                        <div className="ResumeAnalysisPopUpDashboardScoreCardHeader">
                            <span>
                                Skills
                            </span>

                            <strong>
                                {/* 87 */}
                                {resumeAnalyses[0].scores.skills}
                            </strong>
                        </div>

                        <div className="ResumeAnalysisPopUpDashboardScoreCardBar">
                            <div
                                className="ResumeAnalysisPopUpDashboardScoreCardBarFill"
                                style={{width: "" + resumeAnalyses[0].scores.skills + "%"}}
                            ></div>
                        </div>
                    </div>

                </div>

            </section>


            <section className="ResumeAnalysisPopUpDashboardAnalysisGrid">

                <div className="ResumeAnalysisPopUpDashboardAnalysisCard StrengthsCard">

                    <div className="ResumeAnalysisPopUpDashboardAnalysisCardHeading">
                        <div>
                            <span className="ResumeAnalysisPopUpDashboardAnalysisCardSectionIcon">
                                +
                            </span>

                            <h2>
                                Strengths
                            </h2>
                        </div>

                        <span className="ResumeAnalysisPopUpDashboardAnalysisCardItemCount">
                            {resumeAnalyses[0].strengths.length}
                        </span>
                    </div>

                    <ul className="analysis-list">
                        {/* <li className="analysis-list-item">
                            Strong full-stack development background with
                            modern frontend and backend technologies.
                        </li>

                        <li className="analysis-list-item">
                            Relevant machine learning and artificial intelligence
                            project experience.
                        </li >

                        <li className="analysis-list-item">
                            Demonstrates practical AWS deployment and cloud
                            infrastructure knowledge.
                        </li>

                        <li className="analysis-list-item">
                            Technical certifications reinforce the skills
                            listed throughout the resume.
                        </li> */}

                        {resumeAnalyses[0].strengths.map((strength) => (
                            <li className="analysis-list-item" key={strength}>
                                {strength}
                            </li>
                        ))}
                    </ul>

                </div>


                <div className="ResumeAnalysisPopUpDashboardAnalysisCard WeaknessCard">

                    <div className="ResumeAnalysisPopUpDashboardAnalysisCardHeading">
                        <div>
                            <span className="ResumeAnalysisPopUpDashboardAnalysisCardSectionIcon">
                                !
                            </span>

                            <h2>
                                Weaknesses
                            </h2>
                        </div>

                        <span className="ResumeAnalysisPopUpDashboardAnalysisCardItemCount">
                            {/* 3 */}
                            {resumeAnalyses[0].weaknesses.length}
                        </span>
                    </div>

                    <ul className="analysis-list">
                        {/* <li className="analysis-list-item">
                            Several project descriptions could include more
                            measurable outcomes.
                        </li>

                        <li className="analysis-list-item">
                            Some technical experience is described too broadly.
                        </li>

                        <li className="analysis-list-item">
                            Additional production machine learning experience
                            would improve role alignment.
                        </li> */}

                        {resumeAnalyses[0].weaknesses.map((weakness) => (
                            <li className="analysis-list-item" key={weakness}>
                                {weakness}
                            </li>
                        ))}
                    </ul>

                </div>

            </section>


            <section className="ResumeAnalysisPopUpDashboardAnalysisCard keywords-card">

                <div className="ResumeAnalysisPopUpDashboardAnalysisCardHeading">

                    <div>
                        <span className="ResumeAnalysisPopUpDashboardAnalysisCardSectionIcon">
                            #
                        </span>

                        <h2>
                            Missing Keywords
                        </h2>
                    </div>

                    <span className="ResumeAnalysisPopUpDashboardAnalysisCardItemCount">
                        {/* 6 */}
                        {resumeAnalyses[0].missing_keywords.length}
                    </span>

                </div>

                <div className="keyword-list">

                    {/* <span className="keyword-chip">
                        Docker
                    </span>

                    <span className="keyword-chip">
                        Kubernetes
                    </span>

                    <span className="keyword-chip">
                        MLflow
                    </span>

                    <span className="keyword-chip">
                        FastAPI
                    </span>

                    <span className="keyword-chip">
                        Model Monitoring
                    </span>

                    <span className="keyword-chip">
                        Feature Engineering
                    </span> */}
                    {resumeAnalyses[0].missing_keywords.map((missingKeyword)=>
                        <span className="keyword-chip" key={missingKeyword}>
                            {missingKeyword}
                        </span>
                    )}
                </div>

            </section>


            <section className="ResumeAnalysisPopUpDashboardAnalysisCard recommendations-card">

                <div className="ResumeAnalysisPopUpDashboardAnalysisCardHeading">

                    <div>
                        <span className="ResumeAnalysisPopUpDashboardAnalysisCardSectionIcon">
                            →
                        </span>

                        <h2>
                            Recommendations
                        </h2>
                    </div>

                    <span className="ResumeAnalysisPopUpDashboardAnalysisCardItemCount">
                        {/* 4 */}
                        {resumeAnalyses[0].recommendations.length}
                    </span>

                </div>


                <div className="recommendation-list">

                    {/* <article className="recommendation-item">

                        <span className="recommendation-number">
                            01
                        </span>

                        <div>
                            <h3>
                                Quantify your project impact
                            </h3>

                            <p>
                                Add measurable improvements such as model accuracy,
                                performance gains, dataset sizes, deployment speed,
                                or user impact.
                            </p>
                        </div>

                    </article>


                    <article className="recommendation-item">

                        <span className="recommendation-number">
                            02
                        </span>

                        <div>
                            <h3>
                                Strengthen ML deployment terminology
                            </h3>

                            <p>
                                Mention tools such as model serving, monitoring,
                                Docker, FastAPI, MLflow, and production inference
                                where applicable.
                            </p>
                        </div>

                    </article>


                    <article className="recommendation-item">

                        <span className="recommendation-number">
                            03
                        </span>

                        <div>
                            <h3>
                                Improve bullet point specificity
                            </h3>

                            <p>
                                Replace broad descriptions with concise action,
                                technology, and result-driven statements.
                            </p>
                        </div>

                    </article>


                    <article className="recommendation-item">

                        <span className="recommendation-number">
                            04
                        </span>

                        <div>
                            <h3>
                                Align keywords with the target role
                            </h3>

                            <p>
                                Incorporate relevant job-description terminology
                                where it accurately reflects your experience.
                            </p>
                        </div>
                    </article> */}

                    {resumeAnalyses[0].recommendations.map((recommendation)=>
                        <article className="recommendation-item">

                        <span className="recommendation-number">
                            00
                        </span>
                    

                        <div>
                            <h3>
                                {/* Improve bullet point specificity */}
                            </h3>

                            <p>
                                {recommendation}
                            </p>
                        </div>

                    </article>
                    )}



                </div>

            </section>


            <section className="analysis-footer">

                <div>
                    <span>
                        Model Provider
                    </span>

                    <strong>
                        {/* OpenAI */}
                        {resumeAnalyses[0].model_provider}
                    </strong>
                </div>

                <div>
                    <span>
                        Model
                    </span>

                    <strong>
                        {/* GPT-5 */}
                        {resumeAnalyses[0].model_name}
                    </strong>
                </div>

                <div>
                    <span>
                        Prompt Version
                    </span>

                    <strong>
                        {/* 1.0 */}
                        {resumeAnalyses[0].prompt_version}
                    </strong>
                </div>

                <div>
                    <span>
                        Completed
                    </span>

                    <strong>
                        {/* Aug 9, 2026 */}
                        {resumeAnalyses[0].completed_at
                            ? new Date(resumeAnalyses[0].completed_at).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                              })
                            : "—"}
                    </strong>
                </div>

            </section>

        </div>
    </div>
    )
}