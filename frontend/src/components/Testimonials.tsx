import { testimonials } from "../data/courses";

export default function Testimonials() {
  return (
    <div className="bg-gray-50 py-12 px-6">
      <div className="pb-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-black mb-6">
            What Our Student Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white border border-blue-200 rounded-lg hover:shadow-blue-400 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center p-6"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {testimonial.role}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {testimonial.company}
                </p>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  {testimonial.feedback}
                </p>
                <div className="bg-blue-600 text-white text-center py-2 px-4 rounded-full mt-auto hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                  {testimonial.name}
                </div>
              </div>
            ))}
          </div>
          {/* Dots for responsiveness (optional) */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, idx) => (
              <div
                key={idx}
                className="w-3 h-3 bg-gray-300 rounded-full hover:bg-blue-600 transition duration-300"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
