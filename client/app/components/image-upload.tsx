import { useState } from 'react';

export function ImageUpload({ onUpload }: { onUpload: (file: File) => void }) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <input type='file' accept='image/*' onChange={handleChange} />
      {preview && (
        <img
          src={preview}
          alt='Preview'
          className='w-40 h-40 object-cover rounded'
        />
      )}
    </div>
  );
}
