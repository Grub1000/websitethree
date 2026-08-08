import json

from django.conf import settings
from openai import OpenAI


client = OpenAI(
    api_key=settings.OPENAI_API_KEY,
)


class ResumeLLMError(Exception):
    """
    Raised when the résumé LLM analysis fails.
    """


def build_resume_analysis_prompt(
    *,
    resume_text: str,
    job_title: str = "",
    job_description: str = "",
) -> str:
    prompt = f"""
Analyze the following résumé.

Score the résumé from 0 to 100 in these categories:

- overall_score
- ats_score
- keyword_score
- experience_score
- skills_score

Also provide:

- strengths
- weaknesses
- missing_keywords
- recommendations

Focus on concrete evidence from the résumé.

Do not invent experience, skills, education, certifications,
employment history, or accomplishments that are not present.

Résumé:

{resume_text}
"""

    if job_title or job_description:
        prompt += f"""

Target Job:

Job Title:
{job_title}

Job Description:
{job_description}

Evaluate keyword relevance, skills alignment, experience alignment,
and missing qualifications against this job description.
"""
        
    return prompt



def analyze_resume_with_llm(
    *,
    resume_text: str,
    job_title: str = "",
    job_description: str = "",
) -> dict:

    prompt = build_resume_analysis_prompt(
        resume_text=resume_text,
        job_title=job_title,
        job_description=job_description,
    )

    try:
        response = client.responses.create(
            model=settings.OPENAI_RESUME_MODEL,

            input=[
                {
                    "role": "system",
                    "content": (
                        "You are a professional résumé analyzer. "
                        "Return objective, concise résumé feedback."
                    ),
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],

            text={
                "format": {
                    "type": "json_schema",

                    "name": "resume_analysis",

                    "strict": True,

                    "schema": {
                        "type": "object",

                        "properties": {
                            "overall_score": {
                                "type": "number",
                            },

                            "ats_score": {
                                "type": "number",
                            },

                            "keyword_score": {
                                "type": "number",
                            },

                            "experience_score": {
                                "type": "number",
                            },

                            "skills_score": {
                                "type": "number",
                            },

                            "strengths": {
                                "type": "array",
                                "items": {
                                    "type": "string",
                                },
                            },

                            "weaknesses": {
                                "type": "array",
                                "items": {
                                    "type": "string",
                                },
                            },

                            "missing_keywords": {
                                "type": "array",
                                "items": {
                                    "type": "string",
                                },
                            },

                            "recommendations": {
                                "type": "array",
                                "items": {
                                    "type": "string",
                                },
                            },
                        },

                        "required": [
                            "overall_score",
                            "ats_score",
                            "keyword_score",
                            "experience_score",
                            "skills_score",
                            "strengths",
                            "weaknesses",
                            "missing_keywords",
                            "recommendations",
                        ],

                        "additionalProperties": False,
                    },
                }
            },
        )

    except Exception as error:
        raise ResumeLLMError(
            "The résumé could not be analyzed."
        ) from error

    try:
        return json.loads(
            response.output_text
        )

    except json.JSONDecodeError as error:
        raise ResumeLLMError(
            "The résumé analysis returned invalid JSON."
        ) from error