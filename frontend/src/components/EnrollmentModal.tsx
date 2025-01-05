/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: any;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface FormData {
  name: string;
  email: string;
  phone: string;
}

export default function EnrollmentModal({
  isOpen,
  onClose,
  course,
}: EnrollmentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
  });

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError("Name is required.");
      return false;
    }

    if (!formData.email.trim()) {
      setError("Email is required.");
      return false;
    } else if (
      !/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      setError("Enter a valid email address.");
      return false;
    }

    if (!formData.phone.trim()) {
      setError("Phone number is required.");
      return false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      setError("Enter a valid 10-digit phone number.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    } else {
      return;
    }
    console.log("handle payment running");
    handlePayment();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      // Load Razorpay script
      await loadRazorpayScript();

      // Create order
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: course.id,
            amount: course.price,
            userId: "current-user-id", // Replace with actual user ID
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();

      // Initialize Razorpay payment
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Novanectar",
        description: `Enrollment for ${course.title}`,
        order_id: data.orderId,
        notes: data.notes,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch(
              `${import.meta.env.VITE_API_URL}/api/verify-payment`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }
            );
            console.log("verifyResponse", await verifyResponse.json());

            if (!verifyResponse.ok) {
              throw new Error("Payment verification failed");
            }

            // Handle successful payment
            onClose();
            navigate("/payment/success");
          } catch (error) {
            console.error("Payment verification error:", error);
            setError("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },

        // Updated config for payment methods including UPI
        config: {
          display: {
            blocks: {
              utilities: {
                name: "Pay via UPI",
                instruments: [
                  {
                    method: "upi",
                    flows: ["collect", "qr"],
                  },
                ],
              },
              other: {
                name: "Other Payment Methods",
                instruments: [
                  {
                    method: "card",
                  },
                  {
                    method: "netbanking",
                  },
                  {
                    method: "wallet",
                  },
                ],
              },
            },
            sequence: ["block.utilities", "block.other"],
            preferences: {
              show_default_blocks: true,
            },
          },
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            setError("Payment cancelled");
          },
          confirm_close: true,
          escape: true,
        },
        theme: {
          color: "#3B82F6",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      setError("Failed to process payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Enroll in {course.title}</h2>
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            You're about to enroll in this course for {course.price} Rs
          </p>
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">What you'll get:</h3>
            <ul className="text-gray-600 space-y-2">
              <li>✓ Full course access</li>
              <li>✓ Lifetime access</li>
              <li>✓ Certificate of completion</li>
            </ul>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Billie Eilish"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="billie@example.com"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="1234567890"
              />
            </div>

            {/* {error && <p className="text-red-500 text-sm mt-2">{error}</p>} */}

            {/* <button
              type="submit"
              className="mt-6 w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Submit
            </button> */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                // onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Proceed to Payment"}
              </button>
            </div>
          </form>
        </div>

        {error && <div className="text-red-600 mb-4">{error}</div>}
      </div>
    </div>
  );
}
