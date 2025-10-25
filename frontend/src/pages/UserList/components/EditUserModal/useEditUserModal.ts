import { useEffect, useState } from "react";
import { User } from "../../UserList";
import useGeneralFunctions from "../../../../hooks/useGeneralFunctions";
//import useAWSAPI from "../../../../hooks/useAWSAPI";
import useImage from "../../../../hooks/useImage";

export type Field = {
  label: string;
  placeholder: string;
  type: string;
  initialValueKey: keyof State;
};

type State = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type UseEditUserModal = {
  userData: User | null;
  onClose: () => void;
  onUserSave: (user: User) => void;
};

const useEditUserModal = ({
  userData,
  onClose,
  onUserSave,
}: UseEditUserModal) => {
  const { isValidEmail } = useGeneralFunctions();
  //const { postFileToS3 } = useAWSAPI();
  const { changeImageSize } = useImage();

  const fields: Field[] = [
    {
      label: "Nome",
      placeholder: "Nome",
      type: "text",
      initialValueKey: "name",
    },
    {
      label: "Email",
      placeholder: "Email",
      type: "text",
      initialValueKey: "email",
    },
    {
      label: "Senha",
      placeholder: "Senha",
      type: "password",
      initialValueKey: "password",
    },
    {
      label: "Confirmar Senha",
      placeholder: "Senha",
      type: "password",
      initialValueKey: "confirmPassword",
    },
  ];

  const initialState: State = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [state, setState] = useState<State>(initialState);
  const [imageLink, setImageLink] = useState<string | null>(null);
  const [isValidEditUser, setIsValidEditUser] = useState(false);

  useEffect(() => {
    setState({
      name: userData?.name || "",
      email: userData?.email || "",
      password: "",
      confirmPassword: "",
    });
    setImageLink(userData?.profile_img || null);
  }, [userData]);

  useEffect(() => {
    const isNotEmpty = state.name !== "" && state.email !== "";
    const arePasswordsEqual = state.password === state.confirmPassword;
    const isUserDataDifferent =
      state.name !== userData?.name ||
      state.email !== userData?.email ||
      state.password !== "" ||
      state.confirmPassword !== "";
    const isImageDifferent = imageLink !== userData?.profile_img;

    setIsValidEditUser(
      !(
        isNotEmpty &&
        isValidEmail(state.email) &&
        arePasswordsEqual &&
        (isUserDataDifferent || isImageDifferent)
      ),
    );
  }, [state, imageLink, userData, isValidEmail]);

  const handleChange = (key: keyof State, value: string) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!userData) return;
    const user: User = {
      id: userData.id,
      name: state.name,
      email: state.email,
      profile_img: imageLink?.split(",")[1] || "",
    };
    onUserSave(user);
    onClose();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFile = await changeImageSize(file, 330, 330);
      if (newFile) {
        const base64 = await fileToBase64(newFile);
        setImageLink(base64);
      }
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return {
    fields,
    state,
    handleChange,
    handleSave,
    isValidEditUser,
    imageLink,
    handleFileChange,
  };
};

export default useEditUserModal;
