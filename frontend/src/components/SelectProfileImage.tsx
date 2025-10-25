import { useRef } from "react";
import defaultUserImage from "../assets/defaultUser.jpeg";
import { MdOutlinePhotoCamera } from "react-icons/md";

export interface SelectProfileImageProps {
  imageLink: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Component used to select a profile image using
 * a file input and a button to open the file input.
 * it displays an existing image if there is one,
 * otherwise it displays a default image.
 * @param imageLink
 * @param handleFileChange
 */
const SelectProfileImage: React.FC<SelectProfileImageProps> = ({
  imageLink,
  handleFileChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  if(imageLink && !imageLink.startsWith("data:")) {
    const mimeType = imageLink ? detectImageMime(imageLink) : null;
    imageLink = mimeType ? `data:${mimeType || "image/png"};base64,${imageLink}` : null;
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="avatar">
        <div className="w-48 rounded-full border-gray-200 border-4">
          <img
            src={imageLink ? imageLink : defaultUserImage}
            alt="Default User"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={handleFileButtonClick}
        className="btn btn-sm max-w-48 w-full"
      >
        Escolher Foto
        <MdOutlinePhotoCamera
          className="max-w-5 max-h-5
         w-full h-full"
        />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

function detectImageMime(base64: string): string | null {
  // Pega os primeiros bytes decodificados
  const firstBytes = atob(base64.slice(0, 20)); // decodifica só um pedaço

  const bytes = firstBytes
    .split("")
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");

  if (bytes.startsWith("ffd8ff")) return "image/jpeg";
  if (bytes.startsWith("89504e47")) return "image/png";
  if (bytes.startsWith("47494638")) return "image/gif";
  if (bytes.startsWith("424d")) return "image/bmp";
  if (bytes.startsWith("52494646")) return "image/webp"; // pode variar

  return null;
}

export default SelectProfileImage;
