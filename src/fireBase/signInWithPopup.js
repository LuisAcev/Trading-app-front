import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleAuthProvider } from "./fireBaseConfig";

export const signIpPopup = async () => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    // Obtén el token de acceso de Google
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // Información del usuario que inició sesión
    const user = result.user;

    // Puedes manejar datos adicionales del usuario si es necesario
    // const additionalInfo = getAdditionalUserInfo(result);

    return { user, token }; // Devuelve los datos necesarios
  } catch (error) {
    // Maneja errores
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData?.email;
    const credential = GoogleAuthProvider.credentialFromError(error);

    console.error("Error al iniciar sesión con Google:", errorMessage);

    // Devuelve o lanza el error si es necesario
    throw { errorCode, errorMessage, email, credential };
  }
};
