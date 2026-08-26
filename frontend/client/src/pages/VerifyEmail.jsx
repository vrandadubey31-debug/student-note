import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";
import { CheckCircle2, XCircle, Loader2, BookOpen } from "lucide-react";

const VerifyEmail = () => {
  const { token } = useParams();
  const calledRef = useRef(false);

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (calledRef.current || !token) return;
    calledRef.current = true;

    const verifyToken = async () => {
      try {
        const res = await api.get(`/auth/verify/${token}`);
        setStatus("success");
        setMessage(res.data?.message || "Email verified successfully!");
      } catch (err) {
        setStatus("error");
        setMessage(
          err.response?.data?.message ||
            "Email verification failed. The link may be invalid or expired."
        );
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="flex items-center justify-center px-4 py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-white min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md text-center">
        <Link to="/" className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 mb-4">
          <BookOpen size={22} className="text-emerald-600" />
        </Link>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Email Verification</h1>

          {status === "verifying" && (
            <div className="flex flex-col items-center gap-3 py-4">
              <Loader2 size={28} className="text-gray-400 animate-spin" />
              <p className="text-sm text-gray-500">Verifying your email, please wait...</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 size={24} className="text-emerald-600" />
              </div>
              <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
                {message}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                You can now log in to your account.{" "}
                <Link to="/login" className="font-medium text-gray-900 hover:underline">
                  Go to Login
                </Link>
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle size={24} className="text-red-600" />
              </div>
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                {message}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                If your link expired you can register again, or{" "}
                <Link to="/login" className="font-medium text-gray-900 hover:underline">
                  go back to login
                </Link>{" "}
                if you already verified.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
