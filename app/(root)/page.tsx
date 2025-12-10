

import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from '@/lib/actions/auth.action';
import {getInterviewByUserId, getLatestInterviews } from '@/lib/actions/general.action'
 
const HomePage = async () => {

    const user = await getCurrentUser();
    

    const [userInerviews , latestInterviews] = await Promise.all([
        await getInterviewByUserId(user?.id!),
        await getLatestInterviews({userId:user?.id!})
    ]);

    
    
    
    const hasPastInterviews = userInerviews?.length >0;
    const hasUpcomingInterviews = latestInterviews?.length>0;

    return (
        <>
            <div className={"bg-blue-50 text-blue-900 p-4 rounded-md shadow-sm text-center font-medium"}>
                hellow world this is a test
            </div>
            <section className={'card-cta'}>
                <div className={'flex flex-col gap-6 max-w-lg'}>
                    <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
                    <p className={'text-lg'}>
                        Practice on real interview question & get instant feedback
                    </p>
                    <Button asChild className={'btn-primary max-sm:w-full'}>
                        <Link href={'/interview'}>
                            Start an Interview
                        </Link>
                    </Button>
                </div>
                <Image src={'/robot.png'} alt={'robo'} width={400} height={400} className={'max-sm:hidden'}/>

            </section>

            <section className={'flex flex-col gap-6 mt-6'}>
                <h2>Your Interviews</h2>
                <div className={'interviews-section'}>
                    {
                    hasPastInterviews ? (
                        userInerviews?.map((interview) =>(
                            <InterviewCard {...interview} key={interview.id}/>
                        ))
                    ) : (
                        <p>You haven't taken any interviews yet</p>
                    )
                    
                    }
                </div>
            </section>

            <section className={'flex flex-col gap-6 mt-8'}>
                <h2>Take an interview</h2>
                <div className={'interviews-section'}>
                {
                    hasUpcomingInterviews ? (
                        latestInterviews?.map((interview) =>(
                            <InterviewCard {...interview} key={interview.id}/>
                        ))
                    ) : (
                        <p>There are no interviews available</p>
                    )
                    
                    }
                    
                </div>
            </section>

        </>
    )
}
export default HomePage
