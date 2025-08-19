'use client'

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';

// Type definitions
interface Job {
    id:number
    company : string
    logo : string
    new : boolean
    featured ?: boolean
    position : string
    role : string
    level : string
    postedAt : string
    contract : string
    location : string
    languages : string[]
    tools ?: string[]
}

const JobDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch job data
  useEffect(() => {
    if (!id) return;

    const fetchJobData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/jobs/${id}`);
        setJob(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch job details');
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [id]);

  const handleOnTagClick = (tag: string) => {
    // Handle tag click functionality
    console.log('Tag clicked:', tag);
    // You can implement filtering or navigation logic here
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0fdf4] flex items-center justify-center">
        <div className="text-[#5EA5A3] text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-[#f0fdf4] flex items-center justify-center">
        <div className="text-red-500 text-lg font-semibold">
          {error || 'Job not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0fdf4] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 px-4 py-2 bg-white text-[#5EA5A3] rounded-md shadow-sm hover:bg-[#5EA5A3] hover:text-white transition-all duration-200 font-semibold"
        >
          ← Back to Jobs
        </button>

        {/* Main Job Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 relative">
          {/* Featured Border */}
          {job.featured && (
            <div className="w-1.5 top-0 h-full rounded-l-md bg-[#5EA5A3] absolute left-0"></div>
          )}

          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="h-20 w-20 relative -mt-12 sm:mt-0">
              <Image src={job.logo} alt={`${job.company} logo`} fill className="object-contain" />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 items-center mb-2">
                <p className="text-[15px] font-bold text-[#5EA5A3]">{job.company}</p>
                <div className="flex gap-2">
                  {job.new && (
                    <p className="sm:text-[12px] text-[13px] bg-[#5EA5A3] text-white px-2 flex items-center justify-center py-0.5 rounded-3xl">
                      NEW
                    </p>
                  )}
                  {job.featured && (
                    <p className="sm:text-[12px] text-[13px] bg-[#2c3a3a] text-white px-2 flex items-center justify-center py-0.5 rounded-3xl">
                      FEATURED
                    </p>
                  )}
                </div>
              </div>
              
              <h1 className="text-2xl sm:text-3xl text-[#2c3a3a] font-bold mb-3">
                {job.position}
              </h1>
              
              <div className="flex items-center gap-2 sm:text-[13px] text-[14px] text-[#7b8e8e]">
                <span>{job.postedAt}</span>
                <span>-</span>
                <span>{job.contract}</span>
                <span>-</span>
                <span>{job.location}</span>
              </div>
            </div>
          </div>

          {/* Job Details Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#2c3a3a] mb-4">Job Details</h2>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-[#5EA5A3]">Role: </span>
                  <span className="text-[#2c3a3a]">{job.role}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#5EA5A3]">Level: </span>
                  <span className="text-[#2c3a3a]">{job.level}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#5EA5A3]">Contract: </span>
                  <span className="text-[#2c3a3a]">{job.contract}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#5EA5A3]">Location: </span>
                  <span className="text-[#2c3a3a]">{job.location}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#2c3a3a] mb-4">Requirements</h2>
              
              {/* Languages Section */}
              <div>
                <h3 className="font-semibold text-[#5EA5A3] mb-2">Languages:</h3>
                <div className="flex flex-wrap gap-2">
                  {job?.languages.map((language, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 text-[13px] active:text-white hover:text-white transition-all duration-100 ease-linear cursor-pointer active:bg-[#5EA5A3] hover:bg-[#5EA5A3] w-fit bg-green-50 text-[#5EA5A3] font-bold rounded-sm"
                      onClick={() => handleOnTagClick(language)}
                    >
                      {language}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools Section */}
              {
                job?.tools?.length && <div>
                <h3 className="font-semibold text-[#5EA5A3] mb-2">Tools:</h3>
                <div className="flex flex-wrap gap-2">
                  {job?.tools?.map((tool, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 text-[13px] active:text-white hover:text-white transition-all duration-100 ease-linear cursor-pointer active:bg-[#5EA5A3] hover:bg-[#5EA5A3] w-fit bg-green-50 text-[#5EA5A3] font-bold rounded-sm"
                      onClick={() => handleOnTagClick(tool)}
                    >
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
              }
            </div>
          </div>

        </div>

        {/* Additional Information Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mt-6">
          <h2 className="text-2xl font-bold text-[#2c3a3a] mb-6">About this Role</h2>
          <div className="space-y-4 text-[#7b8e8e] leading-relaxed">
            <p>
              We are looking for a talented {job.position} to join our {job.level.toLowerCase()} team. 
              This is a {job.contract.toLowerCase()} position that can be performed {job.location.toLowerCase()}.
            </p>
            <p>
              As a {job.role} developer, you&apos;ll be working with cutting-edge technologies including{' '}
              {job.languages.join(', ')} and {job?.tools?.join(', ')}. 
              You&apos;ll be responsible for developing and maintaining high-quality applications that serve our users worldwide.
            </p>
            <p>
              Join {job.company} and be part of a dynamic team that values innovation, collaboration, and professional growth. 
              We offer competitive compensation, comprehensive benefits, and opportunities for career advancement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;