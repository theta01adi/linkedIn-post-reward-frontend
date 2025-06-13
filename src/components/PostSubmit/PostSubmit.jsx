import React, { useRef, useState } from "react";
import { useWeb3State } from "../../context/useWeb3Context";
import axios from "axios";

const PostSubmit = () => {
  const [postContent, setPostContent] = useState("");
  const [postScreenshot, setPostScreenshot] = useState(null);
  const base64Ref = useRef("")
  const [ base64Img, setBase64Img ] = useState(null)

  const { web3State } = useWeb3State();
  const { isWalletConnected, signer, accountAddress } = web3State;

  // // handle post submit using form data 
  // const handlePostSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (!postScreenshot) {
  //       alert("Provide the post screenshot !!");
  //       return;
  //     }

  //     if (!postContent) {
  //       alert("Provide the post content !!");
  //       return;
  //     }

  //     const formData = new FormData();

  //     formData.append("postContent", postContent);
  //     formData.append("postScreenshot", postScreenshot);

  //     for (let [key, value] of formData.entries()) {
  //       console.log(value);
  //       console.log(`${key}: ${value}`);
  //     }

  //     console.log(postContent);
  //     console.log(postScreenshot);

  //     setPostContent("");
  //     setPostScreenshot(null);

  //   } catch (error) {
  //     console.error(error);
  //     alert(error);
  //   }
  // };


//   handle form submit using base 64 data
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

      // Base64 image data
      const base64Data = await convertToBase64(postScreenshot)
      setBase64Img(base64Data)
      base64Ref.current = base64Data
      console.log("Base64 : " + base64Img);
      console.log("Base64Ref : " + base64Ref.current);

      // need values to backend , postBase64, postContent, userAddress, signedMessage

      const ORIGINAL_POST_SUBMIT_MESSAGE = "You are submiting your linkedin post screenshot and post content to LinkedInPost Reward Dapp !!"

      const signedMessage = await signer.signMessage(ORIGINAL_POST_SUBMIT_MESSAGE)
      console.log(signedMessage);

      const response = await axios.post("http://127.0.0.1:5000/submit-post", {
        postContent : postContent,
        postBase64 : base64Ref.current,
        userAddress : accountAddress,
        signedMessage : signedMessage
      })

      console.log(response);
      
      if (response.data.success) {
        console.log("Post submitted successfully with transaction hash :", response.data.tx_hash);
        alert("You submitted your linkedIn post successfully!");
      } else {
        throw new Error(response.data.message || "Post submission failed on backend.");
      }

      
      setPostContent("");
      setPostScreenshot(null);
      base64Ref.current = "";
    } catch (error) {
      if (error.response && error.response.data) {
        const errMsg = error.response.data.message || "An error occurred.";
        alert(`⚠️ ${errMsg}`);
      } else {
        alert("❌ Network error or server is down.");
      }
    }
  };


  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const result = reader.result;
        const base64Data = result.split(',')[1];
        resolve(base64Data);  // resolve promise with base64 string
      };
  
      reader.onerror = (error) => reject(error);
  
      reader.readAsDataURL(file);
    });
  };
  

  // if(!isWalletConnected) {
  //     return (
  //         <div>
  //             <h1>Please connect your wallet to submit the post</h1>
  //         </div>
  //     )
  // }

  return(
  
      
        <div className="w-full max-w-5xl p-8">
       
          <form onSubmit={(e) => handlePostSubmit(e)} className="space-y-6">
            {/* Screenshot Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Post Screenshot
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPostScreenshot(e.target.files[0])}
                className="block w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white rounded-md border border-gray-300 dark:border-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
            </div>
    
            {/* Post Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Post Content
              </label>
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows="5"
                placeholder="Write what you posted..."
                className="block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
    
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300 shadow-sm"
              >
                🚀 Submit Post
              </button>
            </div>
          </form>
        </div>
    
    );
};

export default PostSubmit;
