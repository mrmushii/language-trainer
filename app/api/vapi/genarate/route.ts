import {generateText} from "ai"
import {google} from "@ai-sdk/google"
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/components/firebase/admin";
export async function GET() {
  return Response.json({success:true,data:'THANK YOU'},{status:200})
}

export async function POST(request:Request) {
  const {type, role, level, amount, userid} = await request.json();

  try {
    const { text: questions } = await generateText({
      model: google('gemini-2.0-flash-001'),
      prompt: `
        Generate ${amount} conversation questions for a ${role} discussion in ${type} with a ${level} of proficiency. 
      Make sure the questions are engaging, natural, and suitable for a language learning session.
      Avoid overly complex vocabulary unless the session level is advanced.

        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
        
    `
    })

    const interview = {
      role,type,level,
      
      questions: JSON.parse(questions),
      userid: userid,
      finalized:true,
      coverImage: getRandomInterviewCover(),
      createdAt:new Date().toISOString()
    }

    await db.collection("interviews").add(interview)

    return Response.json({
      success: true
    },
  {
    status:200
  })
    
  } catch (error) {
    console.log(error);
    return Response.json({success: false,error},{status:500})
    
  }


}