
// src/components/CourseDetails.tsx
import { useParams, useNavigate } from "react-router-dom";
import { coursesCards } from "../data/courses";
import EnrollmentModal from "./EnrollmentModal";
import { useState } from "react";
import CourseSlip from "./CourseSlip";
// import { Course } from '../types';

interface OpenSections {
  [key: number]: boolean;
}

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const [openSections, setOpenSections] = useState<OpenSections>({});

  const toggleSection = (section: number) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  // const course = coursesCards.find((course) => course.id === courseId) as Course;
  const course = coursesCards.find((course) => course.id === courseId);
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <button
            onClick={() => navigate("/courses")}
            className="text-blue-500 hover:underline"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Course Info Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4">{course.title_}</h1>
        <p className="text-gray-600 mb-6 text-sm">{course.description_}</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {course.features.map((feature, index) => (
            <p key={index} className="text-sm text-gray-700 flex items-center">
              ✅ {feature}
            </p>
          ))}
        </div>
        <div className="p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-2">This Course Includes:</h2>
          <ul className="text-gray-700 text-sm">
            <li>🎥 {course.courseIncludes.videoHours}</li>
            <li>📚 {course.courseIncludes.resources}</li>
            <li>💻 {course.courseIncludes.codingExercises}</li>
            <li>📰 {course.courseIncludes.articles}</li>
            <li>🏆 {course.courseIncludes.certificate}</li>
            <li>📱 {course.courseIncludes.access}</li>
          </ul>
        </div>
        <button
          onClick={() => setIsEnrollModalOpen(true)}
          className="border border-blue-800 text-blue-800 font-semibold px-14 py-1 rounded-lg hover:bg-blue-800 hover:text-white transition-colors mb-8"
        >
          Enroll Now
        </button>
        {/* Enrollment Modal */}
        <EnrollmentModal
          isOpen={isEnrollModalOpen}
          onClose={() => setIsEnrollModalOpen(false)}
          course={course}
        />
        <div className="flex justify-between text-sm text-gray-900 max-w-lg mb-6">
          <p className="font-semibold text-balck">
            Number of learners:{" "}
            <span className="block">{course.stats.learners}</span>
          </p>
          <p className="font-semibold text-balck">
            Hands-on practices:{" "}
            <span className="block">{course.stats.practices}</span>
          </p>
          <p className="font-semibold text-balck">
            Rating: <span className="block">{course.stats.rating} ⭐</span>
          </p>
        </div>
        <div>
          <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Course Content</h1>
            <p className="mb-4 text-gray-600">
              {course.content.length} sections ·{" "}
              {course.content.reduce((total, item) => total + item.lectures, 0)}{" "}
              lectures ·{" "}
              {course.content.reduce((total, item) => {
                const [hours, minutes] = item.duration.split(" ").map(Number);
                return total + (hours * 60 + minutes);
              }, 0)}{" "}
              minutes total length
            </p>
            <div className="bg-white shadow rounded-lg divide-y">
              {course.content.map((section, index) => (
                <div key={index}>
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSection(index)}
                  >
                    <span className="font-medium">{section.title}</span>
                    <span className="text-gray-500">
                      {section.lectures} lectures · {section.duration}
                    </span>
                    <span className="text-blue-500">
                      {openSections[index] ? "▲" : "▼"}
                    </span>
                  </div>
                  {openSections[index] && (
                    <ul className="p-4 bg-gray-50">
                      {section.content.map((lecture, lectureIndex) => (
                        <li key={lectureIndex} className="py-1 text-gray-600">
                          {lecture}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CourseSlip courseData={course} />
    </div>
  );
}
