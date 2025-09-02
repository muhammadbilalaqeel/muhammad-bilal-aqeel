"use client";

import { useState } from "react";
import { Button, Avatar, Badge } from "flowbite-react";
import {
  BiLike,
  BiDislike,
  BiMessage,
  BiChevronLeft,
  BiChevronRight,
  BiChevronDown,
  BiChevronUp,
} from "react-icons/bi";
import { useGetAllReviewsQuery } from "../../redux/nestApiSlice";

const reviews = [
  {
    id: "1",
    name: "Emily Knight",
    avatar: "/diverse-woman-smiling.png",
    rating: 5,
    title: "Magical Face Mask!",
    content:
      "This mask is magic! I use it twice a week, and my pores are noticeably smaller. Plus, it doesn't dry out my skin like others I've tried.",
    date: "18/05/2025",
    helpful: 15,
    notHelpful: 0,
    verified: true,
    replies: [
      {
        id: "r1",
        name: "Beauty Expert",
        avatar: "/beauty-expert.png",
        content:
          "Thank you for the wonderful review! We're so happy to hear the mask is working well for your skin type.",
        date: "19/05/2025",
        verified: true,
      },
      {
        id: "r2",
        name: "Jessica M.",
        avatar: "/woman-customer-browsing.png",
        content:
          "I totally agree! This mask has been a game-changer for my skincare routine too.",
        date: "20/05/2025",
      },
    ],
  },
  {
    id: "2",
    name: "Sarah Miller",
    avatar: "/brunette-woman.png",
    rating: 4.5,
    title: "Great Product!",
    content:
      "I've tried many clay masks before, but this one is a game-changer! My skin feels incredibly smooth and looks so much clearer after each use. Definitely a must-have in my routine.",
    date: "16/05/2025",
    helpful: 7,
    notHelpful: 0,
    verified: true,
    replies: [
      {
        id: "r3",
        name: "Skincare Team",
        avatar: "/skincare-professional.png",
        content:
          "We're thrilled to hear about your positive experience! Clay masks work best when used consistently.",
        date: "17/05/2025",
        verified: true,
      },
    ],
  },
  {
    id: "3",
    name: "Anna Simmons",
    avatar: "/blonde-professional-woman.png",
    rating: 4,
    title: "Awesome Glow!",
    content:
      "I'm obsessed! The texture is smooth and easy to apply, and my skin feels so clean and rejuvenated afterward. I've even gotten compliments on my glow!",
    date: "13/05/2025",
    helpful: 6,
    notHelpful: 0,
    verified: true,
  },
];

export default function ProductReviews() {
  const { data } = useGetAllReviewsQuery();
  console.log(data);
  const [currentPage, setCurrentPage] = useState(2);
  const totalPages = 9;
  const [expandedReplies, setExpandedReplies] = useState(new Set());

  const handleVote = (reviewId, type) => {
    console.log(`Voted ${type} for review ${reviewId}`);
  };

  const toggleReplies = (reviewId) => {
    const newExpanded = new Set(expandedReplies);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReplies(newExpanded);
  };

  return (
    <div className="w-full py-8 px-4 sm:px-10 lg:px-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-serif text-gray-900">Customer Reviews</h2>
        <Button color="dark" pill className="px-6">
          Write a Review
        </Button>
      </div>

      {/* Reviews */}
      <div className="space-y-6 mb-8">
        {data?.data.map((review) => (
          <div
            key={review._id}
            className="pb-6 border-b border-gray-200 last:border-b-0"
          >
            {/* Review Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-gray-900">
                      {review.userId.name}
                    </h3>
                  </div>
                  {/* <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-900">{review.title}</h4>
                    </div> */}
                </div>
                <span className="text-sm text-gray-500">
                  {review.createdAt}
                </span>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {review.review}
              </p>

              {/* Helpful votes */}
              <div className="flex items-center gap-4 mb-4">
                {/* <span className="text-sm text-gray-500">Was this review helpful?</span> */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleVote(review.id, "helpful")}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <BiLike className="w-4 h-4" />
                    {review.helpful}
                  </button>
                  <button
                    onClick={() => handleVote(review.id, "notHelpful")}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <BiDislike className="w-4 h-4" />
                    {review.notHelpful}
                  </button>
                </div>
              </div>

              {/* Replies toggle button and replies section */}
              {review.reply && review.reply.length > 0 && (
                <>
                  <button
                    onClick={() => toggleReplies(review.id)}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors mb-3"
                  >
                    <BiMessage className="w-4 h-4" />
                    {expandedReplies.has(review.id) ? "Hide" : "Show"}{" "}
                    {review.reply.length}{" "}
                    {review.reply.length === 1 ? "reply" : "replies"}
                    {expandedReplies.has(review._id) ? (
                      <BiChevronUp className="w-4 h-4" />
                    ) : (
                      <BiChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {expandedReplies.has(review._id) && (
                    <div className="ml-4 pl-4 border-l-2 border-gray-100 space-y-4">
                      {review.reply.map((reply) => (
                        <div key={reply._id} className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-medium text-gray-900">
                              {reply.userId.name}
                            </h4>
                            {/* {reply.verified && (
                                  <Badge color="success" size="xs">
                                    ✓ Verified
                                  </Badge>
                                )} */}
                            <span className="text-xs text-gray-500">
                              {reply.createdAt}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {reply.reply}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <Button
          color="light"
          size="sm"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 p-0 flex items-center justify-center"
        >
          <BiChevronLeft className="w-4 h-4" />
        </Button>

        <Button
          color="light"
          size="sm"
          onClick={() => setCurrentPage(1)}
          className={`w-8 h-8 p-0 flex items-center justify-center ${
            currentPage === 1 ? "bg-gray-100" : ""
          }`}
        >
          1
        </Button>

        <Button
          color="dark"
          size="sm"
          className="w-8 h-8 p-0 flex items-center justify-center"
        >
          2
        </Button>

        <span className="px-2 text-gray-500">...</span>

        <Button
          color="light"
          size="sm"
          onClick={() => setCurrentPage(8)}
          className={`w-8 h-8 p-0 flex items-center justify-center ${
            currentPage === 8 ? "bg-gray-100" : ""
          }`}
        >
          8
        </Button>

        <Button
          color="light"
          size="sm"
          onClick={() => setCurrentPage(9)}
          className={`w-8 h-8 p-0 flex items-center justify-center ${
            currentPage === 9 ? "bg-gray-100" : ""
          }`}
        >
          9
        </Button>

        <Button
          color="light"
          size="sm"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 p-0 flex items-center justify-center"
        >
          <BiChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
