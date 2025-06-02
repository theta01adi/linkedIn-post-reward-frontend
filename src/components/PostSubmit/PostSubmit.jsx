import React, { useRef, useState } from "react";
import { useWeb3State } from "../../context/useWeb3Context";

const PostSubmit = () => {
  const [postContent, setPostContent] = useState("");
  const [postScreenshot, setPostScreenshot] = useState(null);
  const base64Ref = useRef("")
  const [ base64Img, setBase64Img ] = useState(null)

  const { web3State } = useWeb3State();
  const { isWalletConnected } = web3State;

  // handle post submit using form data 
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!postScreenshot) {
        alert("Provide the post screenshot !!");
        return;
      }

      if (!postContent) {
        alert("Provide the post content !!");
        return;
      }

      const formData = new FormData();

      formData.append("postContent", postContent);
      formData.append("postScreenshot", postScreenshot);

      for (let [key, value] of formData.entries()) {
        console.log(value);
        console.log(`${key}: ${value}`);
      }

      console.log(postContent);
      console.log(postScreenshot);

      setPostContent("");
      setPostScreenshot(null);

    } catch (error) {
      console.error(error);
      alert(error);
    }
  };


//   handle form submit using base 64 data
const handlePostSubmitBase = async (e) => {
    e.preventDefault();
    try {
      if (!postScreenshot) {
        alert("Provide the post screenshot !!");
        return;
      }

      if (!postContent) {
        alert("Provide the post content !!");
        return;
      }

      // Base64 image data
      convertToBase64(postScreenshot)
      console.log("Base64 : " + base64Img);
      console.log("Base64Ref : " + base64Ref.current);
      
      setPostContent("");
      setPostScreenshot(null);
      base64Ref.current = "";
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };




  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
    base64Ref.current = reader.result;
      console.log("File content:", reader.result); // base64 string or text
      setBase64Img(reader.result)
    };

   reader.readAsDataURL(file);
  };

  // if(!isWalletConnected) {
  //     return (
  //         <div>
  //             <h1>Please connect your wallet to submit the post</h1>
  //         </div>
  //     )
  // }

  return(
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Submit Your LinkedIn Post
        </h2>

        <form onSubmit={handlePostSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Post Screenshot
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPostScreenshot(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-900 bg-white dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Post Content
            </label>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              rows="4"
              placeholder="Write what you posted..."
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostSubmit;
