import { toast } from "react-toastify";
// import { getStorageValue } from "./localStorage";

// const getError = (error: any) => {
//   if (!Object.keys(error).length || typeof error === "string") return error;
//   let errors: any = [];
//   if (Array.isArray(error) && error.length) {
//     errors = [error[0].message, ...error];
//   } else {
//     Object.keys(error).forEach((e) => {
//       return (errors = [...errors, error[e]]);
//     });
//   }

//   return errors.filter((e: any) => e);
// };

// const getErrors = (errorResponse: any) => {
//   if (errorResponse?.message || errorResponse?.data?.message)
//     return errorResponse.message || errorResponse.data.message;
//   let errors: any = [];
//   Object.keys(errorResponse).forEach((error) => {
//     return (errors = [...errors, ...getError(errorResponse[error])]);
//   });
//   return errors;
// };

export const getSimplifiedError = (error: any) => {
  if (!error.response) {
    // window.alert(
    //   "Something went wrong, check your internet and please try again"
    // );
    toast.error(
      "Something went wrong, check your internet and please try again"
    );
    return "Something went wrong, check your internet and please try again";
  }
  if (error.response?.status === 500) {
    // window.alert("Sorry an unexpected error occurred.");
    toast.error("Sorry an unexpected error occurred.");
    return "Sorry an unexpected error occurred.";
  }
  if (error.response?.status === 400) {
    console.log(error.response);
    // window.alert(error.response.data.error);
    toast.error(error.response.data.message);
    // window.location.reload();
  }
  if (error.response.status === 404) {
    toast.error(error.response.error);
    if (error.response.data.error === "user not found") {
      setTimeout(() => {
        window.location.replace("/register");
      }, 1000);
    }
    return error.response.data.message;
  } else if (error.response.status === 401) {
    // window.alert("Token has expired, please log in");
    toast.error("Token has expired, please log in");
    setTimeout(() => {
      window.location.replace("/login");
    }, 1000);
    return "Token has expired, please log in";
  } else if (error.response.status === 409) {
    // window.alert(error.response.data.error);
    toast.error(error.response.data.error);
    setTimeout(() => {
      window.location.replace("/login");
    }, 500);
    return error.response.data.message;
  } else {
    // window.alert(error.response.data.error);
    toast.error(error.response.data.error);
    // window.location.reload();
    return error.response.data.message;
  }
};

// export const getCurrency = (name: string) => {
//   switch (name) {
//     case "EUR":
//       return "€";
//     case "ZAR":
//       return "R";
//     case "USD":
//       return "$";
//     case "RWF":
//       return "RF";
//     case "XOF":
//       return "CFA";
//     case "NGN":
//       return "₦";
//     case "GHS":
//       return "GH¢";
//     case "KES":
//       return "K";
//   }
// };

export function isPasswordValid(password: string): boolean {
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return PASSWORD_REGEX.test(password);
}
// export function hasLowerCaseLetter(password: string): boolean {
//   const PASSWORD_REGEX = /[a-z]+/;
//   return PASSWORD_REGEX.test(password);
// }
// export function hasUpperCaseLetter(password: string): boolean {
//   const PASSWORD_REGEX = /[A-Z]+/;
//   return PASSWORD_REGEX.test(password);
// }
// export function hasNumber(password: string): boolean {
//   const PASSWORD_REGEX = /\d+/;
//   return PASSWORD_REGEX.test(password);
// }
// export function hasLengthEight(password: string): boolean {
//   const PASSWORD_REGEX = /[a-zA-Z\d]{8,}$/;
//   return PASSWORD_REGEX.test(password);
// }

export function isEmailValid(value: string): boolean {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    value
  );
}

// export function convertTimeStamp(timestamp: any) {
//   const firebaseTime = new Date(
//     timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000
//   );
//   const date = firebaseTime.toDateString();
//   // const atTime = firebaseTime.toLocaleTimeString();
//   return date;
// }

// export const handleInviteRedirect = (timer?: number) => {
//   const inviteUrl = getStorageValue("inviteUrl");
//   if (inviteUrl) {
//     if (timer) {
//       window.setTimeout(() => {
//         window.location.replace(inviteUrl);
//       }, timer);
//     } else {
//       window.location.replace(inviteUrl);
//     }
//   }
// };
