// Функція для запису помилки в локал сторідж
export default function ErrorToLocalStorage(err) {
  const errorObject = {
    404: "The requested session could not be found.",
    401: "Authentication failed: You do not have permissions to access the service.",
    501: "invalid service: this service does not exist.",
    405: "Invalid format: This service doesn't exist in that format.",
    422: "Invalid parameters: Your request parameters are incorrect.",
    403: "Duplicate entry: The data you tried to submit already exists.",
    503: "Service offline: This service is temporarily offline, try again later.",
    500: "Internal error: Something went wrong, contact TMDB.",
    400: "Validation failed.",
    406: "Invalid accept header.",
    504: "Your request to the backend server timed out. Try again.",
    429: "Your request count (#) is over the allowed limit of (40).",
    502: "Couldn't connect to the backend server.",
  };
  Object.entries(errorObject).forEach((elem) => {
    if (elem[0].includes(err.toString())) {
      localStorage.setItem(`Error ${err}`, elem[1]);
    }
  });
}
