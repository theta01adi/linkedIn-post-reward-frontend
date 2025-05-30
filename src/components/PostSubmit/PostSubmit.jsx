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

  return (
    <div>
      <h1>Submit Your Post</h1>
      <form onSubmit={handlePostSubmit}>
        <label> Enter post screenshot : </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setPostScreenshot(e.target.files[0]);
          }}
        />
        <br></br>
        <label> Enter post content : </label>
        <input
          type="text"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostSubmit;
