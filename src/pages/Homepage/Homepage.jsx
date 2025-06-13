
import React from 'react'
import PostSubmit from '../../components/PostSubmit/PostSubmit'
import PostResult from '../../components/PostResult/PostResult'

const Homepage = () => {

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen py-10 px-4 sm:px-8">
    <div className="max-w-5xl mx-auto space-y-10">

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
        LinkedIn Post Reward Dashboard
      </h1>

      {/* Post Submission Section */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          📤 Submit Your LinkedIn Post
        </h2>
        <PostSubmit />
      </section>

      {/* Results Section */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          🏆 View Post Results
        </h2>
        <PostResult />
      </section>
    </div>
  </main>
  )
}

export default Homepage