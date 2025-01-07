import { testimonials } from "../data/courses";

export default function Testimonials() {
  return (
    <div className="bg-gray-50">
      <div className="pb-12 bg-gray-50">
        <div className="mx-auto text-center">
          <h2 className="text-2xl font-semibold text-black mb-2">
            What Our Student Say
          </h2>
          <div className="bg-white py-10 overflow-hidden">
            <div className="relative flex items-center">
              <div className="flex animate-scroll whitespace-nowrap">
                {testimonials.concat(testimonials).map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 bg-gray-100 rounded-lg shadow-md pt-6 w-96 sm:w-96 mx-4 border border-blue-500 flex-col"
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mx-auto mb-4"
                    />

                    <p className="text-sm text-gray-500 text-center text-wrap">
                      {testimonial.role} at {testimonial.company}
                    </p>
                    <p className="text-gray-600 mt-4 text-center break-words text-wrap">
                      {testimonial.feedback}
                    </p>
                    <h3 className="bg-blue-500 w-full text-lg font-semibold text-white text-center text-wrap py-2 mt-auto">
                      {testimonial.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
