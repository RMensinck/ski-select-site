import Image from 'next/image';


export default function FirestoreImage({ image, width, height }: { image: { url: string; name: string; fullPath: string }; width?: number; height?: number }) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="relative group">
        <Image
          src={image.url}
          alt={image.name}
          width={width || 400}
          height={height || 300}
          className="rounded-lg object-cover w-full h-64 group-hover:opacity-90 transition-opacity"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg" />
      </div>
    </div>
  );
}

