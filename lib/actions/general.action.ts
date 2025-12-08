"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/components/firebase/admin";
import { feedbackSchema } from "@/constants";

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `You are an AI language trainer evaluating a speaking practice session. Your task is to assess the candidate’s spoken responses based on structured categories. Be detailed and precise in your analysis. Highlight major and minor mistakes and provide constructive feedback for improvement. 

Transcript:
${formattedTranscript}

Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:

- **Pronunciation & Fluency**: Clarity of pronunciation, natural flow, and pace of speech.
- **Grammar & Sentence Structure**: Correctness of grammar, sentence formation, and syntax.
- **Vocabulary & Word Choice**: Appropriateness and richness of vocabulary.
- **Coherence & Organization**: Logical structure of responses, ability to stay on topic.
- **Confidence & Engagement**: Confidence in speaking, enthusiasm, and ability to engage in conversation.

In addition to scores, provide a **detailed feedback section** highlighting major grammatical errors (correcting them explicitly) and minor mistakes (noting areas for refinement without disrupting fluency). Also, suggest specific ways to improve in each area.


        `,
      system:
        "You are a professional language trainer analyzing a speaking practice session. Your task is to evaluate the candidate based on structured categories. Provide a detailed assessment of their performance, highlighting both strengths and areas for improvement. Be objective and precise in your feedback."

    });

    const feedback = {
      interviewId: interviewId,
      userId: userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };
    //khondokar is here
    let feedbackRef;

    if (feedbackId) {
      feedbackRef = db.collection("feedback").doc(feedbackId);
    } else {
      feedbackRef = db.collection("feedback").doc();
    }

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userid } = params;

  const querySnapshot = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userid)
    .limit(1)
    .get();

  if (querySnapshot.empty) return null;

  const feedbackDoc = querySnapshot.docs[0];
  return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}
// kire mia ki kororro shera kaj ena
export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userid", "!=", userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userid", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}