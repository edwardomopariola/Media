import { GoTrashcan } from 'react-icons/go';
import { useRemovePhotoMutation } from "../store";


function PhotosListItem({ photo }) {
  const [removePhoto] = useRemovePhotoMutation();  //use the useRemovePhotoMutation hook to remove a photo

  const handleRemovePhoto = () => {  //create a handleRemovePhoto function that calls the removePhoto function with the photo as an argument
    removePhoto(photo);
  };

  return (  //render a div element with the photo URL as the background image and a delete button that calls the handleRemovePhoto function when clicked
    <div onClick={handleRemovePhoto} className="relative cursor-pointer m-2">
      <img className="w-20 h-20"  src={photo.url} alt="random pic"/>
      <div className='absolute inset-0 flex items-center justify-center hover:bg-red-200 opacity-0 hover:opacity-80'>
        <GoTrashcan className="text-red-500-3xl" />
      </div>
    </div>
  );
}


export default PhotosListItem;