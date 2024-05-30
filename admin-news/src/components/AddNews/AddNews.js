import {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import newsValidator from "../../constants/newsValidator";
import addNewsStyles from "./AddNews.module.scss";
import axios from "axios";

const AddNews = ({isEditPost = false}) => {
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [isRegisterError, setIsRegisterError] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid},
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(newsValidator),
  });

  const onSubmit = handleSubmit((data) => {
    let smData = {};
    smData["title"]= data.title;
    smData["image"]= data.image;
    smData["content"]= data.content;
    smData["type"]= data.type;
    smData["news_property"]= "userId";



    axios
      .post(`http://localhost:4000/post-news`, smData, {
        headers: {"Content-Type": "application/json", "Accept": "*/*", "Connection": "keep-alive", "Access-Control-Allow-Origin": "*"},
      })
      .then(() => {
        setIsRegisterSuccess(true);
        setTimeout(() => {
          setIsRegisterSuccess(false);
        }, 3000);
        reset();
      })
      .catch((e) => {
        console.log(e)
        setIsRegisterError(true);
        setTimeout(() => {
          setIsRegisterError(false);
        }, 3000);
      });
  });

  return (
    <section className={addNewsStyles.post}>
      <div className={addNewsStyles.layer1}>
        <div className={addNewsStyles.layer2}>
          <div className={addNewsStyles.layer3}>
            <h1 className={addNewsStyles.formTitle}>{isEditPost ? "Edit post" : "Create post"}</h1>
            <form
              className={addNewsStyles.postForm}
              action="#"
              onSubmit={onSubmit}
            >
              <div className={addNewsStyles.row}>
                <label htmlFor="title" className={addNewsStyles.titleLabel}>
                  Title
                </label>
                <input
                  {...register("title", { required: true })}
                  className={addNewsStyles.titleInput}
                  placeholder="title"
                />
                {errors.title && (
                  <span className="error">{errors.title.message}</span>
                )}
              </div >
              <div className={addNewsStyles.row}>
                <label htmlFor="image" className={addNewsStyles.imageLabel}>
                  Image
                </label>
                <input
                  {...register("image", { required: true })}
                  className={addNewsStyles.titleInput}
                  placeholder="image"
                  type="text"
                />
                {errors.image && (
                  <span className="error block">
                    Valid format is jpg, jpeg and png !
                  </span>
                )}
              </div>
              <div className={addNewsStyles.row}>
                <label htmlFor="type" className={addNewsStyles.typeLabel}>
                  Type
                </label>
                <select
                  className={addNewsStyles.typeInput}
                  {...register("type", { required: true })}
                  defaultValue="Other"
                >
                  <option value="Cars">Cars</option>
                  <option value="Business">Business</option>
                  <option value="Politics">Politics</option>
                  <option value="Sports">Sports</option>
                  <option value="Arts">Arts</option>
                  <option value="IT">IT</option>
                  <option value="Other">Other</option>
                </select>
                {errors.type && (
                  <span className="error">{errors.type.message}</span>
                )}
              </div>
              <div className={addNewsStyles.row}>
                <label htmlFor="content" className={addNewsStyles.contentLabel}>
                  Content
                </label>
                <textarea
                  {...register("content", { required: true })}
                  className={addNewsStyles.contentInput}
                  placeholder="This new is about..."
                />
                {errors.content && (
                  <span className="error">{errors.content.message}</span>
                )}
              </div>
              <button
                type="submit"
                className={
                  addNewsStyles.submitButton + (!isValid ? ' opacity-60' : '')
                }
              >
                Post
              </button>
              {isRegisterSuccess && (
                <div
                  className={addNewsStyles.successMessage}
                  role="alert"
                >
                  <span className={addNewsStyles.successText}>
                    Blog posted successfully !
                  </span>
                </div>
              )}
              {isRegisterError && (
                <div
                  className={addNewsStyles.errorMessage}
                  role="alert"
                >
                  <span className={addNewsStyles.errorText}>
                    {serverError ? serverError : "Server error !"}
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddNews;
