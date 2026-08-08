from dataclasses import dataclass, field

@dataclass
class ResumeAnalysisResult:
    overall_score: float
    ats_score: float
    keyword_score: float
    experience_score: float
    skills_score: float

    strengths: list[str] = field(
        default_factory=list
    )

    weaknesses: list[str] = field(
        default_factory=list
    )

    missing_keywords: list[str] = field(
        default_factory=list
    )

    recommendations: list[str] = field(
        default_factory=list
    )

    raw_result: dict = field(
        default_factory=dict
    )

class ResumeAnalysisError(Exception):
    """
    Raised when résumé analysis cannot be completed.
    """

def validate_score(
    score: float,
    field_name: str,
) -> float:

    try:
        score = float(score)

    except (
        TypeError,
        ValueError,
    ) as error:

        raise ResumeAnalysisError(
            f"{field_name} must be a number."
        ) from error

    if not 0 <= score <= 100:
        raise ResumeAnalysisError(
            f"{field_name} must be between 0 and 100."
        )

    return score


def parse_analysis_result(
    result: dict,
) -> ResumeAnalysisResult:

    required_scores = [
        "overall_score",
        "ats_score",
        "keyword_score",
        "experience_score",
        "skills_score",
    ]

    for field_name in required_scores:
        if field_name not in result:
            raise ResumeAnalysisError(
                f"Missing analysis field: {field_name}"
            )

    return ResumeAnalysisResult(
        overall_score=validate_score(
            result["overall_score"],
            "overall_score",
        ),

        ats_score=validate_score(
            result["ats_score"],
            "ats_score",
        ),

        keyword_score=validate_score(
            result["keyword_score"],
            "keyword_score",
        ),

        experience_score=validate_score(
            result["experience_score"],
            "experience_score",
        ),

        skills_score=validate_score(
            result["skills_score"],
            "skills_score",
        ),

        strengths=result.get(
            "strengths",
            [],
        ),

        weaknesses=result.get(
            "weaknesses",
            [],
        ),

        missing_keywords=result.get(
            "missing_keywords",
            [],
        ),

        recommendations=result.get(
            "recommendations",
            [],
        ),

        raw_result=result,
    )