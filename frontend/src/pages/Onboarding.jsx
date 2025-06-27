import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';

const Onboarding = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    nativeLanguage: '',
    learningLanguage: '',
    location: '',
  });
  const [error, setError] = useState('');

  const { mutate: onboard, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post('/auth/onboarding', formData);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['authUser']);
      navigate('/');
    },
    onError: (err) => {
       console.log("Onboarding error:", err);
      const msg = err?.response?.data?.message || 'Onboarding failed';
      setError(msg);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
     console.log("Form data being sent:", formData);
    onboard();
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl border-2 border-white rounded-xl shadow-xl overflow-hidden">
        {/* LEFT IMAGE & QUOTE */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-blue-100 dark:bg-gray-800 p-6">
          <img
            src="/onboarding_image.svg"
            alt="Illustration"
            className="w-[85%] max-h-[300px] md:max-h-[400px] object-contain"
          />
          <p className="text-center text-sm md:text-lg font-medium text-blue-900 dark:text-white mt-4 max-w-xs">
            “Tell us more about yourself. Let’s personalize your journey.”
          </p>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900">
          <h1 className="text-3xl font-bold text-blue-800 dark:text-white mb-4">Onboarding</h1>

          <div className="w-full max-w-md border border-blue-200 dark:border-gray-700 rounded-lg shadow-md p-6 bg-white dark:bg-gray-800">
            <p className="text-sm text-blue-600 dark:text-blue-300 text-center mb-4">
              Complete your profile to continue
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-900 dark:text-blue-200">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 mt-1 border border-blue-300 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 dark:text-blue-200">Bio</label>
                <textarea
                  required
                  rows="3"
                  className="w-full p-2 mt-1 border border-blue-300 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 dark:text-blue-200">Native Language</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 mt-1 border border-blue-300 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  value={formData.nativeLanguage}
                  onChange={(e) => setFormData({ ...formData, nativeLanguage: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 dark:text-blue-200">Learning Language</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 mt-1 border border-blue-300 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  value={formData.learningLanguage}
                  onChange={(e) => setFormData({ ...formData, learningLanguage: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 dark:text-blue-200">Location</label>
                <input
                  type="text"
                  placeholder="City, Country"
                  required
                  className="w-full p-2 mt-1 border border-blue-300 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded transition duration-300"
              >
                {isPending ? 'Saving…' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
